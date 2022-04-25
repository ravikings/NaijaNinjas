from django.contrib import admin
from .models import Comment, Forum

# Register your models here.
admin.site.register(Forum)
admin.site.register(Comment)
