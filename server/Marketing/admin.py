from django.contrib import admin

# Register your models here.

from .models import User_Account, User_Profile

class show_User_Account(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'Email', 'Number']


admin.site.register(User_Account)
admin.site.register(User_Profile)
