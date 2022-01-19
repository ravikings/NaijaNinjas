from rest_framework import serializers
from forum.models import Forum, Comment
from accounts.models import RunnerProfile
import datetime
from django.db.models import Count


class CommentSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    total_votes = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    time_created = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        exclude = ("updated", "created")

    def get_total_votes(self, instance):
        return instance.number_of_votes()

    def get_time_created(self, instance):
        dateTimeObj = instance.created
        timestampStr = dateTimeObj.strftime("%b-%d-%Y %I:%M%p")
        time_difference = instance.updated - dateTimeObj
        if int(time_difference.seconds) >= 1:
            return {"Updated": timestampStr}

        else:
            return {"Created": timestampStr}

    def get_author_name(self, instance):
        profile = RunnerProfile.objects.filter(author_id=instance.author_id)
        try:
            data = profile.values("first_name")[0].get("first_name")
            return data

        except:
            print("author not found")

        else:
            return None


class ForumSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    forum_comment = CommentSerializer(read_only=True, many=True)
    total_comments = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    time_created = serializers.SerializerMethodField()
    similar_posts = serializers.SerializerMethodField()

    class Meta:
        model = Forum
        exclude = ("updated", "created")

    def get_total_comments(self, instance, pk=None):
        return Comment.objects.filter(forum=pk).count()

    def get_similar_posts(self, instance, pk=None):
        similar_posts = Forum.objects.filter(tags__in=list(instance.tags)).exclude(
            id=instance.id
        )
        data = similar_posts.annotate(same_tags=Count("tags")).order_by(
            "-same_tags", "-created"
        )[:5]
        return data

    def get_time_created(self, instance):
        dateTimeObj = instance.created
        timestampStr = dateTimeObj.strftime("%b-%d-%Y %I:%M%p")
        time_difference = instance.updated - dateTimeObj
        if int(time_difference.seconds) >= 1:
            return {"Updated": timestampStr}

        else:
            return {"Created": timestampStr}

    def get_author_name(self, instance):
        profile = RunnerProfile.objects.filter(author_id=instance.author_id)
        try:
            data = profile.values("first_name")[0].get("first_name")
            return data

        except:
            print("author not found")

        else:
            return None

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     similar_posts = Forum.objects.filter(tags__in=[instance.tags]).exclude(id=instance.id)
    #     data = similar_posts.annotate(same_tags=Count('tags'))\
    #                             .order_by('-same_tags','-created')[:5]
    #     #d = similar_posts.values_list(flat=True)
    #     representation['admin'] = data
    #     return representation
