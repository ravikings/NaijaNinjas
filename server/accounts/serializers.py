from django.db import transaction
from django.core import serializers as core_serializers
from rest_framework import serializers 
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.validators import UniqueValidator
from django.db import IntegrityError
from accounts.models import AccountUser, RunnerProfile


class CustomRegisterSerializer(RegisterSerializer):
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
            print(f"Unexpected {e=}, {type(e)=}")
            raise

        return user


class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = ("pk", "email", "phone_number", "is_a_runner", "photo")
        read_only_fields = ("pk", "email", "phone_number", "is_a_runner")


class RunnerProfileSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = RunnerProfile
        fields = ("author", "Name","Title", "Language", "location", "salary", "country",
        "address", "postcode", "description", "state", "city", "local_goverment_zone")