from django.contrib import admin

# Register your models here.
from .models import TransactionLog

admin.site.register(TransactionLog)