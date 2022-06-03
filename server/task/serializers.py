from task.models import Task, TaskBidder, Photo
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