# REST Framework Imports
from rest_framework import serializers

# First Party Imports
from .models.fcm_device import OSTypes, FCMDevice


class FCMDeviceeSerializer(serializers.ModelSerializer):
    """Create serializer for FCMDevice"""

    registration_id = serializers.CharField(required=True, write_only=True)
    # device_id = serializers.CharField(required=True, write_only=True)
    type = serializers.ChoiceField(required=True, choices=OSTypes.choices, write_only=True)

    class Meta:
        model = FCMDevice
        fields = ["registration_id", "type"]
