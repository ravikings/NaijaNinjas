from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.login_func, name="login_func"),
    path('create_user', views.marketing_func, name="marketing_func"),
    path('func_logout', views.func_logout, name="func_logout"),
]