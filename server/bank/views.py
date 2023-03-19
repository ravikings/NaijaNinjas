from django.shortcuts import render
from django.db.models import Sum
from cache_memoize import cache_memoize
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from durin.auth import (
    TokenAuthentication as DurinTokenAuthentication,
)
from .models import AvailableBalance, CurrentBalance
from rest_framework.response import Response
from django.utils import timezone
from .serializers import CurrentBalanceSerializer
from django.db import transaction


# Create your views here.

# @cache_memoize(60 * 60)
# def get_account(request):
#     acount, balance_created = AvailableBalance.objects.get_or_create(
#         author=request.user
#     )
#     available_invoice = CurrentBalance.objects.filter(
#         author=request.user, transfer_to_available=False
#     ).aggregate(Sum("invoice_amount"))
#     response = {}
#     response.update(available_invoice)
#     response["account_no"] = acount.account_number
#     response["available_balance"] = acount.balance
#     response["author"] = acount.author.id
#     return response
    

@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([DurinTokenAuthentication])
def users_account(request):

    acount, balance_created = AvailableBalance.objects.get_or_create(
        author=request.user
    )
    available_invoice = CurrentBalance.objects.filter(
        author=request.user, transfer_to_available=False
    ).aggregate(Sum("invoice_amount"))
    response = {}
    response.update(available_invoice)
    response["account_no"] = acount.account_number
    response["available_balance"] = acount.balance
    response["author"] = acount.author.id
    return Response(response)

@api_view(["GET"])
#@authentication_classes([DurinTokenAuthentication])
def transfer_users_payment(request):
    credit_users_account()
    return Response({"Message": "account credit completed"})
    

@transaction.atomic
def credit_users_account():
    two_days_ago = timezone.now() + timezone.timedelta(days=2)
    available_invoice = CurrentBalance.objects.filter(transfer_to_available=False, approved=True, payout_date__lte=two_days_ago)
    for invoice in available_invoice:
        print("Account to credit is for {fname}, amount: {amount}".format(fname = invoice.author, amount = invoice.invoice_amount))
        account_to_update = AvailableBalance.objects.get(author=invoice.author)
        account_to_update.balance += invoice.invoice_amount
        account_to_update.save()
        invoice.transfer_to_available = True
        invoice.save()
        print("Credit usern{fname}, amount: {amount} completed".format(fname = invoice.author, amount = invoice.invoice_amount))