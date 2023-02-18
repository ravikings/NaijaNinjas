# Django Imports
from django.conf import settings
from django.db import models
from django.db.models.query import QuerySet
from django.utils.translation import gettext_lazy as _

# Other Third Party Imports
from fcm_django.models import AbstractFCMDevice
from firebase_admin.messaging import Message, Notification

# First Party Imports
# from courses.models.course import Course
# from main.utility_models.choices import OSTypes
# from users.models.user import User
#from utility.topic_identifier import get_topic_identifier

User = settings.AUTH_USER_MODEL

class OSTypes(models.IntegerChoices):
    IOS = 0, _("IOS")
    ANDROID = 1, _("ANDROID")
    WEB = 2, _("WEB")


class FCMDevice(AbstractFCMDevice):
    """Custom FCMDevice Model"""

    type = models.IntegerField(choices=OSTypes.choices, null=True, blank=True)

    class Meta:
        default_related_name = "fcm_devices"
        db_table = "notification_fcm_device"
        verbose_name = _("FCM device")
        verbose_name_plural = _("FCM devices")

    @staticmethod
    def generate_fcm_message(title=None, message=None, data={}, topic=None):
        """generates a Firebase compatible message"""
        return Message(
            notification=Notification(title=title, body=message),
            topic=topic,
            data=data,
        )

    def deactivate_previous_fcm_devices(self):
        """deactivate previous FCMDevice devices with same Registration ID or User"""
        previous_fcm_devices = self.__class__.objects.filter(
            models.Q(registration_id=self.registration_id)
            | (models.Q(user=self.user)),
            active=True,
        ).exclude(id=self.id)

        if not previous_fcm_devices:
            return False

        for previous_fcm_device in previous_fcm_devices:
            previous_fcm_device.active = False
            previous_fcm_device.save()

        return True

    def deactivate_duplicate_devices(self):
        """deactivate previous FCMDevice with same device ID"""
        previous_fcm_device_query = self.__class__.objects.filter(
            device_id=self.device_id,
            active=True,
        ).exclude(id=self.id)

        if not previous_fcm_device_query:
            return False

        for previous_fcm_device in previous_fcm_device_query:
            previous_fcm_device.active = False
            previous_fcm_device.save()

        return True

    @classmethod
    def _handle_subscribtion(cls, identifier, users_list, should_subscribe):
        """generic handle subscribtion"""

        fcm_queryset = FCMDevice.objects.filter(user__in=users_list, active=True)
        success = fcm_queryset.handle_topic_subscription(should_subscribe, topic=identifier)

        return success

    @classmethod
    def subscribe_to_topic(cls, identifier, users_list):
        """subscribe to a specific identifier"""

        subscribed = cls._handle_subscribtion(
            identifier=identifier,
            users_list=users_list,
            should_subscribe=True,
        )

        return subscribed

    @classmethod
    def unsubscribe_from_topic(cls, identifier, users_list):
        """unsubscribe from a specific identifier"""

        unsubscribed = cls._handle_subscribtion(
            identifier=identifier,
            users_list=users_list,
            should_subscribe=False,
        )

        return unsubscribed

    # @classmethod
    # def subscribe_in_courses(cls, user, courses_queryset):
    #     """subscribe in all enrolled courses"""
    #     if not isinstance(user, User):
    #         return False

    #     if not isinstance(courses_queryset, QuerySet):
    #         return False

    #     if courses_queryset.model != Course:
    #         return False

    #     for course in courses_queryset:
    #         identifier = get_topic_identifier(name=course.__class__.__name__, object_id=course.id)
    #         cls.subscribe_to_topic(identifier=identifier, users_list=[user])

    #     return True

    # @classmethod
    # def unsubscribe_in_courses(cls, user, courses_queryset):
    #     """unsubscribe in all enrolled courses"""
    #     if not isinstance(user, User):
    #         return False

    #     if not isinstance(courses_queryset, QuerySet):
    #         return False

    #     if courses_queryset.model != Course:
    #         return False

    #     for course in courses_queryset:
    #         identifier = get_topic_identifier(name=course.__class__.__name__, object_id=course.id)
    #         cls.unsubscribe_from_topic(identifier=identifier, users_list=[user])

    #     return True
