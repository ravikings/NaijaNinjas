from django.contrib import admin
from .models import RunnerProfile, RunnerResume, Review, AccountUser, Service, Projects

# Register your models here.
admin.site.register(RunnerProfile)
admin.site.register(RunnerResume)
admin.site.register(Review)
admin.site.register(AccountUser)
admin.site.register(Service)
admin.site.register(Projects)