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

import jwt

token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwOTE4ODQ1LCJpYXQiOjE2NTA5MTg1NDUsImp0aSI6IjVhODg4ZTkxMTBlOTQwMzdhZDUzNDIxN2ZmYTVhMDM4IiwidXNlcl9pZCI6MTl9.5wFhw1f-SmAmW2MJPqLKhd_YTyMccRKafn-0WAHNFFY"

payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

print("hey im printing covid")
print("email sent")

print(payload)