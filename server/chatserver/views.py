from http.client import BAD_REQUEST
from django.shortcuts import render
from .models import Conversation, Message
from rest_framework.permissions import IsAuthenticated, AllowAny
from accounts.permissions import CanDownloadMessageFile
from django.http import FileResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from accounts.models import AccountUser
from .serializers import (
    ConversationListSerializer,
    ConversationSerializer,
    FileMessageUploadSerializer,
)
from django.db.models import Q
from django.shortcuts import redirect, reverse
from django.core.paginator import Paginator


# Create your views here.
@api_view(["POST", "GET"])
def start_convo(request, starter, pk):

    try:
        participant = AccountUser.objects.get(id=pk)
    except AccountUser.DoesNotExist:
        return Response({"message": "You cannot chat with a non existent user"})

    conversation = Conversation.objects.filter(
        Q(initiator=starter, receiver=participant)
        | Q(initiator=participant, receiver=pk)
    )

    if conversation.exists():
        return redirect(reverse("get_conversation", args=(conversation[0].id,)))
    else:
        initiator = AccountUser.objects.get(id=starter)
        conversation = Conversation.objects.create(
            initiator=initiator, receiver=participant
        )
        serializer = ConversationSerializer(conversation)
        return Response(serializer.data)


class get_conversation(viewsets.ModelViewSet):

    serializer_class = ConversationSerializer

    def get_queryset(self):
        convo_id = self.kwargs["convo_id"]
        return Conversation.objects.filter(id=convo_id)


class MesageFileDownload(viewsets.ModelViewSet):

    """
    uses to download file for attachment
    """

    permissions_classes = [IsAuthenticated]  # and CanDownloadMessageFile]
    queryset = Message.objects.all()
    serializer_class = ConversationSerializer

    def retrieve(self, request, pk=None):

        instance = self.get_object()
        # Security guard
        self.allow_download(request, instance)
        file_handle = instance.attachment.open()
        if file_handle:

            # send file
            response = FileResponse(file_handle, content_type="file")
            response["Content-Length"] = instance.attachment.size
            response["Content-Disposition"] = (
                'attachment; filename="%s"' % instance.attachment.name
            )

            return response

        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def allow_download(self, request, instance):

        initiator = instance.conversation_id.initiator
        receiver = instance.conversation_id.receiver
        if initiator == request.user:
            return True

        elif receiver == request.user:
            return True

        else:
            raise ValueError({"error": "user not allowed"})


@api_view(["GET", "POST"])
def conversations(request, pk):
    conversation_list = Conversation.objects.filter(Q(initiator=pk) | Q(receiver=pk))
    serializer = ConversationListSerializer(instance=conversation_list, many=True)
    return Response(serializer.data)


@api_view(["GET", "POST"])
def file_upload(request):
    """
    fields required:
    1. sender: user id field
    2. attachment: file field
    3. attachment_type: file type field
    4. conversation_id: conversation id field
    """
    data = request.data
    file_serializer = FileMessageUploadSerializer(data=data)
    if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)

    else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
def delete_conversation(request, user_id, convo_id):
    try:
        conversation = Conversation.objects.get(id=convo_id)
        if conversation.initiator.id == user_id:
            conversation.initiator = None
            conversation.save()
            return Response({"message": "conversation delete"})
        elif conversation.receiver.id == user_id:
            conversation.receiver = None
            conversation.save()
            return Response({"message": "conversation delete"})

        return Response({"error": "sorry, action not completed"})

    except Exception:

        return Response({"error": "deletion not succesfull"})
