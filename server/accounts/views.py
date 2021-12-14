from rest_framework import generics, viewsets
from .models import AccountUser, RunnerProfile
from .serializers import CustomUserDetailsSerializer, RunnerProfileSerializer


class Account_cred(generics.ListAPIView):
    queryset = AccountUser.objects.all()
    serializer_class = CustomUserDetailsSerializer


class RunnnerProfile(viewsets.ModelViewSet):
    queryset = RunnerProfile.objects.all()
    serializer_class = RunnerProfileSerializer
