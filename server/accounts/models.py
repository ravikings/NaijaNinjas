# models.py in the users Django app
from django.db import models
from django.contrib.auth.models import AbstractUser



class AccountUser(AbstractUser):
    # We don't need to define the email attribute because is inherited from AbstractUser
    phone_number = models.CharField(max_length=12, unique=True)
    is_a_runner =  models.BooleanField(default=False, verbose_name='is_a_runner')