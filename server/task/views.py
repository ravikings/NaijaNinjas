from django.shortcuts import render, get_object_or_404
from django.core.exceptions import PermissionDenied
from django.http import FileResponse
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.permissions import IsOwner
from accounts.models import AccountUser, RunnerProfile
from bank.models import CurrentBalance
from task.serializers import (
    TaskSerializer,
    TimelineStartSerializer,
    TaskBidderSerializer,
    TaskImageSerializer,
    TimelineSerializer,
    TimelineCommentSerializer,
    TaskAssignedSerializer,
    TaskBidderprofileSerializer,
    TaskWithTotalBidSerializer,
    ContractSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser
from task.models import (
    Task,
    TaskBidder,
    Photo,
    Timeline,
    Comment,
    TaskBookmarks,
    BiddersOnTask,
)
from django.db.models import Count
from history.signals import history_tracker
from accounts.views import get_client_ip
from accounts.models import IpModel
from rest_framework import status
from django.db import transaction
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.views import APIView
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, permission_classes
from accounts.permissions import CanApproveTask
from rest_framework.authentication import TokenAuthentication
from durin.auth import (
    TokenAuthentication as DurinTokenAuthentication,
    CachedTokenAuthentication,
)
from datetime import datetime, timedelta
from django.utils import timezone

# Create your views here.


# @method_decorator(cache_page(60 * 30), name="dispatch")
class TaskView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = Task.objects.filter(post_status="OPEN")
    # .annotate(num_views=Count('views')) \
    #             .order_by('-num_views', '-created',)
    serializer_class = TaskSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )

    def retrieve(self, request, pk=None):

        task = Task.objects.get(id=pk)
        # TODO: Add celery to handle tracking
        # ip = get_client_ip(request)
        # history_tracker(request, task)
        # if IpModel.objects.filter(ip=ip).exists():
        #     task.views.add(IpModel.objects.get(ip=ip))
        # else:
        #     IpModel.objects.create(ip=ip)
        #     task.views.add(IpModel.objects.get(ip=ip))
        serializer = TaskSerializer(task)
        return Response(serializer.data)


class TaskRelatedView(viewsets.ModelViewSet):

    """
    this is use for searching related task,
    query parameters to be passed will be from current page data,
    sector, department, location, id, tags in comma separated.

    """

    serializer_class = TaskSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        sector = self.request.query_params.get("sector", None)
        department = self.request.query_params.get("department", None)
        location = self.request.query_params.get("location", None)
        tags = self.request.query_params.get("tags", None)
        id = self.request.query_params.get("id", None)
        tag_params = []
        if tags:
            tag_params.extend(tags.split(","))

        return Task.objects.filter(
            sector=sector, department=department, location=location, tags__in=tag_params
        ).exclude(id=id)


class TaskOwnerView(viewsets.ModelViewSet):

    serializer_class = TaskWithTotalBidSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        user_id = self.request.query_params.get("user_id")
        return Task.objects.filter(author_id=user_id)


class ContractView(viewsets.ModelViewSet):

    serializer_class = ContractSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        return TaskBidder.objects.filter(
            payment_author=self.request.query_params.get("userId")
        )


class TaskBidderView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    # queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderprofileSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        data = TaskBidder.objects.filter(task_id=self.request.query_params.get("task"))
        active_user = data.filter(bid_approve_status=True)
        return active_user if len(active_user) != 0 else data

    def create(self, request, pk=None):

        data = request.data
        task_id = data.get("task")
        offer = data.get("offer")
        bidder_id = data.get("bidder")
        total_charge = data.get("total_charge")
        description = data.get("description")
        attachment = data.get("attachment")
        delivery_date = data.get("delivery_date")
        if not offer:
            raise ("please add offer")
        bid_queryset = Task.objects.get(id=task_id, post_status="OPEN")
        if request.user.id == bid_queryset.author.id:
            return Response(
                {"error": "Hey! you cannot bid on your own task"},
                status=status.HTTP_403_FORBIDDEN,
            )
        profile_odj = RunnerProfile.objects.get(author=bidder_id)
        if bid_queryset:
            obj, _created = TaskBidder.objects.get_or_create(
                bidder_profile=profile_odj,
                task=bid_queryset,
                payment_author=bid_queryset.author,
            )
            obj.offer = offer
            obj.total_charge = total_charge
            obj.description = description
            obj.attachment = attachment
            obj.delivery_date = delivery_date
            obj.add_bidder_to_task(profile_odj.author)
            obj.save()
            return Response({"message": "Your bid was successfully processed"})

        return Response(
            {"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST
        )


class TaskImageAPIView(viewsets.ModelViewSet):
    queryset = Photo.objects.all()
    serializer_class = TaskImageSerializer
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )

    def create(self, request, pk=None):
        property_id = request.data["task"]
        form_data = {}
        form_data["task"] = property_id
        success = True
        response = []

        for images in request.FILES.getlist("image"):
            form_data["image"] = images
            serializer = TaskImageSerializer(data=form_data)
            if serializer.is_valid():
                serializer.save()
                response.append(serializer.data)
            else:
                success = False
        if success:
            return Response(response, status=status.HTTP_201_CREATED)

        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class TaskApproveView(viewsets.ModelViewSet):

    # permissions_classes = [AllowAny]
    queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )

    # permissions_classes = [IsAuthenticated and IsOwner]

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
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )
    # permissions_classes = [IsAuthenticated and IsOwner]

    def retrieve(self, request, pk=None):

        query = Timeline.objects.filter(task=pk)
        serializer = TimelineSerializer(query)
        return Response(serializer.data)


