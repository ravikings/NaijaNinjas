from django.urls import path, include
from rest_framework.routers import DefaultRouter
from chatserver.views import (
    start_convo,
    get_conversation,
    MesageFileDownload,
    conversations,
    delete_conversation,
    file_upload,
)


router = DefaultRouter()
router.register(r"message-file-download", MesageFileDownload, basename="message-file-download")

urlpatterns = [
    path("", include(router.urls)),
    path("start/<str:starter>/<str:pk>/", start_convo, name="start_convo"),
    # path("message_room/<int:convo_id>/", get_conversation, name="get_conversation"),
    path(
        "message_room/<int:convo_id>/",
        get_conversation.as_view({"get": "list"}),
        name="get_conversation",
    ),
    path("conversations/<str:pk>/", conversations, name="conversations"),
    path("chat_file_upload/", file_upload, name="chat_file_upload"),
    path(
        "delete-conversations/<int:user_id>/<int:convo_id>/",
        delete_conversation,
        name="delete-conversations",
    ),
]
