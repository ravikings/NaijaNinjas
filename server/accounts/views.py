from rest_framework import viewsets
from accounts.permissions import IsRunner
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from history.signals import history_tracker
from .models import (
    AccountUser,
    Photo,
    Vidoe,
    RunnerProfile,
    RunnerResume,
    Review,
    IpModel,
)
from .serializers import (
    PhotosSerializer,
    VidoesSerializer,
    UserProfileSearchSerializer,
    ProfileSerializer,
    UserAccountSerializer,
    RunnerProfileSerializer,
    ReviewSerializer,
    UserSearchDetialSerializer,
    UserResumeSerializer
)


class DashboardProfile(viewsets.ModelViewSet):

    """
    dashboard serializers use for entry data for getting data to the ui
    """

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated and IsRunner]

    def get_queryset(self):

        return RunnerProfile.objects.filter(author=self.request.user.id)

    def perform_create(self, serializer):

        serializer.save(author=self.request.user.id)


class DashboardResume(viewsets.ModelViewSet):

    """
    uses to update resume for only runner dashboard
    """

    serializer_class = UserResumeSerializer
    permissions_classes = [IsAuthenticated and IsRunner]

    def get_queryset(self):

        return RunnerResume.objects.filter(author=self.request.user)

    def perform_create(self, serializer):

        serializer.save(author=self.request.user)


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
    permissions_classes = [IsAuthenticated and IsRunner]

    def get_queryset(self):
        if self.request.method == "GET":
            return Photo.objects.all()
        else:
            return Photo.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class VideoUpload(viewsets.ModelViewSet):

    """
    uses to upload video to ui dashboard
    """

    queryset = Vidoe.objects.all()
    serializer_class = VidoesSerializer
    permissions_classes = [IsAuthenticated and IsRunner]


class ReviewView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permissions_classes = [IsAuthenticated]


class SearchProfile(viewsets.ModelViewSet):

    """
    uses for search engine for the application
    """

    search_fields = [
        "title",
        "location",
        "salary",
        "postcode",
        "description",
        "state",
        "city",
        "local_goverment_zone",
    ]
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

    ordering_fields = "__all__"


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


class UserSearchDetails(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    which include view count for each unique ip
    """

    def retrieve(self, request, pk=None):

        ip = get_client_ip(request)
        profile = RunnerProfile.objects.get(author=pk)
        history_tracker(request, profile)
        if IpModel.objects.filter(ip=ip).exists():
            profile.views.add(IpModel.objects.get(ip=ip))
        else:
            IpModel.objects.create(ip=ip)
            profile.views.add(IpModel.objects.get(ip=ip))
        queryset = RunnerProfile.objects.all()
        profile = get_object_or_404(queryset, author=pk)
        serializer = UserSearchDetialSerializer(profile)
        return Response(serializer.data)


class TestView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileSearchSerializer