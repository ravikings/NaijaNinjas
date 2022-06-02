import base64
import json
import secrets
from datetime import datetime
import logging

from asgiref.sync import async_to_sync
from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer
from django.core.files.base import ContentFile

# from users.models import MyUser
from .models import Message, Conversation
from .serializers import MessageSerializer


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()
        logging.warning("connected to room group!")

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )
        logging.warning("chat disconnect!")

    # Receive message from WebSocket
    @database_sync_to_async
    def receive(self, text_data=None, bytes_data=None):
        # parse the json data into dictionary object
        text_data_json = json.loads(text_data)

        # unpack the dictionary into the necessary parts
        message, attachment = (
            text_data_json["message"],
            text_data_json.get("attachment"),
        )

        conversation = Conversation.objects.get(id=int(self.room_name))
        sender = self.scope["user"]

        # Attachment
        #if attachment:
            # file_str, file_ext = attachment["data"], attachment["format"]

            # file_data = ContentFile(
            #     base64.b64decode(file_str), name=f"{secrets.token_hex(8)}.{file_ext}"
            # )
        _message = Message.objects.create(
            sender=sender,
            attachment=attachment,
            text=message,
            conversation_id=conversation,
        )
        # else:
        #     _message = Message.objects.create(
        #         sender=sender,
        #         text=message,
        #         conversation_id=conversation,
        #     )
        # Send message to room group
        chat_type = {"type": "chat_message"}
        message_serializer = dict(MessageSerializer(instance=_message).data)
        return_dict = {**chat_type, **message_serializer}
        if _message.attachment:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "chat_message",
                    "message": message,
                    "sender": sender.email,
                    "attachment": _message.attachment.url,
                    "time": str(_message.timestamp),
                },
            )
        else:
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                return_dict,
            )

    # Receive message from room group
    def chat_message(self, event):
        dict_to_be_sent = event.copy()
        dict_to_be_sent.pop("type")
        logging.warning("Receive message from room group!")

        # Send message to WebSocket
        async_to_sync(self.send(text_data=json.dumps(dict_to_be_sent)))
