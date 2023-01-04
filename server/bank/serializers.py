from rest_framework import serializers
from .models import CurrentBalance

class CurrentBalanceSerializer(serializers.ModelSerializer):
    """
    Account ballance serialazers
    """

    class Meta:
        model = CurrentBalance
        fields = "__all__"