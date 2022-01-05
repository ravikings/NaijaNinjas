from django.shortcuts import render
from rest_framework import viewsets
from forum.serializers import CommentSerializer, ForumSerializer
from forum.models import Forum, Comment


# Create your views here.
class ForumView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = Forum.objects.all()
    serializer_class = ForumSerializer
    #permissions_classes = [IsAuthenticated]


class CommentView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    #permissions_classes = [IsAuthenticated]