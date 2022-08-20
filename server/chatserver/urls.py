from django.urls import path
from chatserver.views import start_convo, get_conversation, conversations, delete_conversation

urlpatterns = [
    path("start/<str:starter>/<str:pk>/", start_convo, name="start_convo"),
    path("message_room/<int:convo_id>/", get_conversation, name="get_conversation"),
    path("conversations/<str:pk>/", conversations, name="conversations"),
    path("delete-conversations/<int:user_id>/<int:convo_id>/", delete_conversation, name="delete-conversations"),
]