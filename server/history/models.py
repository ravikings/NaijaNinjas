from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.conf import settings

# from .signals import object_viewed_signal
from django.db.models.signals import post_save

User = settings.AUTH_USER_MODEL


class History(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content_type = models.ForeignKey(
        ContentType, on_delete=models.SET_NULL, null=True
    )  # product, post
    object_id = models.PositiveIntegerField()  # 1,2,3
    content_object = GenericForeignKey()  # is the actual object
    viewed_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "%s viewed: %s" % (self.content_object, self.viewed_on)

    class Meta:
        verbose_name_plural = "Histories"
