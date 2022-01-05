from django.db import models
from django.conf import settings
from ckeditor.fields import RichTextField

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


    class Meta:
        ordering = ("created",)


class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="author_comment"
    )
    body = RichTextField()
    vote = models.IntegerField(max_length=255, blank=True, null=True, db_index=True)
    forum = models.ForeignKey(Forum,on_delete=models.CASCADE, related_name="forum_comment")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)


    class Meta:
        ordering = ("created",)