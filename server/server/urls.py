"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls.static import static
from django.conf import settings
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
import debug_toolbar
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
import notifications.urls

schema_view = get_schema_view(
    openapi.Info(
        title="NaijaContent API",
        default_version="v1",
        description="Transforming sme market",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="sr.rabiu@gmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api-auth/", include("rest_framework.urls")),
    path("accounts/", include("allauth.urls")),
    path("api/v1/", include("accounts.urls")),
    path("api/v1/task/", include("task.urls")),
    path("api/v1/payment/", include("payment.urls")),
    path("ws/chat/", include("chatserver.urls")),
    path("forum/", include("forum.urls")),
    path("dj-rest-auth/", include("dj_rest_auth.urls")),
    path("dj-rest-auth/registration/", include("dj_rest_auth.registration.urls")),
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redoc/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    path("__debug__/", include(debug_toolbar.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('inbox/notifications/', include(notifications.urls, namespace='notifications')),
    path('notifications/', include('notifications_rest.urls')),
    path('celery-progress/', include('celery_progress.urls')),
    path('marketing/', include('Marketing.urls')),
    path('money/', include('bank.urls')),

]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
