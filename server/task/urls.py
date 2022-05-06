from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task.views import TaskView, TaskBidderView

router = DefaultRouter()
router.register(r"task", TaskView, basename="task-dashboard")
router.register(r"task-bidding", TaskBidderView, basename="task-bidding")

urlpatterns = [
    path("", include(router.urls)),
]