class TimelineCommentView(viewsets.ModelViewSet):

    """
    uses to add Timeline to view task activities
    """

    permissions_classes = [IsOwner]  # IsAuthenticated and
    authentication_classes = (DurinTokenAuthentication, TokenAuthentication)
    # queryset = Comment.objects.all()
    serializer_class = TimelineCommentSerializer

    def retrieve(self, request, pk=None):

        query = Comment.objects.get(id=pk)
        if (
            request.user in [query.task_timeline.author, query.task_timeline.task_owner]
            or request.user.is_superuser
        ):
            serializer = TimelineSerializer(query)
            return Response(serializer.data)

        raise PermissionDenied

    @action(detail=True, methods=["get", "post"])
    def file_download(self, request, pk=None):
        instance = Comment.objects.get(id=pk)
        # if (
        #     request.user
        #     in [instance.task_timeline.author, instance.task_timeline.task_owner]
        #     or request.user.is_superuser
        # ):
        file_handle = instance.attachment.open()
        if file_handle:
            # send file
            response = FileResponse(file_handle, content_type="file")
            response["Content-Length"] = instance.attachment.size
            response["Content-Disposition"] = (
                'attachment; filename="%s"' % instance.attachment.name
            )
            response["Access-Control-Expose-Headers"] = "Content-Disposition"

            return response

        raise PermissionDenied

    def list(self, request):
        pass
        return Response({"Error": "Not allowed"}, status=status.HTTP_400_BAD_REQUEST)


class TaskAssigned(viewsets.ModelViewSet):

    """
    uses to get assigned tasks to professionals
    """

    queryset = TaskBidder.objects.all()
    serializer_class = TaskAssignedSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )
    # permissions_classes = [IsAuthenticated and Is_a_runner]

    # def get_queryset(self):

    #     return TaskBidder.objects.filter(
    #         bidder_profile=41, bid_approve_status=True
    #     ).order_by("modified")
    # TODO Missing filter for task completed to be shown. self.request.user.id


@api_view(["POST"])
@authentication_classes([TokenAuthentication, DurinTokenAuthentication])
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
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        return Task.objects.filter(
            id__in=TaskBookmarks.objects.filter(
                author_id=self.request.user.id
            ).values_list("task")
        )


# @method_decorator(cache_page(60 * 15), name="dispatch")
class SearchTask(viewsets.ModelViewSet):

    search_fields = [
        "title",
        "sector",
        # "fixed_salary",
        # "minimum_salary",
        # "maximum_salary",
        "region",
        "location",
        "department",
        # "experience",
        "description",
        # "tags",
        # "created",
        # "updated",
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
        # "fixed_salary",
        # "minimum_salary",
        # "maximum_salary",
        "region",
        "location",
        "department",
        # "experience",
        "description",
        # "tags",
        # "created",
        # "updated",
    ]

    ordering_fields = "__all__"


