from django.contrib import admin
from .models import RunnerProfile, RunnerResume, Review

# Register your models here.
admin.site.register(RunnerProfile)
admin.site.register(RunnerResume)
admin.site.register(Review)
