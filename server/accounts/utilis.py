from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.core.mail import EmailMessage, send_mail, send_mass_mail
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.urls import reverse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six
from zappa.asynchronous import task as async_task

def get_token(user):
    return RefreshToken.for_user(user).access_token

@async_task
def send_verify_email(token, domain, email, uid):
    email_subject = "Please Confirm Your E-mail Address"
    message = render_to_string(
        "auth/activate.html",
        {"domain": domain, "uid": uid, "token": token},
    )

    send_mail(email_subject, message, settings.EMAIL_HOST_USER, [str(email)])


def send_reset_password_email(user, current_site, email, uid):
    token = RefreshToken.for_user(user).access_token
    email_subject = "Please Reset Your Password"
    message = render_to_string(
        "auth/request-reset-email.html",
        {"user": user, "domain": current_site.domain, "uid": uid, "token": token},
    )

    send_mail(email_subject, message, settings.EMAIL_HOST_USER, [str(email)])


def send_successfully_change_password_email(user, email):
    email_subject = "Your password Was Succesfully changed!"
    message = render_to_string(
        "auth/success-email-changes.html",
        {
            "user": user,
        },
    )

    send_mail(email_subject, message, settings.EMAIL_HOST_USER, [str(email)])


class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (
            six.text_type(user.pk)
            + six.text_type(timestamp)
            + six.text_type(user.is_active)
        )


generate_token = TokenGenerator()
