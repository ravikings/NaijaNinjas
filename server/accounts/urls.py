from django.urls import path, include
from .views import AccountProfile, PhotoUpload, VideoUpload
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"dashboard-profile", AccountProfile, basename="user_dashboard")
router.register(r"image", PhotoUpload, basename="dashboard-image")
router.register(r"video", VideoUpload, basename="dashboard-video")

urlpatterns = [
    path("account/profile", include(router.urls)),
]
