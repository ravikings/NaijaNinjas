"""
ASGI config for server project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.1/howto/deployment/asgi/
"""

import os
from django.urls import re_path
from django.core.asgi import get_asgi_application
from channels.routing import URLRouter, ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
import chatserver.routing


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AuthMiddlewareStack(
            URLRouter(chatserver.routing.websocket_urlpatterns)
        ),
    }
)
