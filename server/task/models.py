import os
import black
from django.db import models
from django.utils import timezone
from django.conf import settings
from ckeditor.fields import RichTextField
from accounts.models import IpModel, RunnerProfile
from django_s3_storage.storage import S3Storage

storage = S3Storage(aws_s3_bucket_name=settings.YOUR_S3_BUCKET)
# Create your models here.


class Task(models.Model):

    STATUS = [
        ("DRAFT", "DRAFT"),
        ("OPEN", "OPEN"),
        ("ASSIGNED", "ASSIGNED"),
        ("COMPLETED", "COMPLETED")
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="task_author"
    )
    title = models.CharField(max_length=255, blank=True, db_index=True)
    sector  = models.CharField(max_length=255, blank=True, null=True)
    fixed_salary  = models.CharField(max_length=255, blank=True, null=True)
    minimum_salary  = models.CharField(max_length=255, blank=True, db_index=True)
    maximum_salary = models.CharField(max_length=255, blank=True, db_index=True)
    region = models.CharField(max_length=255, blank=True, db_index=True)
    location = models.CharField(max_length=255, blank=True, db_index=True)
    department = models.TextField(null=True, db_index=True)
    experience = models.CharField(max_length=255, blank=True, null=True)
    description = RichTextField(blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, db_index=True)
    category = models.CharField(max_length=255, blank=True, db_index=True)
    attachment = models.FileField(upload_to="task/documents/%Y/%m/%d/", blank=True, storage=storage)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    views = models.ManyToManyField(IpModel, related_name="task_views", blank=True)
    post_status = models.CharField(max_length=255,choices=STATUS, default="OPEN")
    bookmarks = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="task_bookmarks", blank=True
    )

    class Meta:
        ordering = ("-updated", "-created",)


def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

class TaskBidder(models.Model):
    """
    The junction table for task and bid models/tables. Contains every instance of a task for a placement
    """

    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="task_assigned")
    bidder_profile = models.ForeignKey(
        RunnerProfile, on_delete=models.CASCADE, related_name="task_profile_bidder", blank=True,
        null=True
    )
    offer = models.IntegerField(null=True, blank=True)
    description = RichTextField(null=True, blank=True)
    image = models.ImageField(upload_to=upload_to, blank=True)
    bid_approve_status = models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=255, blank=True, null=True, db_index=True)
    runner_confirmed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    delivery_date = models.DateTimeField(null=True)

    class Meta: 
        ordering = ["-created", "-modified"] 

    def number_of_votes(self):
        return self.bidder.count()

    def set_task_status(self):

        status = Task.objects.get(id=self.task)
        status.post_status = "ASSIGNED"
        status.save()

class Photo(models.Model):
    
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="task_photos"
    )

    image = models.ImageField(upload_to=upload_to)


# class Timeline(models.Model):
#     author = models.ForeignKey(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="timeline_author"
#     )
#     # TODO: Add validator to chech if user is a runner
#     task_owner = models.ForeignKey(
#         settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="timeline_task_owner"
#     )
#     task = models.ForeignKey(Task, on_delete=models.CASCADE)
#     attachment = models.FileField(upload_to="task/documents/%Y/%m/%d/", blank=True, storage=storage)
#     created = models.DateTimeField(auto_now_add=True)
#     updated = models.DateTimeField(auto_now=True)


class Timeline(models.Model):

    STATUS = [
        ("STARTED", "STARTED"),
        ("DELIVERED", "DELIVERED"),
        ("REVIEW", "REVIEW"),
        ("APPROVED", "APPROVED")
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="timeline_author"
    )
    # TODO: Add validator to chech if user is a runner
    task_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="timeline_task_owner"
    )
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    timeline_status = models.CharField(max_length=255,choices=STATUS, default="STARTED")
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

class Comment(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timeline_comment_author",
    )
    task_timeline = models.ForeignKey(Timeline, on_delete=models.CASCADE, related_name="active_timeline_comment", blank=True, null=True)
    body = RichTextField()
    attachment = models.FileField(upload_to="tasktimeline/documents/%Y/%m/%d/", blank=True, storage=storage)
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    updated = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        ordering = ("created",)
