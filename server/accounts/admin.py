from django.contrib import admin
from .models import AccountUser

# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ["user", "phone_number", "photo"]
