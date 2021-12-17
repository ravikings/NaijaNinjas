from django.urls import path, include
from .views import AccountProfile, PhotoUpload, VideoUpload, SearchProfile
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"dashboard-profile", AccountProfile, basename="user-dashboard")
router.register(r"image", PhotoUpload, basename="dashboard-images")
router.register(r"video", VideoUpload, basename="dashboard-videos")
router.register(r"search", SearchProfile, basename="search")


urlpatterns = [
    path("account/profile", include(router.urls)),

]
