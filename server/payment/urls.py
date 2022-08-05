from django.urls import path
from .views import verify_payment, accept_webhook

urlpatterns = [
    path('callback/', verify_payment, name="verify-payment"),
    path('webhook/', accept_webhook, name="payment-webhook")
]