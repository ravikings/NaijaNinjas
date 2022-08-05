import hashlib
import hmac
import requests
import json
from django.conf import settings
from rest_framework.exceptions import ValidationError
from .models import TransactionLog
from django.db import transaction
from celery import shared_task

class PayStack:
    PAYSTACK_SECRET_KEY = settings.PAYSTACK_SECRET_KEY
    base_url = 'https://api.paystack.co'

    def verify_payment(self, ref, amount:int):
        path = "/transaction/verify/{}".format(ref)

        headers = {
            "Authorization": "Bearer {}".format(self.PAYSTACK_SECRET_KEY),
            "Content-Type": "application/json",
        }
        url = "{}{}".format(self.base_url, path)

        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            response_data = response.json()
            return response_data['status'], response_data["data"]

        response_data = response.json()
        return response_data['status'], response_data['message']

# Add celery
@transaction.atomic
def log_transaction(transaction_data):

    TransactionLog.objects.create(
        amount=transaction_data["amount"],
        currency=transaction_data["currency"],
        refrence=transaction_data["reference"],
        payment_date_time=transaction_data["paid_at"],
        status=transaction_data["status"],
        logs=transaction_data,
    )

@shared_task(bind=True, autoretry_for=(Exception,),acks_late=True, retry_backoff=960, retry_jitter=True, retry_kwargs={'max_retries': 5})
def log_transaction_task(self, transaction_data):

    try:
        log_transaction(transaction_data)

    except:
        raise Exception()

def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip

def webhook_handler_service(request):
    IP_WHITELIST = {"52.31.139.75", "52.49.173.169", "52.214.14.220"}
    try:
        secret = getattr(settings, "PAYSTACK_SECRET_KEY")
    except Exception as e:  # If user hasn't declared variable
        raise ValidationError(e)

    webhook_data = request.data
    ip = get_client_ip(request)
    if ip not in IP_WHITELIST:
        raise ValidationError("source request authentication failed")

    if webhook_data["event"] == "charge.success":
        
        #to store transcation logs
        log_transaction_task.delay(webhook_data["data"])
        return True

    return False