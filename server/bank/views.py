from django.shortcuts import render
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from durin.auth import (
    TokenAuthentication as DurinTokenAuthentication,
)
from .models import CurrentBalance
from .serializers import CurrentBalanceSerializer
from rest_framework.response import Response


# Create your views here.


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([DurinTokenAuthentication])
def users_account(request):

    obj, _created = CurrentBalance.objects.get_or_create(author=request.user)
    serializer = CurrentBalanceSerializer(obj)
    return Response(serializer.data)
