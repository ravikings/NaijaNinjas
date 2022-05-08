from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField
from accounts.models import IpModel

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
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    views = models.ManyToManyField(IpModel, related_name="forum_views", blank=True)

    class Meta:
        ordering = ("created",)

    def number_of_views(self):
        return self.views.count()


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="author_comment",
    )
    body = RichTextField()
    votes = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="votes_forum", blank=True
    )
    forum = models.ForeignKey(
        Forum, on_delete=models.CASCADE, related_name="forum_comment"
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("created",)

    def number_of_votes(self):
        return self.votes.count()
