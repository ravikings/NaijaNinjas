import os
from django.utils import timezone
from django.db import models
from django.conf import settings
# Create your models here.

class Conversation(models.Model):
    initiator = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="convo_starter",
        null=True,
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="convo_participant",
        null=True,
    )
    start_time = models.DateTimeField(auto_now_add=True)

def upload_to(instance, filename):
    now = timezone.now()
    base, extension = os.path.splitext(filename.lower())
    milliseconds = now.microsecond // 1000
    return f"documents/user/message/{instance.pk}/{now:%Y%m%d%H%M%S}{milliseconds}{extension}"
    
class Message(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name="message_sender",
        null=True,
    )
    text = models.CharField(max_length=200)
    attachment = models.FileField(upload_to=upload_to, blank=True)
    conversation_id = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-timestamp",)