@api_view(["GET", "POST"])
@authentication_classes([TokenAuthentication, DurinTokenAuthentication])
# @permission_classes([CanApproveTask])
def accept_bid(request):

    task_id = request.query_params.get("task_id")
    id = request.query_params.get("id")
    bid_to_approve = TaskBidder.objects.filter(task_id=task_id, id=id)
    if bid_to_approve.exists() and (bid_to_approve[0].task.post_status != "CLOSE"):
        bid = bid_to_approve[0]
        owner = bid.bidder_profile.author.id
        # TODO: Uncomment in the future
        if bid.payment_author.id == owner:
            return Response(
                {"error": "user not allowed perform action"},
                status=status.HTTP_403_FORBIDDEN,
            )
        response_data = {}
        response_data["professional_first_name"] = bid.bidder_profile.first_name
        response_data["professional_last_name"] = bid.bidder_profile.last_name
        response_data["total_charge"] = bid.total_charge
        print("creating timeline")
        query_set = Timeline.objects.create(
            author=bid.payment_author,
            task_owner=bid.bidder_profile.author,
            task=bid.task,
        )
        print("update task status")
        bid.approve_bids(query_set.id)
        # bid.add_bidder_to_task(bid.bidder_profile.author)
        print("timeline created")
        serializer = TimelineStartSerializer(query_set)
        response_data.update(serializer.data)
        return Response(response_data)

    return Response(
        {"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["GET", "POST"])
@authentication_classes([TokenAuthentication, DurinTokenAuthentication])
# @permission_classes([CanApproveTask])
def reject_bid(request, pk):

    bid_to_reject = TaskBidder.objects.get(id=pk)
    if bid_to_reject.bid_approve_status == "False":
        bid_to_reject.bid_approve_status = "Rejected"
        bid_to_reject.save()

        return Response({"message": "bid status updated"})
    return Response(
        {"message": "You can't update this bid"}, status=status.HTTP_400_BAD_REQUEST
    )


class OwnerTaskApprove(viewsets.ModelViewSet):

    queryset = TaskBidder.objects.all()
    serializer_class = TaskBidderSerializer
    permissions_classes = [IsAuthenticated and CanApproveTask]
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )

    @action(
        detail=False,
        methods=["post"],
        permission_classes=[IsAuthenticated],
        url_path="owner-approve",
        url_name="owner-approve",
    )
    def approve(self, request, pk=None):
        task_id = request.query_params.get("task_id")
        # pk = request.query_params.get("id")
        print("hello world")
        print(task_id, id)
        bid_to_approve = TaskBidder.objects.filter(task_id=task_id, id=pk)
        if bid_to_approve.exists() and (bid_to_approve[0].task.post_status != "CLOSE"):
            bid = bid_to_approve[0]
            owner = bid.bidder_profile.author.id
            # TODO: Uncomment in the future
            if bid.payment_author.id == owner:
                return Response(
                    {"error": "user not allowed perform action"},
                    status=status.HTTP_403_FORBIDDEN,
                )
            response_data = {}
            response_data["professional_first_name"] = bid.bidder_profile.first_name
            response_data["professional_last_name"] = bid.bidder_profile.last_name
            response_data["total_charge"] = bid.total_charge
            task_owner, client_info = AccountUser.objects.filter(
                id__in=[owner, bid.payment_author.id]
            )
            print("creating timeline")
            obj, _created = Timeline.objects.get_or_create(
                author=bid.payment_author, task_owner=task_owner, task=bid.task
            )
            print("update task status")
            bid.approve_bids()
            bid.add_bidder_to_task(task_owner)
            response_data["payment_email"] = client_info.email
            print("timeline created")
            serializer = TimelineStartSerializer(_created)
            response_data.update(serializer.data)
            return Response(response_data)

        return Response(
            {"error": "Request was not completed"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
@authentication_classes([TokenAuthentication, DurinTokenAuthentication])
@permission_classes([IsAuthenticated])
def get_timeiline(request, task_id, task_owner):
    order = request.data.get("order_id", False)
    data = Timeline.objects.get(task=task_id, task_owner=task_owner)
    if order:
        data = Timeline.objects.get(order=order, task_owner=task_owner)

    serializer = TimelineSerializer(data)
    return Response(serializer.data)


class GetTimelineView(viewsets.ModelViewSet):

    """
    uses to add Timeline to view task activities
    """

    permissions_classes = [IsAuthenticated and IsOwner]
    serializer_class = TimelineSerializer
    authentication_classes = (
        TokenAuthentication,
        DurinTokenAuthentication,
    )

    def get_queryset(self):
        task_id = self.kwargs["task_id"]
        task_owner = self.kwargs["task_owner"]
        query = Timeline.objects.filter(task=task_id, task_owner=task_owner)
        return query


@api_view(["GET"])
# @permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication, DurinTokenAuthentication])
def pro_assigned_task(request, task_owner):

    data = TaskBidder.objects.filter(
        bidder_profile__author=task_owner, transaction_verified=True
    )
    serializer = TaskAssignedSerializer(data, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated, IsOwner])
@authentication_classes([TokenAuthentication, DurinTokenAuthentication])
def task_ordered(request, task_owner):

    data = TaskBidder.objects.filter(
        payment_author=task_owner, transaction_verified=True
    )
    serializer = TaskBidderprofileSerializer(data, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
@transaction.atomic
@authentication_classes([TokenAuthentication, DurinTokenAuthentication])
def approve_delivery(request, pk):
    task_owner = request.data.get("task_owner")
    bid_id = request.data.get("task")
    query_task = get_object_or_404(TaskBidder, id=bid_id)

    if request.user in [query_task.payment_author, request.user.is_superuser]:
        query = get_object_or_404(Comment, id=pk)

        # logic below are use to credit pro, set pay out to 7days.
        now = timezone.now()
        next_five_days = now + timedelta(days=5)
        balance = get_object_or_404(CurrentBalance, author=task_owner, task=query_task)
        balance.payout_date = next_five_days
        balance.approved = True
        balance.save()
        query.status = request.data.get("status")
        query.update_timeline_status()
        query.save()
        serializer = TimelineSerializer(query)
        return Response(serializer.data)

    raise PermissionDenied
