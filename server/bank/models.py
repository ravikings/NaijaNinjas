from django.db import models
from task.models import TaskBidder
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
    account_number = models.IntegerField(
        unique=True, default=account_no_generator, editable=False
    )
    invoice_amount = models.IntegerField(default=0, blank=True, null=True)
    balance = models.IntegerField(default=0, blank=True, null=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="bank_owner"
    )
    task = models.ForeignKey(
        TaskBidder,
        on_delete=models.CASCADE,
        blank=True,
        null=True,
        related_name="bank_task_payment",
    )
    payout_date = models.DateField(null=True, db_index=True)
    transfer_to_available = models.BooleanField(
        default=False, verbose_name="transfer_to_available"
    )


class AvailableBalance(models.Model):
    balance = models.IntegerField()
    account_number = models.ForeignKey(
        CurrentBalance,
        on_delete=models.CASCADE,
        related_name="available_balance",
    )
