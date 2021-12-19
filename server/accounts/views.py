from rest_framework import generics, permissions, viewsets
from accounts.permissions import IsOwner, IsOwnerOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import AccountUser, Photo, Vidoe, RunnerProfile
from .serializers import (
    UserAccountSerializer,
    PhotosSerializer,
    VidoesSerializer,
    UserProfileDetailsSerializer,
)

class AccountProfile(viewsets.ModelViewSet):
    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileDetailsSerializer
    permission_classes = IsOwner

    def retrieve(self, request, pk=None):
        queryset = RunnerProfile.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserAccountSerializer(user)
        return Response(serializer.data)

class PhotoUpload(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotosSerializer
    permissions_classes = IsOwnerOrReadOnly

class VideoUpload(viewsets.ModelViewSet):
    queryset = Vidoe.objects.all()
    serializer_class = VidoesSerializer
    permissions_classes = IsOwnerOrReadOnly

class SearchProfile(viewsets.ModelViewSet):
    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileDetailsSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "title",
        "location",
        "salary",
        "postcode",
        "description",
        "state",
        "city",
        "local_goverment_zone",
    ]
    search_fields = [
        "id",
    ]
    ordering_fields = "__all__"
