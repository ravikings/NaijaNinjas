from django.contrib import messages
from django.shortcuts import get_object_or_404, render, redirect
from task.models import TaskBidder
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError
from .tasks import log_transaction_task
from .models import TransactionLog, ClientPaymentInfo
from bank.models import CurrentBalance
from django.db import transaction
from rest_framework import viewsets
from .serializers import CardSerializer
from zappa.asynchronous import task
from server.utility import try_except_decorator

# Create your views here.

@transaction.atomic
def update_current_balance(offer, task):
    print("writing to account balance")
    amount = offer - 500  # amount here is our service fee
    CurrentBalance.objects.create(author=task.bidder_profile.author, task=task, invoice_amount=amount)
    print("account balance update")

#TODO: Add celery task here for backgroud task, to support retry
#ADD: send Email to user, also notifcation for pro to start work
@api_view(["GET"])
def verify_payment(request):

    trxref = request.query_params.get('trxref')

    if not trxref:
        messages.error(
            request,
            "The transaction reference passed was different from the actual reference. Please do not modify data during transactions",
        )
        raise ValidationError("error: trxref is not passed")

    payment: TaskBidder = get_object_or_404(TaskBidder, transaction_id=trxref)
    if payment.verify_transaction_completed():
        messages.success(
            request, f"Payment Completed Successfully, ₦ {payment.total_charge}."
        )
        update_current_balance(payment.offer, payment)
        #TODO: call approve view here to send email to prof to start the task
        return Response({"message":"Payment was succesfull!"}, status=status.HTTP_200_OK)

    messages.warning(request, "Sorry, your payment could not be confirmed.")
    return Response({"message":"Payment declined"}, status=status.HTTP_406_NOT_ACCEPTABLE)



@api_view(["POST"])
@permission_classes([AllowAny])
def accept_webhook(request):

    if webhook_handler_service(request):

        return Response({"message":"log was processed succesfull!"}, status=status.HTTP_200_OK)

    return Response({"message":"sorry log was not process"}, status=status.HTTP_400_BAD_REQUEST)
    

def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip

@transaction.atomic
def log_transaction(transaction_data, webhook_data):

    print("writing transaction to db")
    TransactionLog.objects.create(
        amount=transaction_data["amount"] / 100,
        currency=transaction_data["currency"],
        refrence=transaction_data["reference"],
        payment_date_time=transaction_data["paid_at"],
        status=transaction_data["status"],
        logs=webhook_data,
    )
    print("writing to db completed")

def webhook_handler_service(request):
    IP_WHITELIST = {"52.31.139.75", "52.49.173.169", "52.214.14.220"}

    webhook_data = request.data
    # ip = get_client_ip(request)
    # if ip not in IP_WHITELIST:
    #     raise ValidationError("source request authentication not allow")

    if webhook_data["event"] == "charge.success":
        
        #to store transcation logs
        reference = webhook_data["data"]["reference"]
        log_data = webhook_data["data"]
        log_transaction_task.delay(reference, log_data) 
        print("transaction log ongoing")

        return True

    return False


class CardsDetailView(viewsets.ModelViewSet):
    
    """
    uses to get user card info
    """

    http_method_names = ['get','delete']
    serializer_class = CardSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):
    
        return ClientPaymentInfo.objects.filter(author=self.request.user.id)
   

@try_except_decorator
@task
def testme():
    print("this was called")
    import time
    time.sleep(15)
    b = 2 //"11"
    print("this was called")

@api_view(["GET"])
def accept_test(request):
    
    data = " i you welcome"
    testme()
    
    return Response({"message":"sorry log was not process"})
    