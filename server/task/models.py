import os
import black
from django.db import models
from django.utils import timezone
from django.conf import settings
from ckeditor.fields import RichTextField
from accounts.models import IpModel

# Create your models here.


class Task(models.Model):

    STATUS = [
        ("Open", "Accepting offers"),
        ("Assigned", "Task assigned to a pro"),
        ("Completed", "Task completed!")
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
    description = RichTextField(db_index=True)
    tags = models.CharField(max_length=255, blank=True, db_index=True)
    category = models.CharField(max_length=255, blank=True, db_index=True)
    attachment = models.FileField(upload_to="task/documents/%Y/%m/%d/", blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    views = models.ManyToManyField(IpModel, related_name="task_views", blank=True)
    post_status = models.CharField(max_length=255,choices=STATUS, default="open")

    class Meta:
        ordering = ("created",)


def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"
class TaskBidder(models.Model):
    """
    The junction table for task and bid models/tables. Contains every instance of a task for a placement
    """

    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    bidder = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="task_bidder", blank=True
    )
    offer = models.IntegerField()
    description = RichTextField(null=True, blank=True)
    image = models.ImageField(upload_to=upload_to, blank=True)
    confirmed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta: 
        ordering = ['-modified'] 

    def number_of_votes(self):
        return self.bid.count()

class Photo(models.Model):
    
    task = models.ForeignKey(
        Task, on_delete=models.CASCADE, related_name="task_photos"
    )

    image = models.ImageField(upload_to=upload_to)