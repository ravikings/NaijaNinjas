from rest_framework import generics, permissions, viewsets
from accounts.permissions import IsOwner, IsOwnerOrReadonly
from django.shortcuts import get_object_or_404
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import AccountUser, Photo, Vidoe, RunnerProfile, RunnerResume, Review
from .serializers import (
    PhotosSerializer,
    VidoesSerializer,
    UserProfileSearchSerializer,
    ProfileSerializer,
    UserAccountSerializer,
    UserResumeDetailsSerializer,
    ReviewSerializer
)


class DashboardProfile(viewsets.ModelViewSet):

    """
    dashboard serializers use for entry data for getting data to the ui
    """

    queryset = RunnerProfile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [IsOwner]

    def retrieve(self, request, pk=None):
        queryset = RunnerProfile.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = ProfileSerializer(user)
        return Response(serializer.data)

class DashboardResume(viewsets.ModelViewSet):
    
    """
    uses to upload pictures to ui dashboard
    """

    queryset = RunnerResume.objects.all()
    serializer_class = UserResumeDetailsSerializer
    permissions_classes = [IsOwner]



class AccountStatus(viewsets.ModelViewSet):
    
    """
    uses to upload pictures to ui dashboard
    """

    queryset = AccountUser.objects.all()
    serializer_class = UserAccountSerializer


class PhotoUpload(viewsets.ModelViewSet):

    """
    uses to upload pictures to ui dashboard
    """

    queryset = Photo.objects.all()
    serializer_class = PhotosSerializer
    permissions_classes = [IsOwner]


class VideoUpload(viewsets.ModelViewSet):

    """
    uses to upload video to ui dashboard
    """

    queryset = Vidoe.objects.all()
    serializer_class = VidoesSerializer
    permissions_classes = [IsOwner]

class ReviewView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permissions_classes = [IsOwnerOrReadonly]

class SearchProfile(viewsets.ModelViewSet):

    """
    uses for search engine for the application
    """

    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileSearchSerializer
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
