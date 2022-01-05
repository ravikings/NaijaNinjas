from rest_framework import serializers
from forum.models import Forum, Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    class Meta:
        model = Comment
        fields = "__all__"


class ForumSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    forum_comment = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Forum
        fields = "__all__"
