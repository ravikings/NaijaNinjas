from signal import strsignal
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.shortcuts import redirect, get_object_or_404, reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib import messages
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from accounts.permissions import IsRunner
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from history.signals import history_tracker
from django.utils.encoding import force_bytes, force_str, smart_bytes
from rest_framework.renderers import TemplateHTMLRenderer
import jwt
from .utilis import send_verify_email,send_reset_password_email, send_successfully_change_password_email, generate_token
from rest_framework import status
from django.conf import settings
from django.contrib.auth import authenticate
from asgiref.sync import async_to_sync
from .models import (
    AccountUser,
    Photo,
    Vidoe,
    RunnerProfile,
    RunnerResume,
    Review,
    IpModel,
)
from .serializers import (
    PhotosSerializer,
    VidoesSerializer,
    UserProfileSearchSerializer,
    ProfileSerializer,
    UserAccountSerializer,
    RunnerProfileSerializer,
    ReviewSerializer,
    UserSearchDetialSerializer,
    UserResumeSerializer,
    ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer,
    UserOnlineSerializer,
)


class DashboardProfile(viewsets.ModelViewSet):

    """
    dashboard serializers use for entry data for getting data to the ui
    """

    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated and IsRunner]

    def get_queryset(self):

        return RunnerProfile.objects.filter(author=self.request.user.id)

    def perform_create(self, serializer):

        serializer.save(author=self.request.user.id)


class DashboardResume(viewsets.ModelViewSet):

    """
    uses to update resume for only runner dashboard
    """

    serializer_class = UserResumeSerializer
    permissions_classes = [IsAuthenticated and IsRunner]

    def get_queryset(self):

        return RunnerResume.objects.filter(author=self.request.user)

    def perform_create(self, serializer):

        serializer.save(author=self.request.user)


class AccountStatus(viewsets.ModelViewSet):

    """
    uses to upload pictures to ui dashboard
    """

    serializer_class = UserOnlineSerializer

    @async_to_sync
    async def get_queryset(self):
        """
        Return a list of all users.
        """

        return AccountUser.objects.all()


class PhotoUpload(viewsets.ModelViewSet):

    """
    uses to upload pictures to ui dashboard
    """

    queryset = Photo.objects.all()
    serializer_class = PhotosSerializer
    permissions_classes = [IsAuthenticated and IsRunner]

    def get_queryset(self):
        if self.request.method == "GET":
            return Photo.objects.all()
        else:
            return Photo.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class VideoUpload(viewsets.ModelViewSet):

    """
    uses to upload video to ui dashboard
    """

    queryset = Vidoe.objects.all()
    serializer_class = VidoesSerializer
    permissions_classes = [IsAuthenticated and IsRunner]


class ReviewView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    #permissions_classes = [IsAuthenticated]


class SearchProfile(viewsets.ModelViewSet):

    """
    uses for search engine for the application
    """

    search_fields = [
        "title",
        "location",
        "salary",
        "postcode",
        "description",
        "state",
        "city",
        "local_goverment_zone",
    ]
    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileSearchSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "title",
        "location",
        "salary",
        "postcode",
        "description",
        "state",
        "city",
        "local_goverment_zone",
    ]

    ordering_fields = "__all__"


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


