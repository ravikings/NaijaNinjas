from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import (
    PhotoUpload,
    VideoUpload,
    SearchProfile,
    DashboardProfile,
    AccountStatus,
    ReviewView,
    UserSearchDetails,
    DashboardResume,
    ActivateAccountView,
    ChangePasswordAccountView,
    TestView,
)


router = DefaultRouter()
router.register(r"profile", DashboardProfile, basename="dashboard-profile")
router.register(r"resume", DashboardResume, basename="dashboard-resume")
router.register(r"image", PhotoUpload, basename="dashboard-images")
router.register(r"video", VideoUpload, basename="dashboard-videos")
router.register(r"search", SearchProfile, basename="search")
router.register(r"user-status", AccountStatus, basename="user-status")
router.register(r"user-review", ReviewView, basename="user-review")
router.register(r"test", TestView, basename="test-view")
router.register(
    r"user-search-detials/", UserSearchDetails, basename="user-search-detials"
)

urlpatterns = [
    path("account/", include(router.urls)),
    path('activate/<uidb64>/<token>',
        ActivateAccountView.as_view(), name='activate'),
    path("account/reset_password/", ChangePasswordAccountView.as_view(), name="reset_password")
]
