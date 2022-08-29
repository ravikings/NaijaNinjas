from django.shortcuts import render,get_object_or_404
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.permissions import IsOwner
from accounts.models import AccountUser, RunnerProfile
from task.serializers import TaskSerializer,TimelineStartSerializer, TaskBidderSerializer, TaskImageSerializer, TimelineSerializer, TimelineCommentSerializer, TaskAssignedSerializer, TaskBidderprofileSerializer, TaskWithTotalBidSerializer, ContractSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from task.models import Task, TaskBidder, Photo, Timeline, Comment, TaskBookmarks
from django.db.models import Count
from history.signals import history_tracker
from accounts.views import get_client_ip
from accounts.models import IpModel
from rest_framework import status
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, permission_classes

# Create your views here.

@method_decorator(cache_page(60 * 30), name='dispatch')
class TaskView(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    queryset = Task.objects.filter(post_status="OPEN")
    # .annotate(num_views=Count('views')) \
    #             .order_by('-num_views', '-created',)
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

    serializer_class = TaskWithTotalBidSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        user_id = self.request.query_params.get('user_id')
        return Task.objects.filter(author_id=user_id)


class ContractView(viewsets.ModelViewSet):

    serializer_class = ContractSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):
        
        return TaskBidder.objects.filter(payment_author=self.request.query_params.get('userId'))


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
        offer_charge = data.get('offer_charge')
        if not offer:
            raise("please add offer")
        bid_queryset = Task.objects.get(id=task_id, post_status="OPEN")
        profile_odj = RunnerProfile.objects.get(author=bidder_id)
        if bid_queryset:
            obj, _created = TaskBidder.objects.get_or_create(bidder_profile=profile_odj, 
                                            task=bid_queryset)
            obj.offer = offer
            obj.offer_charge = offer_charge
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

    permissions_classes = [AllowAny]
    queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderSerializer
    
    #permissions_classes = [IsAuthenticated and IsOwner]


    # def post(self, request, pk=None):

    #     task_id = request.query_params.get('task_id')
    #     bid_to_approve = get_object_or_404(TaskBidder, task_id=task_id)
    #     if (bid_to_approve.exists() and (bid_to_approve.bid_approve_status == False)):

    #         if bid_to_approve.runner_confirmed:
    #             return Response({"error": "Task already assigned"})
                
    #         serializer = TaskBidderSerializer(instance=bid_to_approve, data=request.data)
    #         if serializer.is_valid():
    #             serializer.save()
    #             bid_to_approve.set_task_status()
    #         owner = bid_to_approve.bidder_profile_set.author
    #         print("owner info")
    #         print(owner)
    #         AccountUser.objects.get(id__in=[bid_to_approve.payment_author, owner])
    #         Timeline.objects.create()
    #         return Response({"message": "the bid you approved was successful"})

    #     return Response({"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST)


class TimelineView(viewsets.ModelViewSet):
    
    """
    uses to add Timeline to view task activities
    """

    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def retrieve(self, request, pk=None):

        query = Timeline.objects.filter(task=pk)
        serializer = TimelineSerializer(query)
        return Response(serializer.data)

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
    
        return TaskBidder.objects.filter(bidder_profile=self.request.user.id, bid_approve_status=True).order_by("modified")
        # TODO Missing filter for task completed to be shown.


@api_view(["POST"])
def task_favorite(request, pk):

    task = TaskBookmarks.objects.filter(author=request.user.id, task=pk)
    if task:
        task.delete()        
        return Response({"message": f"task {pk} removed"})
    else:
        author = get_object_or_404(AccountUser, id=request.user.id)
        task = get_object_or_404(Task, id=pk)
        TaskBookmarks.objects.create(author=author, task=task)
        return Response({"message": f"task {pk} added"})


class DashboardTaskFavorite(viewsets.ModelViewSet):
    
    """
    uses to add review to profile
    """

    serializer_class = TaskSerializer
    #permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        return Task.objects.filter(id__in=TaskBookmarks.objects.filter(author_id=self.request.user.id).values_list("task"))


@method_decorator(cache_page(60 * 15), name='dispatch')
class SearchTask(viewsets.ModelViewSet):

    search_fields = [
        "title",
        "sector",
        "fixed_salary",
        "minimum_salary",
        "maximum_salary",
        "region",
        "location",
        "department",
        "experience",
        "description",
        "tags",
        "created",
        "updated",
    ] 

    queryset = Task.objects.filter(post_status="OPEN")
    serializer_class = TaskSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "title",
        "sector",
        "fixed_salary",
        "minimum_salary",
        "maximum_salary",
        "region",
        "location",
        "department",
        "experience",
        "description",
        "tags",
        "created",
        "updated",
    ] 

    ordering_fields = "__all__"

@api_view(["GET", "POST"])
#@permission_classes([AllowAny])
def accept_bid(request):

    task_id = request.query_params.get('task_id')
    id = request.query_params.get('id')
    bid_to_approve = TaskBidder.objects.filter(task_id=task_id, id=id)
    if bid_to_approve.exists() and (bid_to_approve[0].bid_approve_status == False):
        bid = bid_to_approve[0]
        if bid.runner_confirmed:
            return Response({"error": "Task already assigned"})
        
        owner = bid.bidder_profile.author.id
        #TODO: Uncomment in the future
        if bid.payment_author.id == owner:
           raise ("user not allowed perform action")
        response_data = {}
        response_data["professional_first_name"] = bid.bidder_profile.first_name
        response_data["professional_last_name"] = bid.bidder_profile.last_name
        response_data["offer"] = bid.offer
        task_owner, client_info = AccountUser.objects.filter(id__in=[owner, bid.payment_author.id])
        print("creating timeline")
        query_set = Timeline.objects.create(author=bid.payment_author,task_owner=task_owner,task=bid.task)
        print("update task status")
        bid.approve_bids()
        bid.set_task_status()
        response_data["payment_email"] = client_info.email
        print("timeline created")
        serializer = TimelineStartSerializer(query_set)
        response_data.update(serializer.data)
        return Response(response_data)

    return Response({"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
#@permission_classes([AllowAny])
def get_timeiline(request, task_id, task_owner):

    data = Timeline.objects.get(task=task_id, task_owner=task_owner)
    serializer = TimelineSerializer(data)
    return Response(serializer.data)