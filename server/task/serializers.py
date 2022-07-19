from task.models import Task, TaskBidder, Photo, Comment, Timeline
from rest_framework import serializers
from accounts.serializers import CustomRegisterSerializer

class TaskSerializer(serializers.ModelSerializer):
    """
    Task serializers use for creating task 
    """
    # task_author = CustomRegisterSerializer(read_only=True, many=True)

    class Meta:
        model = Task
        fields = "__all__"


class TaskBidderSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """
    class Meta:
        model = TaskBidder
        fields = "__all__"

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

    timeline_comment = TimelineCommentSerializer(read_only=True, many=True)
   
    class Meta:
        model = Timeline
        exclude = ("updated", "created", "comment")

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

class TaskAssignedSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    task_assigned = TaskSerializer(read_only=True, many=True)
    class Meta:
        model = TaskBidder
        exclude = ("transaction_id",)
