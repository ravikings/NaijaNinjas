# models.py in the users Django app
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser

# testing out cache is ignore

class AccountUser(AbstractUser):
    # We don't need to define the email attribute because is inherited from AbstractUser
    phone_number = models.CharField(max_length=12, unique=True)
    is_a_runner =  models.BooleanField(default=False, verbose_name='is_a_runner')
    photo = models.ImageField(upload_to='users/%Y/%m/%d/',blank=True)


class RunnerProfile(models.Model):
    author = models.ForeignKey(
      settings.AUTH_USER_MODEL, 
      on_delete=models.CASCADE,
      related_name='userinfo'
    )
    Name = models.CharField(max_length=50)
    Title = models.CharField(max_length=55)
    Language = models.CharField(max_length=55)
    location = models.CharField(max_length=55)
    salary = models.CharField(max_length=55)
    country = models.CharField(max_length=55)
    address = models.CharField(max_length=255)
    postcode = models.CharField(max_length=55)
    description = models.TextField()
    state = models.CharField(max_length=55)
    city = models.CharField(max_length=55)
    local_goverment_zone = models.CharField(max_length=55)

