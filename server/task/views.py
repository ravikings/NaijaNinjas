from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwner
from task.serializers import TaskSerializer, TaskBidderSerializer, TaskImageSerializer, TimelineSerializer, TimelineCommentSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from task.models import Task, TaskBidder, Photo, Timeline, Comment
from history.signals import history_tracker
from accounts.views import get_client_ip
from accounts.models import IpModel
from rest_framework import status
from django.db import transaction

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = Task.objects.filter(post_status="open")
    serializer_class = TaskSerializer
    #permissions_classes = [IsAuthenticated and FreelancerIsOwner]

    def retrieve(self, request, pk=None):
        ip = get_client_ip(request)
        task = Task.objects.get(id=pk)
        history_tracker(request, task)
        if IpModel.objects.filter(ip=ip).exists():
                task.views.add(IpModel.objects.get(ip=ip))
        else:
            IpModel.objects.create(ip=ip)
            task.views.add(IpModel.objects.get(ip=ip))
        serializer = TaskSerializer(task)

        return Response(serializer.data)

class TaskOwnerView(viewsets.ModelViewSet):

    serializer_class = TaskSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        return Task.objects.filter(author_id=self.request.user.id)


class TaskBidderView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """
    queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def retrieve(self, request, pk=None):

        data = get_object_or_404(TaskBidder, task_id=pk)
        serializer = TaskBidderSerializer(data)
        return Response(serializer.data)


    def post(self, request, pk=None):

        task_id = request.query_params.get('task_id')
        offer = request.query_params.get('offer')
        bid_queryset = Task.objects.filter(author=pk, post_status="Open")
        if bid_queryset.exists():
            placement_bid = TaskBidder.objects.update_or_create(bidder=request.user.id, 
                                            task=task_id, 
                                            offer=offer)
            return Response({"message": "Your bid was successfully processed"})

        return Response({"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST)


class TaskImageAPIView(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = TaskImageSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, pk=None):
        property_id = request.data['task']
        form_data = {}
        form_data['task']= property_id
        success = True
        response = []

        for images in request.FILES.getlist('image'):
            form_data['image']=images   
            serializer = TaskImageSerializer(data=form_data)
            if serializer.is_valid():
                serializer.save()
                response.append(serializer.data)
            else:
                success = False
        if success:
            return Response(response, status=status.HTTP_201_CREATED)
            
        return Response(response,status=status.HTTP_400_BAD_REQUEST)


class TaskApproveView(viewsets.ModelViewSet):

    queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderSerializer


    def post(self, request, pk=None):

        task_id = request.query_params.get('task_id')
        bid_to_approve = get_object_or_404(TaskBidder, task_id=task_id)
        if (bid_to_approve.exists() and bid_to_approve.bid_approve_status == False):

            if bid_to_approve.runner_confirmed:
                return Response({"error": "Task already assigned"})
                
            serializer = TaskBidderSerializer(instance=bid_to_approve, data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response({"message": "the bid you approved was successful"})

        return Response({"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST)


class TimelineView(viewsets.ModelViewSet):
    
    """
    uses to add Timeline to view task activities
    """

    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

class TimelineCommentView(viewsets.ModelViewSet):
    
    """
    uses to add Timeline to view task activities
    """

    queryset = Comment.objects.all()
    serializer_class = TimelineCommentSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]
