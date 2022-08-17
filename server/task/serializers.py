from task.models import Task, TaskBidder, Photo, Comment, Timeline, TaskBookmarks
from rest_framework import serializers
from accounts.serializers import CustomRegisterSerializer, ProfileSerializer, BiddersProfileSerializer
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

class TaskBidderprofileSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    bidder_info = serializers.SerializerMethodField()
    class Meta:
        model = TaskBidder
        exclude = ("task", "bidder_profile", "image")

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


class TimelineSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    timeline_comment = serializers.SerializerMethodField()
    time_created = serializers.SerializerMethodField()
   
    class Meta:
        model = Timeline
        exclude = ("updated", "created",)

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
