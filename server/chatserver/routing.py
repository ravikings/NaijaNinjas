from django.urls import re_path

from chatserver import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/room/(?P<user_id>\w+)/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
]
