from django.urls import path, include
from .views import verify_payment, accept_webhook, CardsDetailView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"user-card", CardsDetailView, basename="user-card")

urlpatterns = [
    path("bank/", include(router.urls)),
    path('callback/', verify_payment, name="verify-payment"),
    path('webhook/', accept_webhook, name="payment-webhook")
]