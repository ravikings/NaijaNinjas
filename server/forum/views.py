from django.shortcuts import get_object_or_404, render
from rest_framework import viewsets
from rest_framework.response import Response
from forum.serializers import CommentSerializer, ForumSerializer, SimpleForum, ForumHomeSerializer, ForumImageSerializer
from forum.models import Forum, Comment
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwner
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from history.signals import history_tracker
from accounts.views import get_client_ip
from accounts.models import IpModel
from django.db.models import Count
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from forum.models import Photo
from rest_framework.views import APIView

# Create your views here.

class ForumList(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """

    queryset = Forum.objects.all()
    serializer_class = ForumSerializer

    def retrieve(self, request, pk=None):
        ip = get_client_ip(request)
        forum = Forum.objects.get(id=pk)
        #history_tracker(request, forum)
        if IpModel.objects.filter(ip=ip).exists():
                forum.views.add(IpModel.objects.get(ip=ip))
        else:
            IpModel.objects.create(ip=ip)
            forum.views.add(IpModel.objects.get(ip=ip))
        serializer = ForumSerializer(forum)
        
        return Response(serializer.data)


class ForumView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    serializer_class = ForumSerializer
    permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        return Forum.objects.filter(author=self.request.user.id)


class ForumHomeView(viewsets.ReadOnlyModelViewSet):
    
    """
    uses to view forum home view
    """

    queryset = Forum.objects.all()
    serializer_class = ForumHomeSerializer


class CommentView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permissions_classes = [IsAuthenticated and IsOwner]


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


class RecentForum(viewsets.ReadOnlyModelViewSet):

    serializer_class = SimpleForum

    def get_queryset(self):

        similar_posts = Forum.objects.annotate(view_counts=Count("views"))
        self.queryset = similar_posts.order_by("-view_counts", "-created")[:5]
        
        return self.queryset


class ImageAPIView(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = ForumImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, pk=None):
        property_id = request.data['forum']
        form_data = {}
        form_data['forum']= property_id
        success = True
        response = []

        for images in request.FILES.getlist('image'):
            form_data['image']=images   
            serializer = ForumImageSerializer(data=form_data)
            if serializer.is_valid():
                serializer.save()
                response.append(serializer.data)
            else:
                success = False
        if success:
            return Response(response, status=status.HTTP_201_CREATED)
            
        return Response(response,status=status.HTTP_400_BAD_REQUEST)
