from task.models import Task, TaskBidder, Photo, Comment, Timeline
from rest_framework import serializers


class TaskSerializer(serializers.ModelSerializer):
    """
    Task serializers use for creating task 
    """

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


class TimelineSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    #timeline_author = serializers.SerializerMethodField()
    timeline_comment = serializers.SerializerMethodField()

    class Meta:
        model = Timeline
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

    def get_timeline_comment(self, instance):
        comments = Comment.objects.filter(timeline=instance.timeline_id)

        return comments


class TimelineCommentSerializer(serializers.ModelSerializer):
    """
    Comment serializers.
    """

    #timeline_comment_author = serializers.SerializerMethodField()
    #timeline_comment = serializers.SerializerMethodField()

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

