from django_elasticsearch_dsl import Document, Index, fields
from elasticsearch_dsl import analyzer
from accounts.models import RunnerProfile

PUBLISHER_INDEX = Index('runnerprofile')
PUBLISHER_INDEX.settings(
    number_of_shards=1,
    number_of_replicas=1
)


@PUBLISHER_INDEX.doc_type
class ProfileDocument(Document):
    """Publisher Elasticsearch document."""

    id = fields.IntegerField(attr='id')

    Name = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    Title = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    Language = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    location = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    salary = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    country = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    photo = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    address = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    postcode = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )
    description = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )

    city = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )

    local_goverment_zone = fields.StringField(
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )

    class Meta:
        """Meta options."""

        model = RunnerProfile