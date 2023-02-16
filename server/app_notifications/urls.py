from django.urls import path, include
from .views.fcm_views import FCMDeviceView, TestFCMDeviceView

urlpatterns = [
    path("fcm/", FCMDeviceView.as_view(), name="fcm"),
    path("fcm/test", TestFCMDeviceView.as_view(), name="fcm-test"),
]
