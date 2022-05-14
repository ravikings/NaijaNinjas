from django.shortcuts import render
from .models import Conversation
from rest_framework.decorators import api_view
from rest_framework.response import Response
from accounts.models import AccountUser
from .serializers import ConversationListSerializer, ConversationSerializer
from django.db.models import Q
from django.shortcuts import redirect, reverse


# Create your views here.
@api_view(["POST", "GET"])
def start_convo(
    request,
):
    data = request.data
    id = data.get("id")

    try:
        participant = AccountUser.objects.get(id=id)
    except AccountUser.DoesNotExist:
        return Response({"message": "You cannot chat with a non existent user"})
 
    conversation = Conversation.objects.filter(
        Q(initiator=1, receiver=participant)
        | Q(initiator=participant, receiver=id)
    )

    if conversation.exists():
        return redirect(reverse("get_conversation", args=(conversation[0].id,)))
    else:
        initiator = AccountUser.objects.get(id=1)
        conversation = Conversation.objects.create(
            initiator=initiator, receiver=participant
        )
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)


@api_view(["GET"])
def get_conversation(request, convo_id):
    conversation = Conversation.objects.filter(id=convo_id)
    if not conversation.exists():
        return Response({"message": "Conversation does not exist"})
    else:
        serializer = ConversationSerializer(instance=conversation[0])
        return Response(serializer.data)


@api_view(["GET"])
def conversations(request):
    conversation_list = Conversation.objects.filter(
        Q(initiator=request.user) | Q(receiver=request.user)
    )
    serializer = ConversationListSerializer(instance=conversation_list, many=True)
    return Response(serializer.data)
