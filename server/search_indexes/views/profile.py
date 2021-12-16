from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    OrderingFilterBackend,
    SearchFilterBackend,
    DefaultOrderingFilterBackend
)
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet

# Example app models
from search_indexes.documents.profile import ProfileDocument
from search_indexes.serializers.profile import ProfileDocumentSerializer


class ProfileDocumentView(DocumentViewSet):
    """The ProfileDocument view."""

    document = ProfileDocument
    serializer_class = ProfileDocumentSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        OrderingFilterBackend,
        DefaultOrderingFilterBackend,
        SearchFilterBackend,
    ]
    # Define search fields
    search_fields = (
            'name',
            'Title',
            'location',
            'salary',
            'description',
            'city',
        )
    # Define filtering fields
    filter_fields = {
        'id': None,
        'name': 'name.raw',
        'city': 'city.raw',
        'location': 'location.raw',
        'description': 'description.raw',
    }
    # Define ordering fields
    ordering_fields = {
        'id': None,
        'name': None,
        'location': None,
        'description': None,
    }
    # Specify default ordering
    ordering = ('id', 'name',)