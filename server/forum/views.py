from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.response import Response
from forum.serializers import CommentSerializer, ForumSerializer
from forum.models import Forum, Comment
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwner
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend


# Create your views here.


# class ForumList(viewsets.ViewSet):
class ForumList(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """

    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

    # def list(self, request):
    #     queryset = Forum.objects.all()
    #     serializer = ForumSerializer(queryset, many=True)
    #     return Response(serializer.data)


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
    permissions_classes = [IsAuthenticated]


class CommentVotes(viewsets.ViewSet):
    """
    A simple ViewSet for voting for users.
    which include id pass will be the comment id
    """

    permissions_classes = [IsAuthenticated]

    def retrieve(self, request, pk=None):
        comment = get_object_or_404(Comment, id=pk)

        from django.core.mail import send_mail

        send_mail(
            "Django mail",
            "This e-mail was sent with Django i just voted.",
            "barry.shoki1@gmail.com",
            ["barry.shoki1@gmail.com"],
            fail_silently=False,
        )
        if comment.votes.filter(id=request.user.id).exists():
            comment.votes.remove(request.user)
            data = {"vote": False}
        else:
            comment.votes.add(request.user)
            data = {"vote": True}
        return Response(data)


class SearchForum(viewsets.ModelViewSet):

    search_fields = ["title", "body", "tags", "category"]
    queryset = Forum.objects.all()
    serializer_class = ForumSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
