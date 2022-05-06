from task.models import Task, TaskBidder
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