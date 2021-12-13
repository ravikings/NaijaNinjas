from django.urls import path
from .views import profiles


urlpatterns = [
    
    path("profile/", profiles.as_view()),
]