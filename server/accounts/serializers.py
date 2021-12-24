from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.validators import UniqueValidator
from django.db import IntegrityError
from accounts.models import (
    AccountUser,
    RunnerProfile,
    RunnerResume,
    Photo,
    Vidoe,
)

from .models import RunnerProfile


class CustomRegisterSerializer(RegisterSerializer):

    """
    Custom serializers use profile for singup and login
    """

    phone_number = serializers.CharField(
        max_length=30, validators=[UniqueValidator(queryset=AccountUser.objects.all())]
    )
    is_a_runner = serializers.BooleanField(default=False)

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        user = super().save(request)
        try:
            user.phone_number = self.data.get("phone_number")
            user.is_a_runner = self.data.get("is_a_runner")
            user.save()
        except IntegrityError as e:

            raise e("error: sorry phone number already exist")

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = ["id"]

class ProfileSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    class Meta:
        model = RunnerProfile
        fields = "__all__"

class PhotosSerializer(serializers.ModelSerializer):
    """
    Photo serializers use profile for picture uploads and retrieve
    """

    class Meta:
        model = Photo
        fields = "__all__"


class VidoesSerializer(serializers.ModelSerializer):
    """
    Vidoe serializers use profile for picture uploads and retrieve
    """

    class Meta:
        model = Vidoe
        fields = "__all__"


class UserResumeDetailsSerializer(serializers.ModelSerializer):
    """
    resume serializers use for entry data for resume from ui
    """

    class Meta:
        model = RunnerResume
        fields = (
            "headline",
            "skills",
            "employment",
            "education",
            "projects",
            "profile_summary",
            "accomplishment",
            "career_profile",
            "postcode",
            "description",
            "attachment",
        )


class UserResumeSearchSerializer(serializers.ModelSerializer):
    """
    resume search serializers use for entry data for resume from ui
    """

    class Meta:
        model = RunnerResume
        fields = (
            "skills",
            "employment",
        )


class UserProfileSearchSerializer(serializers.ModelSerializer):

    resume = UserResumeSearchSerializer(read_only=True, many=True)

    class Meta:
        model = RunnerProfile
        fields = (
            "author",
            "first_name",
            "title",
            "location",
            "salary",
            "resume",
        )


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = (
            "pk",
            "email",
            "phone_number",
            "is_a_runner",
        )
        read_only_fields = ("pk", "email", "phone_number", "is_a_runner")
