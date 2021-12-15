from rest_framework import generics, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AccountUser
from .serializers import UserAccountSerializer


class AccountProfile(viewsets.ModelViewSet):
    queryset = AccountUser.objects.all()
    serializer_class = UserAccountSerializer

    def retrieve(self, request, pk=None):
        queryset = AccountUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserAccountSerializer(user)
        return Response(serializer.data)
