import os
from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField
from accounts.models import IpModel
from django.utils import timezone

# Create your models here.


class Forum(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="authorforum"
    )
    title = models.CharField(max_length=255, blank=True, db_index=True)
    body = RichTextField(db_index=True)
    tags = models.CharField(max_length=255, blank=True, db_index=True)
    category = models.CharField(max_length=255, blank=True, db_index=True)
    attachment = models.FileField(upload_to="forum/documents/%Y/%m/%d/", blank=True)
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    updated = models.DateTimeField(auto_now=True, db_index=True)
    views = models.ManyToManyField(IpModel, related_name="forum_views", blank=True)

    class Meta:
        ordering = ("created",)

    def number_of_views(self):
        return self.views.count()


def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

class Photo(models.Model):
    
    forum = models.ForeignKey(
        Forum, on_delete=models.CASCADE, related_name="forum_photos"
    )

    image = models.ImageField(upload_to=upload_to)


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="author_comment",
    )
    body = RichTextField()
    votes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="votes_forum", blank=True, 
    )
    forum = models.ForeignKey(
        Forum, on_delete=models.CASCADE, related_name="forum_comment"
    )
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    updated = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        ordering = ("created",)

    def number_of_votes(self):
        return self.votes.count()
