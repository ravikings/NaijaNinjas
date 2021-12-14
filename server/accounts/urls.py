from django.urls import path, include
from .views import Account_cred, RunnnerProfile
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"dashboard-profile", RunnnerProfile, basename="user_dashboard")


urlpatterns = [
    
    path("account/profile", include(router.urls)),
]
