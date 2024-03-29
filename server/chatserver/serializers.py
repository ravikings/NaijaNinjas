from accounts.serializers import UserSerializer, ChatSearchProfileSerializer
from .models import Conversation, Message
from accounts.models import RunnerProfile
from rest_framework import serializers


class MessageSerializer(serializers.ModelSerializer):

    file_name = serializers.SerializerMethodField()
    class Meta:
        model = Message
        exclude = ("conversation_id",)


    def get_file_name(self, instance):

        return instance.attachment.name if instance.attachment.name else None
class FileMessageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        exclude = ("timestamp", "text")

class ConversationListSerializer(serializers.ModelSerializer):

    chat_room_id = serializers.SerializerMethodField()
    initiator = UserSerializer()
    receiver = UserSerializer()
    receiver_profile = serializers.SerializerMethodField()
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = [
            "chat_room_id",
            "initiator",
            "receiver",
            "receiver_profile",
            "last_message",
            "new_message_alert",
        ]

    def get_last_message(self, instance):
        message = instance.message_set.first()
        if message:
            return MessageSerializer(instance=message).data
        else:
            return None

    def get_receiver_profile(self, instance):

        data = RunnerProfile.objects.filter(author=instance.receiver.id)
        serializer = ChatSearchProfileSerializer(data, many=True)
        return serializer.data

    def get_chat_room_id(self, instance):

        return instance.id


class ConversationSerializer(serializers.ModelSerializer):
    initiator = UserSerializer()
    receiver = UserSerializer()
    users_profile = serializers.SerializerMethodField()
    message_set = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ["initiator", "receiver", "users_profile", "message_set", "id"]

    def get_users_profile(self, instance):

        data = RunnerProfile.objects.filter(
            author__in=[instance.initiator, instance.receiver]
        )
        serializer = ChatSearchProfileSerializer(data, many=True)
        return serializer.data
