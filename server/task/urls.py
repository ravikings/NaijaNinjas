from django.urls import path, include
from rest_framework.routers import DefaultRouter
from task.views import (
    TaskView,
    TaskBidderView,
    TaskImageAPIView,
    TaskApproveView,
    TimelineView,
    TimelineCommentView,
    TaskOwnerView,
    TaskAssigned,
    task_favorite,
    get_timeiline,
    pro_assigned_task,
    task_ordered,
    approve_delivery,
    DashboardTaskFavorite,
    SearchTask,
    accept_bid,
    ContractView,
    TaskRelatedView,
    GetTimelineView,
)

router = DefaultRouter()
router.register(r"task", TaskView, basename="task-available")
router.register(r"search-task", SearchTask, basename="search-task")
router.register(r"task-owner", TaskOwnerView, basename="task-owner-dashboard")
router.register(r"task-bidding", TaskBidderView, basename="task-bidding")
router.register(r"task-photos", TaskImageAPIView, basename="task-photos")
# router.register(r"approve-bids", TaskApproveView, basename="approve-bids")
# router.register(r"timeline", TimelineView, basename="task-timeline")
router.register(r"comment-timeline", TimelineCommentView, basename="comment-timeline")
router.register(r"task-assigned", TaskAssigned, basename="task-assigned")
router.register(
    r"dashboard-task-bookmarks",
    DashboardTaskFavorite,
    basename="dashboard-task-bookmarks",
)
router.register(r"dashboard-orders", ContractView, basename="dashboard-orders")
router.register(r"related-tasks", TaskRelatedView, basename="related-tasks")
router.register(
    r"test-timeline",
    GetTimelineView,
    basename="test-timline",
)


urlpatterns = [
    path("", include(router.urls)),
    path("task-bookmark/<str:pk>/", task_favorite, name="task-bookmark"),
    path("approve-bid/", accept_bid, name="approve-bid"),
    path(
        "get-timeline/<str:task_id>/<str:task_owner>",
        get_timeiline,
        name="timeline-tracker",
    ),
    path(
        "test-timeline/<str:task_id>/<str:task_owner>",
        GetTimelineView.as_view({"get": "list"}),
        name="test-timline",
    ),
    path("get-assigned-task/<str:task_owner>", pro_assigned_task, name="get-assigned-task"),
    path("get-ordered-task/<str:task_owner>", task_ordered, name="get-ordered-task"),
    path("approve-delivery/<str:pk>", approve_delivery, name="approve-delivery"),
    
    
]
