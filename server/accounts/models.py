# models.py in the users Django app
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
#from django.contrib.contenttypes.fields import GenericRelation
from django.core.validators import MinValueValidator, MaxValueValidator
from ckeditor.fields import RichTextField
#from hitcount.models import HitCountMixin

# testing out cache is ignore


class AccountUser(AbstractUser):
    # We don't need to define the email attribute because is inherited from AbstractUser
    phone_number = models.CharField(max_length=12, unique=True)
    is_a_runner = models.BooleanField(default=False, verbose_name="is_a_runner")


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
    description = models.TextField(null=True, blank=True, db_index=True)
    state = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    city = models.CharField(max_length=55, blank=True, null=True, db_index=True)
    local_goverment_zone = models.CharField(
        max_length=55, blank=True, null=True, db_index=True
    )
    #hit_count_generic = GenericRelation(HitCount, object_id_field='object_pk',related_query_name='hit_count_generic_relation')

    def __str__(self):
        return self.first_name


class RunnerResume(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="resumeinfo"
    )
    runner_profile = models.ForeignKey(
        RunnerProfile, on_delete=models.CASCADE, related_name="user_resume"
    )
    headline = models.CharField(max_length=255, blank=True, db_index=True)
    skills = models.TextField(null=True, db_index=True)
    employment = models.TextField(null=True, db_index=True)
    education = models.TextField(null=True, db_index=True)
    projects = models.TextField(null=True, db_index=True)
    profile_summary = models.CharField(max_length=255, blank=True, db_index=True)
    accomplishment = models.CharField(max_length=55, blank=True, db_index=True)
    career_profile = models.CharField(max_length=255, blank=True, db_index=True)
    postcode = models.CharField(max_length=55, blank=True, db_index=True)
    description = models.TextField(null=True, db_index=True)
    attachment = models.FileField(upload_to="documents/%Y/%m/%d/", blank=True)


class Photo(models.Model):

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="photo_author"
    )
    description = models.CharField(max_length=250, null=True, db_index=True)
    image = models.ImageField(upload_to="users/%Y/%m/%d/")

    tags = models.CharField(max_length=250, null=True, db_index=True)

    def __str__(self):
        return self.description


class Vidoe(models.Model):

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="video_author"
    )
    description = models.CharField(max_length=250, null=True, db_index=True)
    video = models.FileField(upload_to="documents/video/%Y/%m/%d/", blank=True)

    tags = models.CharField(max_length=250, null=True, db_index=True)

    def __str__(self):
        return self.description


class Review(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="authorreview"
    )
    profile = models.ForeignKey(
        RunnerProfile, on_delete=models.CASCADE, related_name="profilereview"
    )
    body = RichTextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    rating = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )

    class Meta:
        ordering = ("created",)

    def __str__(self):
        return f"Comment by {self.author} on {self.profile}"
