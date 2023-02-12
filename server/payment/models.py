import random
import string
import secrets
from django.db import models
from accounts.models import Service
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from .paystack import PayStack

# Create your models here.


def key_generator():
    key = "".join(random.choice(string.digits) for x in range(6))
    if TransactionLog.objects.filter(uuid=key).exists():
        key = key_generator()
    return key


class TransactionLog(models.Model):

    author = models.IntegerField(null=True, blank=True)
    uuid = models.CharField(
        max_length=6, unique=True, default=key_generator, editable=False
    )
    amount = models.IntegerField(null=True, blank=True)
    currency = models.CharField(max_length=255, null=True, blank=True)
    payment_date_time = models.DateTimeField(max_length=100, null=True, blank=True)
    status = models.CharField(max_length=255, null=True, blank=True)
    refrence = models.CharField(
        max_length=255,
        db_index=True,
    )
    logs = models.JSONField(null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ("created",)


class ClientPaymentInfo(models.Model):

    author = models.IntegerField(null=True, blank=True)
    authorization_code = models.CharField(max_length=255, null=True, blank=True)
    last4 = models.CharField(max_length=255, null=True, blank=True)
    exp_month = models.CharField(max_length=255, null=True, blank=True)
    exp_year = models.CharField(max_length=255, null=True, blank=True)
    card_type = models.CharField(max_length=255, null=True, blank=True)
    bank = models.CharField(max_length=255, null=True, blank=True)
    country_code = models.CharField(max_length=255, null=True, blank=True)
    account_name = models.CharField(max_length=255, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True, null=True, blank=True)

    class Meta:
        ordering = ("created",)


class Order(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="order_author",
        blank=True,
        null=True,
    )
    first_name = models.CharField(_("first name"), max_length=50)
    last_name = models.CharField(_("last name"), max_length=50)
    email = models.EmailField(_("e-mail"))
    address = models.CharField(_("address"), max_length=250)
    postal_code = models.CharField(_("postal code"), max_length=20)
    city = models.CharField(_("city"), max_length=100)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    transaction_id = models.CharField(
        max_length=255, blank=True, null=True, db_index=True, unique=True
    )
    paid = models.BooleanField(default=False)
    transaction_verified = models.BooleanField(default=False)
    total_charge = models.FloatField(null=True, blank=True)

    class Meta:
        ordering = ["-created", "-updated"]

    def save(self, *args, **kwargs):

        if not self.transaction_id:
            ref = secrets.token_urlsafe(25)
            self.transaction_id = ref
        super().save(*args, **kwargs)

    def verify_transaction_completed(self):
        paystack = PayStack()
        total_charge = sum(item.get_cost() for item in self.items.all())
        status, result = paystack.verify_payment(self.transaction_id, total_charge)
        if status:
            self.paid = True
            self.total_charge = total_charge
            if result["amount"] / 100 == total_charge:
                self.transaction_verified = True
            self.save()
            return True
        return False


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    service = models.ForeignKey(
        Service, related_name="order_items", on_delete=models.CASCADE
    )
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)

    def get_cost(self):
        return self.price * self.quantity
