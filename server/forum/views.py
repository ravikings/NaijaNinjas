from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.response import Response
from forum.serializers import CommentSerializer, ForumSerializer
from forum.models import Forum, Comment
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwner


# Create your views here.


class ForumList(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = Forum.objects.all()
        serializer = ForumSerializer(queryset, many=True)

        from datetime import datetime, timedelta
        from pytz import timezone
        import pytz

        utc = pytz.utc
        x = utc.zone
        print("heloo people")
        print(x)
        return Response(serializer.data)


class ForumView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    serializer_class = ForumSerializer
    permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        return Forum.objects.filter(author=self.request.user.id)


class CommentView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    # permissions_classes = [IsAuthenticated]


class CommentVotes(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    which include view count for each unique ip
    """

    permissions_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        comment = get_object_or_404(Comment, id=pk)
        if comment.votes.filter(id=request.user.id).exists():
            comment.votes.remove(request.user)
            data = {"vote": False}
        else:
            comment.votes.add(request.user)
            data = {"vote": True}
        return Response(data)
