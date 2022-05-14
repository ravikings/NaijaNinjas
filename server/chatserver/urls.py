from django.urls import path
from chatserver.views import start_convo, get_conversation, conversations

urlpatterns = [
    path("start/", start_convo, name="start_convo"),
    path("<int:convo_id>/", get_conversation, name="get_conversation"),
    path("conversations/", conversations, name="conversations"),
]
