# REST Framework Imports
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# First Party Imports
from ..serializers import FCMDeviceeSerializer
from ..models.fcm_device import FCMDevice
from firebase_admin.messaging import Message, Notification

# General Error Codes
SUCCESS = "10"
CANNOT_FIND = "9010"
INVALID_DATA = "9011"


class FCMDeviceView(APIView):
    def post(self, request):
        """_summary_

        Args:
            registration_id (_type_): fcm token
            device_id (_type_): user email address
            type (_type_): device type(ios = 0, andriod=1, web= 2)

        Returns:
            _type_: _description_
        """

        serializer = FCMDeviceeSerializer(data=self.request.data)
        if not serializer.is_valid(raise_exception=False):
            return Response(
                {
                    "error": "[invalid data, query parameter require are: registration_id,device_type]"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data
        # data = self.request.data
        registration_id = data.get("registration_id")
        device_type = data.get("type")

        FCMDevice.objects.get_or_create(
            registration_id=registration_id,
            user=self.request.user,
            active=True,
            defaults={
                "device_id": self.request.user.email,
                "type": device_type,
            },
        )

        return Response({"code": SUCCESS}, status=status.HTTP_201_CREATED)


class TestFCMDeviceView(APIView):
    def get(self, request):

        device = FCMDevice.objects.filter(registration_id__isnull=False)
        data = Message(
            notification=Notification(title="gigx now", body="text", image=""),
            topic=None,
        )
        # send_message parameters include: message, dry_run, app
        device.send_message(data)

        return Response({"code": SUCCESS}, status=status.HTTP_201_CREATED)
