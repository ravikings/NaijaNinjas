from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AccountUser, RunnerProfile
from .serializers import UserProfileDetailsSerializer


class Account_cred(generics.ListAPIView):
    queryset = AccountUser.objects.all()
    serializer_class = UserProfileDetailsSerializer



class RunnnerProfile(viewsets.ModelViewSet):
    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileDetailsSerializer

    @action(detail=True, methods=['get'])
    def get_query(self, pk=None):
        user = get_object_or_404(pk=pk)
        serializer = UserProfileDetailsSerializer(user)
        return Response(serializer.data)