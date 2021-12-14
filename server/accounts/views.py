from rest_framework import generics
from rest_framework import viewsets
from .models import AccountUser, RunnerProfile
from .serializers import CustomUserDetailsSerializer, RunnerProfileSerializer

class Account_cred(generics.ListAPIView):
    queryset = AccountUser.objects.all()
    serializer_class = CustomUserDetailsSerializer


class RunnnerProfile(generics.ListCreateAPIView): 
    queryset = RunnerProfile.objects.all()
    serializer_class = RunnerProfileSerializer