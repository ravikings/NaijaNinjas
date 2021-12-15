from django.urls import path, include
from .views import AccountProfile
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"dashboard-profile", AccountProfile, basename="user_dashboard")


urlpatterns = [
    path("account/profile", include(router.urls)),
]
