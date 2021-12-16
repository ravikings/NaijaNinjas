from django.urls import path, include
from .views import AccountProfile, PhotoUpload, VideoUpload
from rest_framework.routers import DefaultRouter
from documents.views import ProfileIndexSearchView

router = DefaultRouter()
router.register(r"dashboard-profile", AccountProfile, basename="user-dashboard")
router.register(r"image", PhotoUpload, basename="dashboard-images")
router.register(r"video", VideoUpload, basename="dashboard-videos")
router.register("profile/search", ProfileIndexSearchView, basename="profile-search")


urlpatterns = [
    path("account/profile", include(router.urls)),

]
