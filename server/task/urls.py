from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task.views import TaskView, TaskBidderView, TaskImageAPIView, TaskApproveView

router = DefaultRouter()
router.register(r"task", TaskView, basename="task-dashboard")
router.register(r"task-bidding", TaskBidderView, basename="contract-bidding")
router.register(r"task-photos", TaskImageAPIView, basename="task-photos")
router.register(r"approve-bids", TaskApproveView, basename="approve-bids")

urlpatterns = [
    path("", include(router.urls)),
]
