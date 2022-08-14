from .models import ClientPaymentInfo
from rest_framework import serializers


class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientPaymentInfo
        exclude = ("authorization_code", "country_code", "account_name")
