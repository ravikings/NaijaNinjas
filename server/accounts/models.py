# models.py in the users Django app
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


class RunnerResume(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="resume_author"
    )
    profile = models.ManyToManyField(
        RunnerProfile, related_name="user_profile", blank=True
    )
    headline = models.CharField(max_length=255, blank=True, db_index=True)
    skills = models.TextField(null=True, db_index=True, blank=True)
    employment = models.TextField(null=True, db_index=True, blank=True)
    education = models.TextField(null=True, db_index=True, blank=True)
    projects = models.TextField(null=True, db_index=True, blank=True)
    profile_summary = models.CharField(max_length=255, blank=True, db_index=True)
    accomplishment = models.TextField(null=True, db_index=True, blank=True)
    career_profile = models.TextField(null=True, db_index=True, blank=True)
    postcode = models.CharField(max_length=55, blank=True, db_index=True)
    description = models.TextField(null=True, db_index=True)
    attachment = models.FileField(upload_to="documents/%Y/%m/%d/", blank=True)

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

class Service(models.Model):
    
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="service_author"
    )
    description = models.CharField(max_length=250, null=True, db_index=True)
    display = models.FileField(upload_to="documents/user/service/photo/%Y/%m/%d/", blank=True)

    amount = models.CharField(max_length=250, null=True)