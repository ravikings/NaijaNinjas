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
from django.core.mail import send_mail, send_mass_mail
from django.conf import settings

send_mass_mail(
    "email_subject",
    "message",
    settings.EMAIL_HOST_USER,
    ["sr.rabiu@gmail.com"],
    fail_silently=False,
)
print("hey im printing covid")
print("email sent")