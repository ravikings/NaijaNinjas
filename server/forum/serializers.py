import re
import json
from rest_framework import serializers
from forum.models import Forum, Comment
from accounts.models import RunnerProfile, AccountUser
import datetime
from django.db.models import Count
from django.http import JsonResponse


class CommentSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    total_votes = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    time_created = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        exclude = ("updated", "created", "votes")

    def get_total_votes(self, instance):
        return instance.number_of_votes()

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

    def get_author_name(self, instance):
        profile = RunnerProfile.objects.filter(author_id=instance.author_id)
        try:
            data = profile.values("first_name")[0].get("first_name")
            return data

        except:
            return {"error": "author not found"}

        else:
            return None


class ForumSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    #TODO: USE THIS IN THE FUTURE
    forum_comment = CommentSerializer(read_only=True, many=True)
    #similar_posts = serializers.SerializerMethodField()
    total_comments = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    time_created = serializers.SerializerMethodField()
    total_views = serializers.SerializerMethodField()
    

    class Meta:
        model = Forum
        exclude = ("updated", "created", "views")

    def get_total_comments(self, instance):
        return Comment.objects.filter(forum=instance.id).count()

    def get_total_views(self, instance):
        return instance.number_of_views()

    #TOD0: Change this to individual api for ui to use.
    # def get_similar_posts(self, instance, pk=None):

    #     similar_posts = Forum.objects.filter(tags__icontains=instance.tags).exclude(
    #         id=instance.id
    #     )
    #     data = (
    #         similar_posts.annotate(same_tags=Count("tags"))
    #         .order_by("-same_tags", "-created")
    #         .values()[:5]
    #     )
    #     return data

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

    def get_author_name(self, instance):

        return AccountUser.objects.filter(id=instance.author_id).values("first_name", "last_name")


class ForumHomeSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    #TODO: USE THIS IN THE FUTURE
    #forum_comment = CommentSerializer(read_only=True, many=True)
    #similar_posts = serializers.SerializerMethodField()
    total_info = serializers.SerializerMethodField()
    author_name = serializers.SerializerMethodField()
    time_created = serializers.SerializerMethodField()
    total_views = serializers.SerializerMethodField()
    

    class Meta:
        model = Forum
        exclude = ("updated", "created", "views", "category", "attachment")

    def get_total_info(self, instance):
        data = {}
        query = Comment.objects.filter(forum=instance.id)
        data["total_comments"] = query.count()
        data["total_votes"] = query.values("votes").count()
        return data

    def get_total_views(self, instance):
        return instance.number_of_views()

    #TOD0: Change this to individual api for ui to use.
    # def get_similar_posts(self, instance, pk=None):

    #     similar_posts = Forum.objects.filter(tags__icontains=instance.tags).exclude(
    #         id=instance.id
    #     )
    #     data = (
    #         similar_posts.annotate(same_tags=Count("tags"))
    #         .order_by("-same_tags", "-created")
    #         .values()[:5]
    #     )
    #     return data

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

    def get_author_name(self, instance):

        return AccountUser.objects.filter(id=instance.author_id).values("first_name", "last_name")


class SimpleForum(serializers.ModelSerializer):

    total_comments = serializers.SerializerMethodField()
    time_created = serializers.SerializerMethodField()

    class Meta:
        model = Forum
        fields = ("id", "total_comments", "title", "time_created")

    def get_total_comments(self, instance):
        return Comment.objects.filter(forum=instance.id).count()

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
