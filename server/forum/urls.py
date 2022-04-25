from django.urls import path, include
from rest_framework.routers import DefaultRouter
from forum.views import ForumView, ForumList, CommentView, CommentVotes, SearchForum

router = DefaultRouter()
router.register(r"detail", ForumView, basename="forum-dashboard")
router.register(r"comment", CommentView, basename="forum-comment")
router.register(r"vote", CommentVotes, basename="vote-comment")
router.register(r"list", ForumList, basename="forum-list")
router.register(r"search", SearchForum, basename="forum-search")

urlpatterns = [
    path("", include(router.urls)),
]
