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
from rest_framework.response import Response
from accounts.models import (
    AccountUser,
    RunnerProfile,
    RunnerResume,
    Photo,
    Vidoe,
    Review,
    Service,
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
        #todo add pre save create profile, change to celery and function and expection handling
        print("creating user profile")
        RunnerProfile.objects.create(author_id=user.pk)
        RunnerResume.objects.create(author_id=user.pk)
        print("user profile creation completed!")
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        send_verify_email(user, current_site, email, uid)

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


class UserResumeSerializer(serializers.ModelSerializer):
    """
    resume search serializers use for entry data for resume from ui
    """
    class Meta:
        model = RunnerResume
        fields = "__all__"

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

class UserOnlineSerializer(serializers.ModelSerializer):
    
    online_status = serializers.SerializerMethodField()

    class Meta:
        model = AccountUser
        fields = ("id", "online_status")
        read_only_fields = ("id","online")


    def get_online_status(self, instance):
    
        #data = instance.objects.get(id=pk)
        
        x = instance.last_login
        if x:

            user_last_login = arrow.get(x)
            now = arrow.utcnow()
            current_time = now.replace(tzinfo='Africa/Lagos')

            minutes = current_time-user_last_login

            difference = minutes.total_seconds()
            time = difference // (60)
            print("checking if user is online")
            if time < 1:
                print({"status":"online"})
                return "online"
        print({"status":"offline"})
        return "offline"


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
