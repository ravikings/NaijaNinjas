from django.utils import timezone
from haystack import indexes
from accounts.models import RunnerProfile

class RunnerProfileIndex(indexes.SearchIndex, indexes.Indexable):
    text = indexes.CharField(document=True, use_template=True)
    city = indexes.CharField(model_attr="city")
    description = indexes.CharField(model_attr="description")
    postcode = indexes.CharField(model_attr="postcode")

    autocomplete = indexes.EdgeNgramField()
    title = indexes.CharField(model_attr="title")

    @staticmethod
    def prepare_autocomplete(obj):
        return " ".join((
            obj.title, obj.city, obj.postcode
        ))

    def get_model(self):
        return RunnerProfile

    def index_queryset(self, using=None):
        return self.get_model().objects.filter(
        created__lte=timezone.now()
    )