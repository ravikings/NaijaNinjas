from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import users_account


router = DefaultRouter()


urlpatterns = [
    path("", include(router.urls)),
    path("balance/", users_account, name=""),
]