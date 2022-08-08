import base64
import json
import secrets
from datetime import datetime
import logging

from asgiref.sync import async_to_sync, sync_to_async
from channels.db import database_sync_to_async
from channels.generic.websocket import WebsocketConsumer
from django.core.files.base import ContentFile
from accounts.models import RunnerProfile

# from users.models import MyUser
from .models import Message, Conversation
from .serializers import MessageSerializer


class ChatConsumer(WebsocketConsumer):
    
    def getUser(self):
        sender = self.scope["user"]
        print("chat user online")
        print(sender)
        return RunnerProfile.objects.get(author=sender)

    def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = f"chat_{self.room_name}"
        self.userObj = self.getUser()
        self.userObj.set_online_status("LOGIN")
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()
        logging.warning("connected to room group!")

    def disconnect(self, close_code):
        # Leave room group
        # userObj = await database_sync_to_async(self.getUser())
        self.userObj.set_online_status("LOGOUT")
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )
        logging.warning("chat disconnect!")

    # Receive message from WebSocket
    @sync_to_async
    def receive(self, text_data=None, bytes_data=None):
        # parse the json data into dictionary object
        text_data_json = json.loads(text_data)

        # unpack the dictionary into the necessary parts
        message, attachment, action = (
            text_data_json["message"],
            text_data_json["attachment"],
            text_data_json['action'],
        )

        conversation = Conversation.objects.get(id=int(self.room_name))
        sender = self.scope["user"]

        if action == 'message':
            # Attachment
            file_data = None
            if attachment:
                file_str, file_ext = attachment["data"], attachment["format"]

                file_data = ContentFile(
                    base64.b64decode(file_str), name=f"{secrets.token_hex(8)}.{file_ext}"
                )
            
            _message = Message.objects.create(
                sender=sender,
                attachment=file_data,
                text=message,
                conversation_id=conversation,
            )

            # Send message to room group
            #userObj = self.getUser()
            # userObj.set_online_status("ONLINE")
            chat_type = {"type": "chat_message"}
            message_serializer = dict(MessageSerializer(instance=_message).data)
            return_dict = {**chat_type, **message_serializer}
            if _message.attachment:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    {
                        "type": "chat_message",
                        "message": message,
                        "sender": sender,
                        'userImage': self.userObj.photo.url,
                        "online_status": self.userObj.status,
                        'userName': self.userObj.first_name + " " + self.userObj.last_name,
                        "attachment": _message.attachment.url,
                        "time": str(_message.timestamp),
                    },
                )
            else:
                async_to_sync(self.channel_layer.group_send)(
                    self.room_group_name,
                    #return_dict,
                        {
                        "type": "chat_message",
                        "message": message,
                        "sender": sender,
                        'userImage': self.userObj.photo.url,
                        "online_status": self.userObj.status,
                        'userName': self.userObj.first_name + " " + self.userObj.last_name,
                        "time": str(_message.timestamp),
                    },
                )
                
        elif action == 'typing':
            return_dict = {
				'action': 'typing',
				'message': message,
                "sender": sender,
                'userImage': self.userObj.photo.url,
                "online_status": self.userObj.status,
                'userName': self.userObj.first_name + " " + self.userObj.last_name,
                "time": str(_message.timestamp),
			}
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
