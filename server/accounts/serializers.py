from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.validators import UniqueValidator
from django.db import IntegrityError
from accounts.models import AccountUser, RunnerProfile, RunnerResume, Photo, Vidoe, Category

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

            raise e("error: sorry no already exist")

        return user


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
            "resume",
        )

class CategorySerializer(serializers.ModelSerializer):

    """
    categories serializers use for entry data for resume from ui
    """

    author = serializers.ReadOnlyField(source= "AccountUser.first_name")
    profile = serializers.PrimaryKeyRelatedField(read_only=True, many=True)
    resume = serializers.PrimaryKeyRelatedField(read_only=True, many=True)

    class Meta:
        model = Category
        fields = ["name","author", "profile","resume" ]

class UserProfileDetailsSerializer(serializers.ModelSerializer):

    photo = PhotosSerializer(read_only=True, many=True)
    resume = UserResumeDetailsSerializer(read_only=True, many=True)
    video = VidoesSerializer(read_only=True, many=True)
    category = CategorySerializer(read_only=True, many=True)

    class Meta:
        model = RunnerProfile
        fields = (
            "author",
            "first_name",
            "last_name",
            "title",
            "language",
            "location",
            "salary",
            "country",
            "address",
            "postcode",
            "description",
            "state",
            "city",
            "local_goverment_zone",
            "category",
            "resume",
            "photo",
            "video",
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
