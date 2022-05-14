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
    RequestPasswordResetEmail,
    SetNewPasswordAPIView,
    SetProfilePassword,
    ChangeProfilePassword,
    ServiceView,
    taskUpdate,
    resumeUpdate,
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
    r"user-search-detials", UserSearchDetails, basename="user-search-detials"
)
router.register(
    r"professional-services", ServiceView, basename="professional-services"
)

urlpatterns = [
    path("account/", include(router.urls)),
    path('activate/<uid>/<token>',
        ActivateAccountView.as_view(), name='activate'),
    path('email-reset-password/<uid>/<token>',
        SetNewPasswordAPIView.as_view(), name='email-reset-password'),
    path('set-password/',
        ChangeProfilePassword.as_view(), name='set-password'),
    path("account/reset_password/", ChangePasswordAccountView.as_view(), name="reset_password"),
    path('request-reset-email/', RequestPasswordResetEmail.as_view(), name="request-reset-email"),
    path('user-reset-password/', SetProfilePassword.as_view(), name="user-reset-password"),
    path('user-profile-update/<str:pk>/', taskUpdate, name="user-profile-update"),
    path('user-resume-update/<str:pk>/', resumeUpdate, name="user-resume-update"),

]
