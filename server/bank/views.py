from django.shortcuts import render
from django.db.models import Sum
from cache_memoize import cache_memoize
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from durin.auth import (
    TokenAuthentication as DurinTokenAuthentication,
)
from .models import AvailableBalance, CurrentBalance
from rest_framework.response import Response


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

