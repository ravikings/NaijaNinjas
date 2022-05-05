import imp
from django.contrib import admin
from task.models import Task, TaskBidder
# Register your models here.

admin.site.register(Task)
admin.site.register(TaskBidder)
