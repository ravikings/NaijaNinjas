"""
Django settings for server project.

Generated by 'django-admin startproject' using Django 3.1.2.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.1/ref/settings/
"""

from datetime import timedelta
from pathlib import Path
import os
from dotenv import load_dotenv
from rest_framework.settings import api_settings

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv()  # take environment variables from .env.

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "h@e3z6yev#04x)$kdhp5!+y=q0t2-&)q-#wvbt-h@%dwem=8s#"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    "*",
    "https://zjoxobi1x6.execute-api.us-east-1.amazonaws.com/dev",
    "https://fb54-98-44-232-67.ngrok.io",
]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
    # 3rd-party apps
    "rest_framework",
    "durin",
    "rest_framework.authtoken",
    "dj_rest_auth",
    "notifications",
    "notifications_rest",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "dj_rest_auth.registration",
    "corsheaders",
    "drf_yasg",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
    "drfpasswordless",
    "channels",
    "ckeditor",
    "django_filters",
    "rest_framework_simplejwt",
    "django_s3_storage",
    "django_celery_results",
    "celery_progress",
    # "hitcount",
    # Local
    "forum",
    "history",
    "chatserver",
    "accounts",
    "debug_toolbar",
    "task",
    "payment",
    "Marketing",
    "bank",
]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.TokenAuthentication",
        "durin.auth.CachedTokenAuthentication",  # new
        "durin.auth.TokenAuthentication",
        # "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 15,
    "ORDERING_PARAM": "ordering",
}

REST_USE_JWT = True
JWT_AUTH_COOKIE = "my-app-auth"  # The cookie key name can be the one you want
JWT_AUTH_REFRESH_COOKIE = "my-refresh-token"

AUTHENTICATION_BACKENDS = (
    # "axes.backends.AxesStandaloneBackend",
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

REST_AUTH_REGISTER_SERIALIZERS = {
    "REGISTER_SERIALIZER": "accounts.serializers.CustomRegisterSerializer"
}


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    # "django.middleware.csrf.CsrfViewMiddleware",
    "corsheaders.middleware.CorsPostCsrfMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    # "axes.middleware.AxesMiddleware",
]


CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

CORS_ALLOW_HEADERS = [
    "accept",
    "accept-encoding",
    "authorization",
    "content-type",
    "dnt",
    "origin",
    "user-agent",
    "x-csrftoken",
    "x-requested-with",
    "set-token",
    "Access-Control-Allow-Origin",
]


CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]

CORS_ALLOW_CREDENTIALS = True

CORS_EXPOSE_HEADERS = ["Content-Type", "X-CSRFToken"]
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8000",
    "http://127.0.0.1:8000",
]


CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = "None"

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = "None"

SESSION_COOKIE_HTTPONLY = "True"
SESSION_COOKIE_AGE = 60 * 60 * 24 * 7 * 2


ROOT_URLCONF = "server.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "server.wsgi.application"


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

##TODO: Use pg bounder in the future: pip install django-postgrespool2
# DATABASES = {
#     "default": {
#         "ENGINE": "django.db.backends.postgresql_psycopg2",
#         "NAME": "lastestgigxdb",
#         "USER": "postgres",
#         "PASSWORD": "2{c%v~TtV?_SFCer",
#         "HOST": "database-1.cr8hsmkceq6e.us-east-1.rds.amazonaws.com",
#         "PORT": "5432",
#         "CONN_MAX_AGE": 60,
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/3.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Africa/Lagos"

USE_I18N = True

USE_L10N = True

USE_TZ = True

SITE_ID = 1
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.1/howto/static-files/

# STATIC_URL = "/static/"

# MEDIA_URL = "/media/"
# MEDIA_ROOT = os.path.join(BASE_DIR, "media/")

ACCOUNT_EMAIL_VERIFICATION = "none"

ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
SOCIALACCOUNT_QUERY_EMAIL = True
SOCIALACCOUNT_PROVIDERS = {"google": {}, "facebook": {}}
# LOGIN_REDIRECT_URL = 'home'
AUTH_USER_MODEL = "accounts.AccountUser"
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"


SOCIALACCOUNT_PROVIDERS = {
    "google": {
        "SCOPE": [
            "profile",
            "email",
        ],
        "AUTH_PARAMS": {
            "access_type": "online",
        },
    }
}


LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "WARNING",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": os.getenv("DJANGO_LOG_LEVEL", "INFO"),
            "propagate": False,
        },
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.AutoField"
ASGI_APPLICATION = "server.asgi.application"
CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}

CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.dummy.DummyCache",
    }
}

AWS_ACCESS_KEY_ID = "AKIA525LDBK2M3KUXK3R"
AWS_SECRET_ACCESS_KEY = "mzbEVDLdWPF/Ez4eumkkBh7STtrTdVx30D+arXhM"
AWS_DEFAULT_REGION = "us-east-1"
AWS_LOCATION = "static"
AWS_S3_OBJECT_PARAMETERS = {"CacheControl": "max-age=86400"}

YOUR_S3_BUCKET = "zappa-wnf4dp8g2"

DEFAULT_FILE_STORAGE = "django_s3_storage.storage.S3Storage"
STATICFILES_STORAGE = "django_s3_storage.storage.StaticS3Storage"
AWS_S3_BUCKET_NAME_STATIC = YOUR_S3_BUCKET
AWS_S3_MAX_AGE_SECONDS_STATIC = "94608000"

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "staticfiles"),
]
# These next two lines will serve the static files directly
# from the s3 bucket
AWS_S3_CUSTOM_DOMAIN = "%s.s3.amazonaws.com" % YOUR_S3_BUCKET
STATIC_URL = "https://%s/" % AWS_S3_CUSTOM_DOMAIN

# OR...if you create a fancy custom domain for your static files use:
# AWS_S3_PUBLIC_URL_STATIC = "https://static.zappaguide.com/"


# EMAIL_HOST = 'smtp.gmail.com'
# EMAIL_USE_TLS = True
# EMAIL_PORT = 587
# # EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
# # EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')

# EMAIL_HOST_USER = 'barry.shoki1@gmail.com'
# EMAIL_HOST_PASSWORD = '123Amina4@'

# Celery settings
CELERY_BROKER_URL = (
    "amqps://wmkxuxlw:reXDWVEj7Z0YK44d_dtEyfO_RjQX_xCe@toad.rmq.cloudamqp.com/wmkxuxlw"
)
# CELERY_RESULT_BACKEND = "amqps://wmkxuxlw:reXDWVEj7Z0YK44d_dtEyfO_RjQX_xCe@toad.rmq.cloudamqp.com/wmkxuxlw"
CELERY_IMPORTS = [
    "payment.tasks",
]
CELERY_RESULT_BACKEND = "django-db"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_JSON = "json"
CELERY_TIMEZONE = "Africa/Lagos"
CELERY_ACKS_LATE = True

# paystack info
PAYSTACK_SECRET_KEY = "sk_test_9576a7e41acdeb3ce9f62bdc86fc50dcdf901d9c"
PAYSTACK_PUBLIC_KEY = "pk_test_b4198537c6f3c50f8fc0fccaebf4d0aae311d411"

REST_DURIN = {
    "DEFAULT_TOKEN_TTL": timedelta(days=30),
    "TOKEN_CHARACTER_LENGTH": 64,
    "USER_SERIALIZER": "accounts.serializers.UserSerializer",
    "AUTH_HEADER_PREFIX": "Token",
    "EXPIRY_DATETIME_FORMAT": api_settings.DATETIME_FORMAT,
    "TOKEN_CACHE_TIMEOUT": 60,
    "REFRESH_TOKEN_ON_LOGIN": True,
    "AUTHTOKEN_SELECT_RELATED_LIST": ["user"],
    "API_ACCESS_CLIENT_NAME": "frontend",
    "API_ACCESS_EXCLUDE_FROM_SESSIONS": False,
    "API_ACCESS_RESPONSE_INCLUDE_TOKEN": True,
}

# AXES_FAILURE_LIMIT = 5
# AXES_COOLOFF_TIME = 6
# AXES_RESET_ON_SUCCESS = True
# AXES_USERNAME_FORM_FIELD = "login"

PASSWORDLESS_AUTH = {
    "PASSWORDLESS_AUTH_TYPES": [
        "EMAIL",
    ],
    "PASSWORDLESS_EMAIL_NOREPLY_ADDRESS": "noreply@example.com",
}
