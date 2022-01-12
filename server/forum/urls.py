from django.urls import path, include
from rest_framework.routers import DefaultRouter
from forum.views import ForumView, CommentView, CommentVotes

router = DefaultRouter()
router.register(r"detail", ForumView, basename="forum-dashboard")
router.register(r"comment", CommentView, basename="forum-comment")
router.register(r"vote", CommentVotes, basename="vote-comment")


urlpatterns = [
    path("", include(router.urls)),
]
