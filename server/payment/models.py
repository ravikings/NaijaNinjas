from django.db import models
from django.conf import settings
import random
import string

# Create your models here.

def key_generator():
    key = ''.join(random.choice(string.digits) for x in range(6))
    if TransactionLog.objects.filter(uuid=key).exists():
        key = key_generator()
    return key
class TransactionLog(models.Model):

    author = models.IntegerField(null=True, blank=True)
    uuid = models.CharField(max_length=6,unique=True, default=key_generator, editable=False)
    amount = models.IntegerField(null=True, blank=True)
    currency = models.CharField(max_length=255)
    payment_date_time = models.DateTimeField(max_length=100, null=True, blank=True)
    status= models.CharField(max_length=255, null=True, blank=True)
    refrence = models.CharField(max_length=255, db_index=True,)
    logs = models.JSONField(null=True, blank=True)


class ClientPaymentInfo(models.Model):

    author = models.IntegerField(null=True, blank=True)
    authorization_code = models.CharField(max_length=255)
    last4 = models.CharField(max_length=255)
    exp_month = models.CharField(max_length=255)
    exp_year = models.CharField(max_length=255)
    card_type = models.CharField(max_length=255)
    bank = models.CharField(max_length=255)
    country_code = models.CharField(max_length=255)
    account_name = models.CharField(max_length=255)