from django.db import models

# Create your models here.


class User_Account(models.Model):
    class Meta:
        verbose_name_plural = 'User Account'
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    Email = models.CharField(max_length=255)
    Number = models.CharField(max_length=255)
    Password = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name + " " + self.last_name


class User_Profile(models.Model):
    class Meta:
        verbose_name_plural = 'User Profile'
    User = models.ForeignKey(User_Account, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    language = models.CharField(max_length=255)
    salary = models.CharField(max_length=255)
    sector = models.CharField(max_length=255)
    department = models.CharField(max_length=255)
    Description = models.TextField(max_length=255)
    county = models.CharField(max_length=255)
    State = models.CharField(max_length=255)
    Postcode = models.CharField(max_length=255)
    City = models.CharField(max_length=255)
    Address = models.CharField(max_length=255)
    local_government_zone = models.CharField(max_length=255)

    def __str__(self):
        return self.User.first_name + " " + self.User.last_name