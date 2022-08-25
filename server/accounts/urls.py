from django.urls import path, include
from rest_framework.routers import DefaultRouter
from accounts.views import (
    PhotoUpload,
    VideoUpload,
    SearchProfile,
    DashboardProfile,
    account_status,
    ReviewView,
    ClientReviewView,
    UserSearchDetails,
    DashboardResume,
    ActivateAccountView,
    ChangePasswordAccountView,
    RequestPasswordResetEmail,
    SetNewPasswordAPIView,
    SetProfilePassword,
    ChangeProfilePassword,
    ServiceView,
    UserDashboardResume,
    UserDashboardProfile,
    ProjectsViewSet,
    ProjectImageAPIView,
    DashboardProfileFavorite,
    taskUpdate,
    resumeUpdate,
    TestView,
    public_quotes,
    profile_mode_status,
    profile_favorite,
    #start_celery_work,
)


router = DefaultRouter()
router.register(r"profile", DashboardProfile, basename="dashboard-profile")
router.register(r"user-profile", UserDashboardProfile, basename="user-profile")
router.register(r"resume", DashboardResume, basename="dashboard-resume")
router.register(r"user-resume", UserDashboardResume, basename="user-resume")
router.register(r"image", PhotoUpload, basename="dashboard-images")
router.register(r"video", VideoUpload, basename="dashboard-videos")
router.register(r"search", SearchProfile, basename="search")
router.register(r"user-review", ReviewView, basename="user-review")
router.register(r"test", TestView, basename="test-view")
router.register(
    r"user-search-detials", UserSearchDetails, basename="user-search-detials"
)
router.register(
    r"professional-services", ServiceView, basename="professional-services"
)
router.register(
    r"projects", ProjectsViewSet, basename="runners-project"
)
router.register(r"project-images", ProjectImageAPIView, basename="project-images")
router.register(r"dashboard-profile-bookmarks", DashboardProfileFavorite, basename="dashboard-profile-bookmarks")
router.register(r"client-review", ClientReviewView, basename="client-review")


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
    path("user-status/<str:pk>/<str:type>/", account_status, name="user-status"),
    path("profile-mode/<str:pk>/<str:type>/", profile_mode_status, name="profile_mode_status"),
    path("public-quotes/", public_quotes, name="public-quotes"),
    path('profile-bookmark/<str:pk>/', profile_favorite, name="profile-bookmark"),
    #path("public-celery/", start_celery_work, name="start-celery"),

]
