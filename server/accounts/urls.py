from django.urls import path, include
from .views import (
    PhotoUpload,
    VideoUpload,
    SearchProfile,
    DashboardProfile,
    AccountStatus,
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"profile", DashboardProfile, basename="dashboard-profile")
router.register(r"resume", DashboardProfile, basename="dashboard-resume")
router.register(r"image", PhotoUpload, basename="dashboard-images")
router.register(r"video", VideoUpload, basename="dashboard-videos")
router.register(r"search", SearchProfile, basename="search")
router.register(r"user-status", AccountStatus, basename="user-status")


urlpatterns = [
    path("account/", include(router.urls)),
]
