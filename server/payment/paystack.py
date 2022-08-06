import hashlib
import hmac
import requests
import json
from django.conf import settings
from rest_framework.exceptions import ValidationError
from .tasks import log_transaction_task

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
    # ip = get_client_ip(request)
    # if ip not in IP_WHITELIST:
    #     raise ValidationError("source request authentication failed")

    if webhook_data["event"] == "charge.success":
        
        #to store transcation logs
        log_transaction_task.delay(webhook_data["data"], webhook_data)
        print("transaction log ongoing")

        return True

    return False