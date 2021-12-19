from django.urls import path, include
from .views import (
    AccountDashboardProfile,
    PhotoUpload,
    VideoUpload,
    SearchProfile,
    
)
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"image", PhotoUpload, basename="dashboard-images")
router.register(r"video", VideoUpload, basename="dashboard-videos")
router.register(r"search", SearchProfile, basename="search")
router.register(r"profile", AccountDashboardProfile, basename="dashboard-profile")


urlpatterns = [
    path("account/", include(router.urls)),
]
