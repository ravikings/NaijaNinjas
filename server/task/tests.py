from django.test import TestCase
from .models import TaskBidder

# Create your tests here.
id = TaskBidder.objects.get(task=1)
print(id)