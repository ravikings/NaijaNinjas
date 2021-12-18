from django.urls import path

from . import views

urlpatterns = [
    path("fakeroom/", views.index, name="index-chat"),
    path('<str:room_name>/', views.room, name='room'),
]
