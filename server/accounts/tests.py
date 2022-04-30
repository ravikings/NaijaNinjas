# from django.test import TestCase
# from django.contrib.auth.hashers import make_password
# from django.db import transaction
# from rest_framework import serializers
# from django.db.models import Avg, F
# from dj_rest_auth.registration.serializers import RegisterSerializer
# from rest_framework.validators import UniqueValidator
# from django.db import IntegrityError
# from django.utils.safestring import mark_safe
# from django.db.models import Avg, F, Count
# from accounts.models import (
#     AccountUser,
#     RunnerProfile,
#     RunnerResume,
#     Photo,
#     Vidoe,
#     Review,
# )

# from .models import IpModel, RunnerProfile, Review
# from django.core.mail import send_mail, send_mass_mail
# from django.conf import settings


# # import jwt

# # token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUwOTE4ODQ1LCJpYXQiOjE2NTA5MTg1NDUsImp0aSI6IjVhODg4ZTkxMTBlOTQwMzdhZDUzNDIxN2ZmYTVhMDM4IiwidXNlcl9pZCI6MTl9.5wFhw1f-SmAmW2MJPqLKhd_YTyMccRKafn-0WAHNFFY"

# # payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])

# # print("hey im printing covid")
# # print("email sent")

# # print(payload)

# def laod_user():
#     with open('templates/GigxNowRandomDatafix.csv') as file:
#         content = file.readlines()

#     load_data = []
#     # content = content[:1]

#     for x in content:
#         i = x.split(",")
#         e = i[1].split("@")
#         load_data.append(AccountUser(username=e[0], phone_number=i[2], email=i[1], password=make_password(i[4])))

#     print(load_data)
#     AccountUser.objects.bulk_create(load_data)
#     print("create completed!")


# def load_runner():

#     load_data = []
#     #try:
#     with open('templates/MOCK_DATA.csv') as file:
#         data = file.readlines()

        
#         content = data[2:]
#         for x in content:

#             i = x.split(",")

#             load_data.append(RunnerProfile(first_name=i[0], last_name=i[1],title=i[2], location=i[3],address=i[4],postcode=i[5],description=i[7], state=i[8],city=i[9], author_id=int(i[10])))



#     RunnerProfile.objects.bulk_create(load_data)
#     print("create completed!")


# def load_resume():
    
#     load_data = []
#     #try:
#     with open('templates/mock_resume_data.csv') as file:
#         data = file.readlines()

        
#         content = data[1:]
#         for x in content:

#             i = x.split(",")
#             load_data.append(RunnerResume(headline=i[1],skills=i[2], employment=i[3],projects=i[4],profile_summary=i[5],accomplishment=i[7], author_id=int(i[0])))



#     RunnerResume.objects.bulk_create(load_data)
#     print("create completed!")


# # To load data uncomment below
# #laod_user()
# #load_runner()
# #load_resume()


from datetime import datetime   
import arrow
import pytz


#loc_dt = datetime(2022, 4, 29, 21, 30, 19, 328196, tzinfo=ZoneInfo("America/Los_Angeles"))

user_last_login = arrow.get("2022-04-30T03:02:11.424073Z")
now = arrow.utcnow()
current_time = now.replace(tzinfo='Africa/Lagos')

minutes = current_time-user_last_login

difference = minutes.total_seconds()
time = difference // (60)
if time > 5:
    print({"status":"offline"})