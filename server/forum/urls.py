from django.urls import path, include
from rest_framework.routers import DefaultRouter
from forum.views import ForumView, ForumList, CommentView, CommentVotes, SearchForum, RecentForum, ForumHomeView, ImageAPIView

router = DefaultRouter()
router.register(r"detail", ForumView, basename="forum-dashboard")
router.register(r"comment", CommentView, basename="forum-comment")
router.register(r"vote", CommentVotes, basename="vote-comment")
router.register(r"list", ForumList, basename="forum-list")
router.register(r"search", SearchForum, basename="forum-search")
router.register(r"recent", RecentForum, basename="recent-search")
router.register(r"home", ForumHomeView, basename="home-result")
router.register(r"forum-images", ImageAPIView, basename="forum-images")


urlpatterns = [
    path("", include(router.urls)),
]
