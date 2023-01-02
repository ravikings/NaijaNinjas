from django.db import models
from django.conf import settings
import random

# Create your models here.

def account_no_generator():
    # return a 6 digit random number
    key = int(random.uniform(100000, 999999))
    if CurrentBalance.objects.filter(account_number=key).exists():
        key = account_no_generator()
    return key

class CurrentBalance(models.Model):
    account_number = models.IntegerField(unique=True, default=account_no_generator, editable=False)
    balance = models.IntegerField()
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bank_owner"
    )


class AvailableBalance(models.Model):
    balance = models.IntegerField()
    account_number = models.ForeignKey(
        CurrentBalance,
        on_delete=models.CASCADE,
        related_name="available_balance",
    )