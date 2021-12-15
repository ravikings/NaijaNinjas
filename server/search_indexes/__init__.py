from django_elasticsearch_dsl import Document, Index, fields
from elasticsearch_dsl import analyzer

from accounts.models import RunnerProfile, RunnerResume