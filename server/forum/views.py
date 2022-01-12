from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.response import Response
from forum.serializers import CommentSerializer, ForumSerializer
from forum.models import Forum, Comment


# Create your views here.
class ForumView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = Forum.objects.all()
    serializer_class = ForumSerializer
    # permissions_classes = [IsAuthenticated]


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

    def retrieve(self, request, pk=None):
        comment = get_object_or_404(Comment, id=pk)
        if comment.votes.filter(id=request.user.id).exists():
            comment.votes.remove(request.user)
            data = {"vote": False}
        else:
            comment.votes.add(request.user)
            data = {"vote": True}
        return Response(data)
