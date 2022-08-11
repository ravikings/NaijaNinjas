from django.test import TestCase
from .models import TaskBidder
from 

# Create your tests here.

data = TaskBidder.objects.get(transaction_id="T609112169769193").se