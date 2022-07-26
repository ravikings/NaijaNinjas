from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwner
from accounts.models import AccountUser, RunnerProfile
from task.serializers import TaskSerializer, TaskBidderSerializer, TaskImageSerializer, TimelineSerializer, TimelineCommentSerializer, TaskAssignedSerializer, TaskBidderprofileSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from task.models import Task, TaskBidder, Photo, Timeline, Comment
from history.signals import history_tracker
from accounts.views import get_client_ip
from accounts.models import IpModel
from rest_framework import status
from django.db import transaction
from rest_framework.decorators import api_view

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = Task.objects.filter(post_status="OPEN")
    serializer_class = TaskSerializer

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

        user_id = self.request.query_params.get('user_id')
        return Task.objects.filter(author_id=user_id)


class TaskBidderView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    # queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderprofileSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):
    
        data = TaskBidder.objects.filter(task_id=self.request.query_params.get('task'))
        active_user = data.filter(bid_approve_status=True)
        return active_user if len(active_user) != 0 else data


    def create(self, request, pk=None):

        data = request.data
        task_id = data.get('task')
        offer = data.get('offer')
        bidder_id = data.get('bidder')
        if not offer:
            raise("please add offer")
        bid_queryset = Task.objects.get(id=task_id, post_status="OPEN")
        profile_odj = RunnerProfile.objects.get(author=bidder_id)
        if bid_queryset:
            obj, _created = TaskBidder.objects.get_or_create(bidder_profile=profile_odj, 
                                            task=bid_queryset)
            obj.offer = offer
            obj.save()
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
    #permissions_classes = [IsAuthenticated and IsOwner]


    def post(self, request, pk=None):

        task_id = request.query_params.get('task_id')
        bid_to_approve = get_object_or_404(TaskBidder, task_id=task_id)
        if (bid_to_approve.exists() and (bid_to_approve.bid_approve_status == False)):

            if bid_to_approve.runner_confirmed:
                return Response({"error": "Task already assigned"})
                
            serializer = TaskBidderSerializer(instance=bid_to_approve, data=request.data)
            if serializer.is_valid():
                serializer.save()
                bid_to_approve.set_task_status()

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


class TaskAssigned(viewsets.ModelViewSet):

    """
    uses to get assigned tasks to professionals
    """

    #queryset = TaskBidder.objects.all()
    serializer_class = TaskAssignedSerializer
    #permissions_classes = [IsAuthenticated and Is_a_runner]

    def get_queryset(self):
    
        return TaskBidder.objects.filter(bidder_id=self.request.user.id, bid_approve_status=True).order_by("modified")
        # TODO Missing filter for task completed to be shown.

@api_view(["POST", "GET"])
def task_favorite(request, pk):

    task = get_object_or_404(Task, id=pk)
    if task.bookmarks.filter(id=request.user.id).exists():
        task.bookmarks.remove(request.user)
        return Response({"message": "task removed"})
    else:
        task.bookmarks.add(request.user)
        return Response({"message": "task added"})