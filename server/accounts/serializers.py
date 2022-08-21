from asyncore import read
from django.db import transaction
from django.conf import settings
from rest_framework import serializers
from django.db.models import Avg, F
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from django.db import IntegrityError
from django.utils.safestring import mark_safe
from django.db.models import Avg, F, Count
from rest_framework import status
import datetime
from django.utils import timezone
from rest_framework.response import Response
from accounts.models import (
    AccountUser,
    RunnerProfile,
    RunnerResume,
    Photo,
    Vidoe,
    Review,
    Service,
    Projects,
    ProjectPhoto,
    PublicQuotes,
)
from .models import IpModel, RunnerProfile, Review
from .utilis import send_verify_email
import arrow


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
            email = self.data.get("email")
            user.save()   
        except IntegrityError as e:

            raise e("error: sorry phone number already exist")
 
        current_site = get_current_site(request)
        user = AccountUser.objects.get(email=str(email))
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        send_verify_email(user, current_site, email, uid)

        return user


class UserSerializer(serializers.ModelSerializer):
    
    last_seen_time = serializers.SerializerMethodField()
    class Meta:
        model = AccountUser
        fields = ["id", "username", "last_seen_time"]

    def get_last_seen_time(self, instance):

        dateTimeObj = instance.last_seen
        #timestampStr = dateTimeObj.strftime("%b-%d-%Y %I:%M%p")
        current_time = timezone.now()
        time_difference = current_time - dateTimeObj
        print("currentr time")
        print(time_difference)
        return 2 #datetime.timedelta(seconds = now_aware.)

class ContractUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = ["email"]

class ProfileSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    class Meta:
        model = RunnerProfile
        fields = "__all__"


class PublicProfileSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    class Meta:
        model = RunnerProfile
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data.pop("address")
        data.pop("login_tracker")
        data.pop("user_set_status")
        return data

class BiddersProfileSerializer(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    photo = serializers.ImageField()
    class Meta:
        model = RunnerProfile
        fields = ("first_name","last_name", "photo", "status")
class UserResumeSerializer(serializers.ModelSerializer):
    """
    resume search serializers use for entry data for resume from ui
    """
    class Meta:
        model = RunnerResume
        fields = "__all__"

class ProfileSerializerWithResume(serializers.ModelSerializer):
    """
    Profile serializers use profile for picture uploads and retrieve
    """

    user_profile = UserResumeSerializer(read_only=True, many=True)
    #a_runner = serializers.SerializerMethodField()
    class Meta:
        model = RunnerProfile
        exclude = ("address", "login_tracker", "user_set_status")
        read_only_fields = ("status",)
    # def get_a_runner(self, instance):
    
    #     return AccountUser.objects.filter(id=instance.author_id).values("is_a_runner")

    # def to_representation(self, instance):
    #     """Convert `username` to lowercase."""
    #     data = super().to_representation(instance)
    #     #TODO: uncomment in the future to return only runner resume
    #     # runner = data.get("a_runner")
    #     # if not runner[0].get("is_a_runner"):
    #     #     return None
    #     return data

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


class IpSerializer(serializers.ModelSerializer):
    """
    IP serializers use profile for picture uploads and retrieve
    """

    total_views = serializers.SerializerMethodField()

    class Meta:
        model = IpModel
        fields = "__all__"

    def get_total_views(self, instance):
        return instance.total_views()


class ReviewSerializer(serializers.ModelSerializer):
    """
    Review serializers use profile for picture uploads and retrieve
    """

    class Meta:
        model = Review
        fields = "__all__"


class RunnerProfileSerializer(serializers.ModelSerializer):
    """
    resume serializers use for entry data for resume from ui
    """

    class Meta:
        model = RunnerProfile
        fields = "__all__"
        exclude = ("login_tracker", "user_set_status")
        read_only_fields = ("status")


class UserAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = AccountUser
        fields = ("id", "email", "phone_number", "is_a_runner")
        read_only_fields = ("id", "email", "phone_number", "is_a_runner")


class UserProfileSearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = RunnerProfile
        exclude = ("address",)


class ServiceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Service
        fields = "__all__"


class ProjectsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Projects
        fields = "__all__"

class ProjectPhotoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = ProjectPhoto
        fields = "__all__"

# class UserOnlineSerializer(serializers.ModelSerializer):
    
#     online_status = serializers.SerializerMethodField()
#     class Meta:
#         model = RunnerProfile
#         fields = ("author", "online_status",)
#         read_only_fields = ("author","online_status")

#     def get_online_status(self, instance):

#         if instance.user_set_status:

#             return "offline"

#         else:
#             try:
#                 user_last_login = arrow.get(instance.last_login)
#                 now = arrow.utcnow()
#                 current_time = now.replace(tzinfo='Africa/Lagos')
#                 minutes = current_time-user_last_login
#                 difference = minutes.total_seconds()
#                 time = difference // (60)
#                 if time < 1:

#                     return "online"

#             except:

#                 return "offline"
        
class UserSearchDetialSerializer(serializers.ModelSerializer):

    total_reviews = serializers.SerializerMethodField()
    total_views = serializers.SerializerMethodField()

    class Meta:
        model = RunnerProfile
        fields = (
            "author",
            "first_name",
            "last_name",
            "title",
            "photo",
            "salary",
            "total_reviews",
            "total_views", 
        )

    def get_total_views(self, instance):
        return instance.total_views()

    def get_total_reviews(self, pk=None):

        return Review.objects.filter(author=pk).aggregate(Avg("rating"))


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(min_length=6)

    redirect_url = serializers.CharField(max_length=500, required=False)

    class Meta:
        fields = ['email']

class SetNewPasswordSerializer(serializers.Serializer):
    password1 = serializers.CharField(
        min_length=6, max_length=68)
    password2 = serializers.CharField(
        min_length=6, max_length=68)
    token = serializers.CharField(
        min_length=15)
    class Meta:
        fields = ['password1','password2', 'token']


class PublicQuotesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PublicQuotes
        fields = "__all__"

