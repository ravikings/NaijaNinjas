from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task.views import TaskView, TaskBidderView, TaskImageAPIView, TaskApproveView, TimelineView, TimelineCommentView, TaskOwnerView

router = DefaultRouter()
router.register(r"task", TaskView, basename="task-available")
router.register(r"task-owner", TaskOwnerView, basename="task-owner-dashboard")
router.register(r"task-bidding", TaskBidderView, basename="contract-bidding")
router.register(r"task-photos", TaskImageAPIView, basename="task-photos")
router.register(r"approve-bids", TaskApproveView, basename="approve-bids")
router.register(r"timeline", TimelineView, basename="task-timeline")
router.register(r"comment-timeline", TimelineCommentView, basename="comment-timeline")


urlpatterns = [
    path("", include(router.urls)),
]
