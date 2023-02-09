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
    delete_projects,
    public_project_viewset,
    DashboardServiceView,
    PrivateServiceView,
    DeleteProjectReview,
    RelatedProfile,
    ChatSearchProfile,
    durinSingUp,
    MFATokenVerify,
    switch_to_pro,
    # start_celery_work,
)


#trailing_slash=False
router = DefaultRouter()
router.register(r"profile", DashboardProfile, basename="dashboard-profile")
router.register(r"user-profile", UserDashboardProfile, basename="user-profile")
router.register(r"resume", DashboardResume, basename="dashboard-resume")
router.register(r"user-resume", UserDashboardResume, basename="user-resume")
router.register(r"image", PhotoUpload, basename="dashboard-images")
router.register(r"video", VideoUpload, basename="dashboard-videos")
router.register(r"search", SearchProfile, basename="search")
router.register(r"client-review", ReviewView, basename="client-review")
router.register(r"test", TestView, basename="test-view")
router.register(
    r"user-search-detials", UserSearchDetails, basename="user-search-detials"
)
router.register(r"professional-services", ServiceView, basename="professional-services")
router.register(r"private-services", PrivateServiceView, basename="private-services")
router.register(r"projects", ProjectsViewSet, basename="runners-project")
router.register(r"project-create", ProjectImageAPIView, basename="project-images")
router.register(
    r"dashboard-profile-bookmarks",
    DashboardProfileFavorite,
    basename="dashboard-profile-bookmarks",
)
router.register(r"freelancer-review", ClientReviewView, basename="freelancer-review")
router.register(
    r"service-dashboard", DashboardServiceView, basename="service-dashboard"
)
router.register(
    r"delete-project-image", DeleteProjectReview, basename="delete-project-images"
)
router.register(r"related-profiles", RelatedProfile, basename="related-profiles")
router.register(
    r"chat-search-profiles", ChatSearchProfile, basename="chat-search-profiles"
)


urlpatterns = [
    path("account/", include(router.urls)),
    path("activate/<uid>/<token>", ActivateAccountView.as_view(), name="activate"),
    path(
        "email-reset-password/<uid>/<token>",
        SetNewPasswordAPIView.as_view(),
        name="email-reset-password",
    ),
    path("set-password/", ChangeProfilePassword.as_view(), name="set-password"),
    path("auth/singUp/", durinSingUp, name="auth-singup"),
    path(
        "account/reset_password/",
        ChangePasswordAccountView.as_view(),
        name="reset_password",
    ),
    path(
        "request-reset-email/",
        RequestPasswordResetEmail.as_view(),
        name="request-reset-email",
    ),
    path(
        "user-reset-password/", SetProfilePassword.as_view(), name="user-reset-password"
    ),
    path("mfa/auth/verify/", MFATokenVerify.as_view(), name="token-verify"),
    path("user-profile-update/<str:pk>/", taskUpdate, name="user-profile-update"),
    path("user-resume-update/<str:pk>/", resumeUpdate, name="user-resume-update"),
    path("user-status/<str:pk>/<str:type>/", account_status, name="user-status"),
    path(
        "profile-mode/<str:pk>/<str:type>/",
        profile_mode_status,
        name="profile_mode_status",
    ),
    path("public-quotes/", public_quotes, name="public-quotes"),
    path("delete-project/<str:pk>/", delete_projects, name="delete-project"),
    path("profile-bookmark/<str:pk>/", profile_favorite, name="profile-bookmark"),
    path("public-projects-view/<str:pk>/", public_project_viewset, name="public-projects-view"),
    path("switch-pro-status/", switch_to_pro, name="switch-pro-status")
    # path("public-celery/", start_celery_work, name="start-celery"),
]
