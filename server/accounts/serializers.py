from django.db import transaction
from django.conf import settings
from django.core.mail import send_mass_mail
from rest_framework import serializers
from django.db.models import Avg, F
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.validators import UniqueValidator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text, DjangoUnicodeDecodeError
from .utils import generate_token
from django.db import IntegrityError
from django.utils.safestring import mark_safe
from django.db.models import Avg, F, Count
from accounts.models import (
    AccountUser,
    RunnerProfile,
    RunnerResume,
    Photo,
    Vidoe,
    Review,
)

from .models import IpModel, RunnerProfile, Review


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
        email_subject = 'Active your Account'
        message = render_to_string('auth/activate.html',
                                   {
                                       'user': user,
                                       'domain': current_site.domain,
                                       'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                                       'token': generate_token.make_token(user)
                                   }
                                   )

        send_mass_mail(
            email_subject,
            message,
            settings.EMAIL_HOST_USER,
            [email]
        )

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


class UserProfileSearchSerializer(serializers.ModelSerializer):

    user_profile = UserResumeSerializer(read_only=True, many=True)

    class Meta:
        model = RunnerProfile
        # fields = (
        #     "author",
        #     "first_name",
        #     "title",
        #     "location",
        #     "salary",
        #     "user_profile",

        # )
        fields = "__all__"


class UserAccountSerializer(serializers.ModelSerializer):

    online = serializers.SerializerMethodField()

    class Meta:
        model = AccountUser
        fields = ("id", "email", "phone_number", "is_a_runner", "online")
        read_only_fields = ("id", "email", "phone_number", "is_a_runner", "online")

    def get_online(self, instance):

        return self.context["request"].user.is_authenticated


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
            #"total_views",     
        )

    # def get_total_views(self, instance):
    #     return instance.total_views()

    def get_total_reviews(self, pk=None):

        return Review.objects.filter(profile_id=pk).aggregate(Avg("rating"))

