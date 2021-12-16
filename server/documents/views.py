from accounts.models import RunnerProfile
from .serializers import ProfileIndexSerializer
from drf_haystack.viewsets import HaystackViewSet

class ProfileIndexSearchView(HaystackViewSet):
    
    index_models = [RunnerProfile]
    serializer_class = ProfileIndexSerializer