class UserSearchDetails(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    which include view count for each unique ip
    """

    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileSearchSerializer

    def retrieve(self, request, pk=None):

        ip = get_client_ip(request)
        profile = RunnerProfile.objects.get(author=pk)
        history_tracker(request, profile)
        if IpModel.objects.filter(ip=ip).exists():
            profile.views.add(IpModel.objects.get(ip=ip))
        else:
            IpModel.objects.create(ip=ip)
            profile.views.add(IpModel.objects.get(ip=ip))
        
        queryset = RunnerProfile.objects.get(author_id=pk)
        serializer = UserProfileSearchSerializer(queryset)
        return Response(serializer.data)


class TestView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = RunnerProfile.objects.all()
    serializer_class = UserProfileSearchSerializer


class ActivateAccountView(APIView):
    def get(self, request, uid, token):

        try:
            payload = jwt.decode(token, settings.SECRET_KEY,  algorithms=['HS256'])
            user = AccountUser.objects.get(id=payload['user_id'])
            if not user.is_email_verified:
                user.is_email_verified = True
                user.save()
                return redirect("http://127.0.0.1:3000/react/demo/")
            return redirect("http://127.0.0.1:3000/react/demo/")
        except jwt.ExpiredSignatureError as identifier:
            id = (urlsafe_base64_decode(uid))
            user = AccountUser.objects.get(pk=id)

            if not user.is_email_verified:
                current_site = get_current_site(request)
                send_verify_email(user, current_site, user.email)
                return redirect("http://127.0.0.1:3000/react/demo/")

            else:
                return redirect("http://127.0.0.1:3000/react/demo/")

        except jwt.exceptions.DecodeError as identifier:
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordAccountView(APIView):

    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        """
        use to reset password, are passed as query parameters
        keys:
            - old_password
            - password1
            - password2
        """
        try:
            email = request.user.email
            user = authenticate(email=email, password=request.query_params.get('old_password'))
            password1 = request.query_params.get('password1') 
            password2 = request.query_params.get('password2') 
            if user and password1 and password2:

                if password1 == password2:
                    user = AccountUser.objects.get(email=email)
                    user.set_password(password1)
                    user.save() 
                    return Response({'message': 'Password successfully changed!'}, status=status.HTTP_200_OK)

                else:
                    return Response({'error': 'password doesnt match!'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            return Response({'error': f'{e}'}, status=status.HTTP_400_BAD_REQUEST)



class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def get(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.query_params.get('email')

        if AccountUser.objects.filter(email=email).exists() and email:
            user = AccountUser.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))

            current_site = get_current_site(request)
            send_reset_password_email(user, current_site, user.email, uid)

            return Response({'message': 'Reset link sent, kindly check your email!'}, status=status.HTTP_200_OK)

        else:
            return Response({'message': 'User doesnot exist!'}, status=status.HTTP_400_BAD_REQUEST)


class SetProfilePassword(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    # renderer_classes = [TemplateHTMLRenderer]
    # template_name = 'auth/set-profile-password.html'

    def get(self, request):
        """
        TODO: Use the new link from UI team to redirect to where user can change password
        """
        token=request.query_params.get('token')
        uid=request.query_params.get('uid')
        data = f"?token={token}&uid={uid}"

        response = HttpResponseRedirect("http://127.0.0.1:3000/react/demo/reset-password" + data)
        return response
        #return Response({'message': 'Activation done'}, status=status.HTTP_200_OK)
class ChangeProfilePassword(generics.GenericAPIView):
    """
    Use for changing password for request made via email,
    last stage for password chane for request made vie email.
    """
    serializer_class = SetNewPasswordSerializer

    def get(self, request):

        password1 = request.GET.get('password1')
        password2 = request.GET.get('password2')
        token = request.GET.get('token')
        uid = request.GET.get('uid')

        try:
            
            serializer = self.serializer_class(data=request.data)

            payload = jwt.decode(token, settings.SECRET_KEY,  algorithms=['HS256'])
            user = AccountUser.objects.get(id=payload['user_id'])
   
        except jwt.ExpiredSignatureError as identifier:

            id = (urlsafe_base64_decode(uid))
            user = AccountUser.objects.get(pk=id)
            if user.is_active:
                current_site = get_current_site(request)
                send_reset_password_email(user, current_site, user.email, uid)
            #return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/register")
            return Response({'message': 'check email for new link!'}, status=status.HTTP_400_BAD_REQUEST)
        
        except jwt.exceptions.DecodeError as identifier:
            #return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/register")
            return Response({'message': 'token invalid!'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
            #raise e({"error":"token expired"})
            return Response({'message': 'token expired!'}, status=status.HTTP_400_BAD_REQUEST)
         
        if user is not None and (password1 == password2):

            user.set_password(password1)
            
            user.save()

            """
            use res style to send messages accros for notification
            """
            res = Response({'message': 'Password successfully changed!'}, status=status.HTTP_200_OK)

            return res
      
        else:
            return Response({'message': 'password incorrect!'}, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(APIView):

    def get(self, request, uid, token):

        data = f"?token={token}&uid={uid}"
        try:
            payload = jwt.decode(token, settings.SECRET_KEY,  algorithms=['HS256'])
            response = redirect(reverse('user-reset-password') + data)

            return response

        except jwt.ExpiredSignatureError as identifier:
            
            id = (urlsafe_base64_decode(uid))
            user = AccountUser.objects.get(pk=id)
            if user.is_active:
                current_site = get_current_site(request)
                send_reset_password_email(user, current_site, user.email, uid)
            return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/reset" + data)

        except jwt.exceptions.DecodeError as identifier:

            return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/")

