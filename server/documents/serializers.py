from .search_indexes import RunnerProfileIndex
from drf_haystack.serializers import HaystackSerializer


class ProfileIndexSerializer(HaystackSerializer):

    class Meta:
        index_classes = [RunnerProfileIndex]

        fields = [
            "text", "city","description", "postcode", "autocomplete", "title"
        ]

