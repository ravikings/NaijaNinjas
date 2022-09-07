from dataclasses import field
from task.models import Task, TaskBidder, Photo, Comment, Timeline, TaskBookmarks
from rest_framework import serializers
from accounts.serializers import ContractUserSerializer, ProfileSerializer, BiddersProfileSerializer
from accounts.models import RunnerProfile

class TaskSerializer(serializers.ModelSerializer):
    """
    Task serializers use for creating task 
    """
    # task_author = CustomRegisterSerializer(read_only=True, many=True)
    bookmarks = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = "__all__"
    
    def get_bookmarks(self, instance):
        return TaskBookmarks.objects.filter(task=instance.id).values_list("author")

class TaskWithTotalBidSerializer(serializers.ModelSerializer):
    """
    Task serializers use for creating task 
    """
    total_bids = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = "__all__"


    def get_total_bids(self, instance):

        data = TaskBidder.objects.filter(task=instance.pk)

        return len(data)


class TaskBidderSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """
    class Meta:
        model = TaskBidder
        fields = "__all__"

class ContractSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """
    class Meta:
        model = TaskBidder
        fields = ("bidder_profile", "payment_author", "offer", "description", "delivery_date", "bid_approve_status")

class TaskBidderprofileSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    bidder_info = serializers.SerializerMethodField()
    class Meta:
        model = TaskBidder
        exclude = ["payment_author", "runner_confirmed", "webhook_transaction_verified", "transaction_verified", ]
        read_only_fields = ('bid_approve_status', 'payment_submitted', 'transaction_id', "total_charge")

    def get_bidder_info(self, instance):

        id = instance.bidder_profile
        profile = RunnerProfile.objects.filter(id=id.id).values("first_name","last_name", "photo", "status")
        serializer = BiddersProfileSerializer(profile, many=True)
        return serializer.data


class TaskImageSerializer(serializers.ModelSerializer):
    """
    Profile serializers use forum picture uploads and retrieve
    """
    class Meta:
        model = Photo
        fields = "__all__"


class TimelineCommentSerializer(serializers.ModelSerializer):
    """
    Comment serializers.
    """

    time_created = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        exclude = ("updated", "created")

    def create(self, validate_data):

        comment = Comment.objects.create(**validate_data)
        comment.update_timeline_status()
        return comment

    def get_time_created(self, instance):
        dateTimeObj = instance.created
        timestampStr = dateTimeObj.strftime("%b-%d-%Y %I:%M%p")
        time_difference = instance.updated - dateTimeObj
        data = {"Created": "","Updated": ""}
        if int(time_difference.seconds) >= 1:
            data["Updated"] = timestampStr

        else:
            data["Created"] = timestampStr

        return data


class TimelineStartSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """
    author = ContractUserSerializer()
    class Meta:
        model = Timeline
        exclude = ("updated", "created",)

class TimelineSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    timeline_comment = serializers.SerializerMethodField()
    timestamps = serializers.SerializerMethodField()
   
    class Meta:
        model = Timeline
        exclude = ("updated", "created",)

    def get_timestamps(self, instance):
        dateTimeObj = instance.created
        timestampStr = dateTimeObj.strftime("%b-%d-%Y %I:%M%p")
        time_difference = instance.updated - dateTimeObj
        data = {"Created": "","Updated": ""}
        if int(time_difference.seconds) >= 1:
            data["Updated"] = timestampStr

        else:
            data["Created"] = timestampStr

        return data

    def get_timeline_comment(self, instance):


        return Comment.objects.filter(task_timeline=instance.id)


class TaskAssignedSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    task_assigned = TaskSerializer(read_only=True, many=True)
    class Meta:
        model = TaskBidder
        exclude = ("transaction_id",)
