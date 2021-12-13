from rest_framework import generics
from .models import AccountUser
from .serializers import CustomUserDetailsSerializer

class profiles(generics.ListAPIView):
    queryset = AccountUser.objects.all()
    serializer_class = CustomUserDetailsSerializer