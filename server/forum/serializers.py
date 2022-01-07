from rest_framework import serializers
from forum.models import Forum, Comment


class CommentSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """
    total_votes = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = "__all__"

    def get_total_votes(self, instance):
        return instance.number_of_votes()


class ForumSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    forum_comment = CommentSerializer(read_only=True, many=True)

    class Meta:
        model = Forum
        fields = "__all__"
