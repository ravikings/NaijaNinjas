from rest_framework import generics, permissions, viewsets
from accounts.permissions import IsOwner, IsOwnerOrReadOnly
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AccountUser, Photo, Vidoe
from .serializers import UserAccountSerializer, PhotosSerializer, VidoesSerializer

class AccountProfile(viewsets.ModelViewSet):
    queryset = AccountUser.objects.all()
    serializer_class = UserAccountSerializer
    #permission_classes = (IsOwner)

    def retrieve(self, request, pk=None):
        queryset = AccountUser.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserAccountSerializer(user)
        return Response(serializer.data)

class PhotoUpload(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = PhotosSerializer
    permissions_classes = (IsOwnerOrReadOnly)
            
class VideoUpload(viewsets.ModelViewSet):
    queryset = Vidoe.objects.all()
    serializer_class = VidoesSerializer
    permissions_classes = (IsOwnerOrReadOnly)