from history.models import History
from django.contrib.contenttypes.models import ContentType


def history_tracker(request, instance, *args, **kwargs):

    if request.user.is_authenticated and instance is not None:

        object_viewed_receiver(request, instance)


def object_viewed_receiver(request, instance, *args, **kwargs):

    new_history = History.objects.create(
        user=request.user,
        content_type=ContentType.objects.get_for_model(instance),
        object_id=instance.id,
    )
