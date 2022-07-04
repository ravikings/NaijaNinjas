import imp
from django.contrib import admin
from task.models import Task, TaskBidder
# Register your models here.

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'sector', "department", "post_status"]
    list_filter = ['post_status', 'created', 'updated', "tags"]

@admin.register(TaskBidder)
class TaskBidderAdmin(admin.ModelAdmin):
    list_display = ['task', "offer", "bid_approve_status"]
    list_filter = ['runner_confirmed', 'created', 'bidder']
