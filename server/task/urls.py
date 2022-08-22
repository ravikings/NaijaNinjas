from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task.views import TaskView, TaskBidderView, TaskImageAPIView, TaskApproveView, TimelineView, TimelineCommentView, TaskOwnerView, TaskAssigned, task_favorite,get_timeiline, DashboardTaskFavorite, SearchTask, accept_bid, ContractView

router = DefaultRouter()
router.register(r"task", TaskView, basename="task-available")
router.register(r"search-task", SearchTask, basename="search-task")
router.register(r"task-owner", TaskOwnerView, basename="task-owner-dashboard")
router.register(r"task-bidding", TaskBidderView, basename="contract-bidding")
router.register(r"task-photos", TaskImageAPIView, basename="task-photos")
#router.register(r"approve-bids", TaskApproveView, basename="approve-bids")
#router.register(r"timeline", TimelineView, basename="task-timeline")
router.register(r"comment-timeline", TimelineCommentView, basename="comment-timeline")
router.register(r"task-assigned", TaskAssigned, basename="task-assigned")
router.register(r"dashboard-task-bookmarks", DashboardTaskFavorite, basename="dashboard-task-bookmarks")
router.register(r"dashboard-contracts", ContractView, basename="dashboard-contracts")


urlpatterns = [
    path("", include(router.urls)),
    path('task-bookmark/<str:pk>/', task_favorite, name="task-bookmark"),
    path('approve-bid/', accept_bid, name="approve-bid"),
    path('get-timeline/<str:task_id>/<str:task_owner>', get_timeiline, name="timeline-tracker"),
]
