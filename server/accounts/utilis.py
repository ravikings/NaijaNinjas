
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.core.mail import EmailMessage, send_mail, send_mass_mail
from rest_framework_simplejwt.tokens import RefreshToken
from django.conf import settings
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

def send_verify_email(user, current_site, email, uid):
    token = RefreshToken.for_user(user).access_token
    email_subject = 'Please Confirm Your E-mail Address'
    message = render_to_string('auth/activate.html',
                                {
                                    'user': user,
                                    'uid': uid,
                                    'domain': current_site.domain,
                                    'token': token
                                }
                                )

    send_mail(
        email_subject,
        message,
        settings.EMAIL_HOST_USER,
        [str(email)]
    )



class TokenGenerator(PasswordResetTokenGenerator):
    def _make_hash_value(self, user, timestamp):
        return (six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_active))


generate_token = TokenGenerator()