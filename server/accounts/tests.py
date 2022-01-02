from django.test import TestCase

from django.db import transaction
from rest_framework import serializers
from django.db.models import Avg, F
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework.validators import UniqueValidator
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


#def get_total_reviews():
instance = Review.objects.get(profile_id=1)
#x = instance.objects.annotate(Count('rating'))
print("hey im printing covid")
print(instance)