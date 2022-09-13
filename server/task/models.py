import os
import secrets
from django.db import models
from django.utils import timezone
from django.conf import settings
from ckeditor.fields import RichTextField
from accounts.models import IpModel, RunnerProfile
from django_s3_storage.storage import S3Storage
from payment.paystack import PayStack

storage = S3Storage(aws_s3_bucket_name=settings.YOUR_S3_BUCKET)
# Create your models here.


class BiddersOnTask(models.Model):

    bidder = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="task_profile_bidder",
        null=True,
        blank=True,
    )

class Task(models.Model):

    STATUS = [
        ("DRAFT", "DRAFT"),
        ("OPEN", "OPEN"),
        ("CLOSE", "CLOSE"),
        ("COMPLETED", "COMPLETED"),
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="task_author",
        blank=True,
        null=True,
    )
    title = models.CharField(max_length=255, blank=True, db_index=True)
    sector = models.CharField(max_length=255, blank=True, null=True)
    fixed_salary = models.CharField(max_length=255, blank=True, null=True)
    minimum_salary = models.CharField(max_length=255, blank=True, db_index=True)
    maximum_salary = models.CharField(max_length=255, blank=True, db_index=True)
    region = models.CharField(max_length=255, blank=True, db_index=True)
    location = models.CharField(max_length=255, blank=True, db_index=True)
    department = models.TextField(null=True, db_index=True)
    experience = models.CharField(max_length=255, blank=True, null=True)
    description = RichTextField(blank=True, null=True)
    tags = models.CharField(max_length=255, blank=True, db_index=True)
    category = models.CharField(max_length=255, blank=True, db_index=True)
    attachment = models.FileField(
        upload_to="task/documents/%Y/%m/%d/", blank=True, null=True, storage=storage
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    views = models.ManyToManyField(IpModel, related_name="task_views", blank=True)
    post_status = models.CharField(max_length=255, choices=STATUS, default="OPEN")
    bidders = models.ManyToManyField(
        BiddersOnTask, related_name="bidders_profile_id", blank=True
    )

    class Meta:
        ordering = (
            "-updated",
            "-created",
        )

    def number_of_bids(self):
        data = TaskBidder.objects.filter(task=self.id)
        return len(data)


def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"users/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"

class TaskBidder(models.Model):
    """
    The junction table for task and bid models/tables. Contains every instance of a task for a placement
    """

    task = models.ForeignKey(
        Task,
        on_delete=models.CASCADE,
        related_name="task_assigned",
        blank=True,
        null=True,
    )
    bidder_profile = models.ForeignKey(
        RunnerProfile,
        on_delete=models.CASCADE,
        related_name="task_profile_bidder",
        blank=True,
        null=True,
    )
    payment_author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="payment_author",
        null=True,
        blank=True,
    )
    payment_submitted = models.BooleanField(default=False, null=True)
    offer = models.IntegerField(null=True, blank=True)
    total_charge = models.FloatField(null=True, blank=True)
    description = RichTextField(null=True, blank=True)
    attachment = models.FileField(
        upload_to=upload_to, null=True, blank=True, storage=storage
    )
    bid_approve_status = models.BooleanField(default=False)
    transaction_id = models.CharField(
        max_length=255, blank=True, null=True, db_index=True, unique=True
    )
    transaction_verified = models.BooleanField(default=False, null=True)
    webhook_transaction_verified = models.BooleanField(default=False, null=True)
    runner_confirmed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    delivery_date = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ["-created", "-modified"]

    def save(self, *args, **kwargs):

        if not self.transaction_id:
            ref = secrets.token_urlsafe(50)
            self.transaction_id = ref
        super().save(*args, **kwargs)

    def approve_bids(self):
        self.bid_approve_status = True
        VAT = 7.5
        SERVICE_FEE = 1.5
        charges = (self.offer * (VAT + SERVICE_FEE)) // 100
        self.total_charge = self.offer + charges
        self.save()

    def add_bidder_to_task(self, query):

        task = Task.objects.get(id=self.task.id)
        if BiddersOnTask.objects.filter(bidder=query).exists():
            task.bidders.add(BiddersOnTask.objects.get(bidder=query))
        else:
            BiddersOnTask.objects.create(bidder=query)
            task.bidders.add(BiddersOnTask.objects.get(bidder=query))

    def verify_transaction_completed(self):
        paystack = PayStack()
        status, result = paystack.verify_payment(self.transaction_id, self.total_charge)
        if status:
            self.payment_submitted = True
            if result["amount"] / 100 == self.total_charge:
                self.transaction_verified = True
            self.save()
            return True
        return False


class Photo(models.Model):

    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="task_photos")

    image = models.ImageField(
        upload_to=upload_to, blank=True, null=True, storage=storage
    )


class Timeline(models.Model):

    STATUS = [
        ("CONTRACT", "CONTRACT"),
        ("STARTED", "STARTED"),
        ("PROGRESS", "PROGRESS"),
        ("DELIVERED", "DELIVERED"),
        ("CLIENT_REVIEW", "CLIENT_REVIEW"),
        ("PRO_REVIEW", "PRO_REVIEW"),
        ("APPROVED", "APPROVED"),
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timeline_author",
    )
    # TODO: Add validator to chech if user is a runner
    task_owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timeline_task_owner",
    )
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=255, choices=STATUS, default="STARTED")

    def set_timeline_status(self, type):

        self.status = type
        self.save()


class Comment(models.Model):

    STATUS = [
        ("CONTRACT", "CONTRACT"),
        ("STARTED", "STARTED"),
        ("PROGRESS", "PROGRESS"),
        ("DELIVERED", "DELIVERED"),
        ("CLIENT_REVIEW", "CLIENT_REVIEW"),
        ("PRO_REVIEW", "PRO_REVIEW"),
        ("APPROVED", "APPROVED"),
    ]

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="timeline_comment_author",
    )
    task_timeline = models.ForeignKey(
        Timeline,
        on_delete=models.CASCADE,
        related_name="active_timeline_comment",
        blank=True,
        null=True,
    )
    status = models.CharField(max_length=255, choices=STATUS, null=True, blank=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    delivery_date = models.DateTimeField(null=True, blank=True)
    body = RichTextField()
    attachment = models.FileField(
        upload_to="tasktimeline/documents/%Y/%m/%d/",
        blank=True,
        null=True,
        storage=storage,
    )
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    updated = models.DateTimeField(auto_now=True, db_index=True)

    class Meta:
        ordering = ("created",)

    def update_timeline_status(self):

        obj = Timeline.objects.get(id=self.task_timeline.id)
        obj.set_timeline_status(self.status)


class TaskBookmarks(models.Model):

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="task_bookmarks_author",
    )
    task = models.ForeignKey(Task, on_delete=models.CASCADE)
