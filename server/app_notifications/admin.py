from django.contrib import admin

# Other Third Party Imports
from fcm_django.admin import DeviceAdmin
from fcm_django.models import FCMDevice as BaseFCMDevice

from .models.fcm_device import FCMDevice

# Register your models here.

# Unregister the original FCMDevice from the admin
admin.site.unregister(BaseFCMDevice)


@admin.register(FCMDevice)
class FCMAdmin(DeviceAdmin):
    raw_id_fields = ()
