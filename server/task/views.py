from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from accounts.permissions import IsOwner
from task.serializers import TaskSerializer, TaskBidderSerializer
from task.models import Task, TaskBidder
from history.signals import history_tracker
from accounts.views import get_client_ip
from accounts.models import IpModel
from rest_framework import status

# Create your views here.

class TaskView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permissions_classes = [IsAuthenticated and IsOwner]

    def retrieve(self, request, pk=None):
        ip = get_client_ip(request)
        task = get_object_or_404(Task, id=pk)
        history_tracker(request, task)
        if IpModel.objects.filter(ip=ip).exists():
                task.views.add(IpModel.objects.get(ip=ip))
        else:
            IpModel.objects.create(ip=ip)
            task.views.add(IpModel.objects.get(ip=ip))
        serializer = TaskSerializer(task)

        return Response(serializer.data)

class TaskBidderView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """
    queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderSerializer
    permissions_classes = [IsAuthenticated and IsOwner]

    def retrieve(self, request, pk=None):

        data = get_object_or_404(TaskBidder, task_id=pk)
        serializer = TaskBidderSerializer(data)
        return Response(serializer.data)

    def create(self, request, pk=None):

        task_id = request.query_params.get('task_id')
        offer = request.query_params.get('offer')
        bid_queryset = Task.objects.filter(author=pk, post_status="Open")
        if bid_queryset.exists():
            placement_bid = TaskBidder.objects.create(bidder=request.user.id, 
                                            task=task_id, 
                                            offer=offer)
            return Response({"message": "You request was successfully processed"})

        return Response({"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST)