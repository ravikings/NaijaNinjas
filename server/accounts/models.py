# models.py in the users Django app
from email.mime import image
import os
from django.utils import timezone
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models import Avg, F, Count
from django.core.validators import MinValueValidator, MaxValueValidator
from ckeditor.fields import RichTextField


class AccountUser(AbstractUser):
    # We don't need to define the email attribute because is inherited from AbstractUser
    phone_number = models.CharField(max_length=12)
    is_a_runner = models.BooleanField(default=False, verbose_name="is_a_runner")
    is_online = models.BooleanField(default=False, verbose_name="is_online", blank=True)
    is_email_verified = models.BooleanField(default=False, verbose_name="email_verified")
    is_phone_number_verified = models.BooleanField(default=False, verbose_name="phone_number_verified")

    class Meta:
        models.UniqueConstraint(fields=["phone_number"], name="unique_phonenumber")

class IpModel(models.Model):
    ip = models.CharField(max_length=25)

    def __str__(self):
        return self.ip

class RunnerProfile(models.Model):
    author = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="userinfo"
    )
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    title = models.CharField(max_length=55, blank=True, db_index=True)
    photo = models.ImageField(upload_to="users/%Y/%m/%d/", blank=True, null=True)
    language = models.CharField(max_length=55, blank=True, null=True)
    location = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    salary = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    country = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    address = models.CharField(
        max_length=255,
        blank=True,
        null=True,
    )
    postcode = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    sector = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    department = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    description = models.TextField(null=True, blank=True, db_index=True)
    state = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    city = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    local_goverment_zone = models.CharField(
        max_length=55, blank=True, null=True, db_index=True
    )
    views = models.ManyToManyField(IpModel, related_name="user_views", blank=True)

def upload_to_resume(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"documents/user/resume/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

class RunnerResume(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="resume_author"
    )
    profile = models.ForeignKey(
        RunnerProfile,null=True, on_delete=models.CASCADE, related_name="user_profile", blank=True
    )
    headline = models.CharField(max_length=255, blank=True, db_index=True)
    skills = models.JSONField(null=True)
    employment = models.JSONField(null=True)
    education = models.JSONField(null=True)
    projects = models.JSONField(null=True)
    profile_summary = models.CharField(max_length=255, blank=True, db_index=True)
    accomplishment = models.JSONField(null=True)
    career_profile = models.JSONField(null=True)
    postcode = models.CharField(max_length=55, blank=True, db_index=True)
    description = models.TextField(null=True, db_index=True)
    attachment = models.FileField(upload_to=upload_to_resume, blank=True)

class Review(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="authorreview"
    )
    body = RichTextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    profile = models.ForeignKey(
        RunnerProfile, on_delete=models.CASCADE, related_name="profile_review", default=False
    )
    class Meta:
        ordering = ("created",)
        
class Photo(models.Model):

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="photo_author"
    )
    description = models.CharField(max_length=250, null=True, db_index=True)
    image = models.ImageField(upload_to="users/%Y/%m/%d/")

    tags = models.CharField(max_length=250, null=True, db_index=True)


class Vidoe(models.Model):

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="video_author"
    )
    description = models.CharField(max_length=250, null=True, db_index=True)
    video = models.FileField(upload_to="documents/video/%Y/%m/%d/", blank=True)

    tags = models.CharField(max_length=250, null=True, db_index=True)


def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"documents/user/service/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"
class Service(models.Model):
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="service_author"
    )
    description = RichTextField(db_index=True, null=True)
    image = models.ImageField(upload_to=upload_to, blank=True)
    amount = models.CharField(max_length=250, null=True)
    location = models.CharField(max_length=250, null=True, db_index=True)
    title = models.CharField(max_length=250, null=True, db_index=True)
    tag = models.CharField(max_length=250, blank=True, null=True, db_index=True)
    delivery_method = models.CharField(max_length=250, null=True, db_index=True)
    created = models.DateTimeField(auto_now_add=True, null=True)
    updated = models.DateTimeField(auto_now=True, null=True)

class Projects(models.Model):
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="project_author"
    )
    title = models.CharField(max_length=250, null=True, db_index=True)
    description = RichTextField(db_index=True)


class ProjectPhoto(models.Model):
    
    task = models.ForeignKey(
        Projects, on_delete=models.CASCADE, related_name="project_photos"
    )

    image = models.ImageField(upload_to=upload_to)