from django.urls import path, include
from rest_framework.routers import DefaultRouter
from forum.views import ForumView, CommentView

router = DefaultRouter()
router.register(r"detail", ForumView, basename="forum-dashboard")
router.register(r"commnet", CommentView, basename="forum-comment")


urlpatterns = [
    path("", include(router.urls)),
]
