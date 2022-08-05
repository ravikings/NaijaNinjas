from django.shortcuts import render
from django.contrib import messages
from django.shortcuts import get_object_or_404, render, redirect
from task.models import TaskBidder
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .paystack import webhook_handler_service
# Create your views here.


#TODO: Add celery task here for backgroud task, to support retry
#ADD: send Email to user, also notifcation for pro to start work
@api_view(["GET"])
def verify_payment(request):

    trxref = request.query_params.get('trxref')

    if trxref:
        messages.error(
            request,
            "The transaction reference passed was different from the actual reference. Please do not modify data during transactions",
        )
    payment: TaskBidder = get_object_or_404(TaskBidder, transaction_id=trxref)
    if payment.verify_transaction_completed():
        messages.success(
            request, f"Payment Completed Successfully, ₦ {payment.offer}."
        )
        return Response({"message":"Pay was succesfull!"}, status=status.HTTP_200_OK)

    else:
        messages.warning(request, "Sorry, your payment could not be confirmed.")
        return Response({"message":"Payment declined"}, status=status.HTTP_406_NOT_ACCEPTABLE)
    

@api_view(["POST"])
def accept_webhook(request):

    if webhook_handler_service(request):

        return Response({"message":"log was processed succesfull!"}, status=status.HTTP_200_OK)

    return Response({"message":"sorry log was not process"}, status=status.HTTP_400_BAD_REQUEST)
    