from signal import strsignal
from rest_framework import viewsets, generics
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.shortcuts import redirect, get_object_or_404, reverse
from django.test import Client
from django.http import HttpResponse, HttpResponseRedirect
from django.core.exceptions import PermissionDenied, ValidationError
from django.contrib import messages
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from accounts.permissions import IsRunner
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from history.signals import history_tracker
from django.utils.encoding import force_bytes, force_str, smart_bytes
from rest_framework.renderers import TemplateHTMLRenderer
import jwt
import re
from django.db import transaction
from accounts.permissions import IsOwner
from .utilis import (
    get_token,
    send_verify_email,
    send_reset_password_email,
    send_successfully_change_password_email,
    generate_token,
)
from rest_framework import status
from django.conf import settings
from django.contrib.auth import authenticate
from asgiref.sync import sync_to_async
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from rest_framework.parsers import MultiPartParser, FormParser
from .models import (
    AccountUser,
    Photo,
    Vidoe,
    RunnerProfile,
    RunnerResume,
    Review,
    IpModel,
    Service,
    Projects,
    ProjectPhoto,
    PublicQuotes,
    ClientReview,
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
    ServiceSerializer,
    ProfileSerializerWithResume,
    ProjectsSerializer,
    ProjectPhotoSerializer,
    PublicQuotesSerializer,
    BiddersProfileSerializer,
    PublicProfileSerializer,
    ClientReviewSerializer,
    PrivateProfileSerializer,
    ChatSearchProfileSerializer,
    UserSerializer,
)
from notifications.signals import notify
from rest_framework.authentication import TokenAuthentication
from durin.auth import TokenAuthentication as DurinTokenAuthentication
from durin.models import AuthToken, Client as DurinClient
from zappa.asynchronous import task as async_task


# @method_decorator(cache_page(60 * 15), name="dispatch")
class DashboardProfile(viewsets.ModelViewSet):

    """
    dashboard serializers use for entry data for getting data to the ui
    """

    http_method_names = ["get"]
    # permission_classes = [IsAuthenticated and IsOwner]
    authentication_classes = (AllowAny,)
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return RunnerProfile.objects.filter(author_id=self.request.user.id)

    def get_permissions(self):
        if self.action in ["list"]:
            return [IsAdminUser()]
        else:
            return [AllowAny()]

    def retrieve(self, request, pk=None):

        data = RunnerProfile.objects.get_or_create(author_id=pk)
        serializer = ProfileSerializer(data[0])
        return Response(serializer.data)


class RelatedProfile(viewsets.ModelViewSet):

    """
    this is use for searching related profiles,
    query parameters to be passed will be from current page data,
    sector, department, city, id

    """

    authentication_classes = (DurinTokenAuthentication,)
    serializer_class = ProfileSerializer

    def get_queryset(self):

        sector = self.request.query_params.get("sector", None)
        department = self.request.query_params.get("department", None)
        city = self.request.query_params.get("city", None)
        id = self.request.query_params.get("id", None)
        queryset = (
            RunnerProfile.objects.select_related("author")
            .filter(
                author__is_a_runner=True,
                sector=sector,
                department=department,
                city=city,
            )
            .exclude(id=id)
        )

        return queryset


# @method_decorator(cache_page(60 * 60), name="dispatch")
class UserDashboardProfile(viewsets.ModelViewSet):

    """
    dashboard serializers use for entry data for getting data to the ui
    """

    authentication_classes = (DurinTokenAuthentication,)
    queryset = RunnerProfile.objects.all()
    serializer_class = PublicProfileSerializer

    def get_permissions(self):
        if self.action in ["list"]:
            return [IsAdminUser()]
        else:
            return [IsAuthenticated(), IsOwner()]

    def retrieve(self, request, pk=None):

        obj, data = RunnerProfile.objects.get_or_create(author_id=pk)
        # user = AccountUser.objects.get(id=pk)
        # recipient = AccountUser.objects.get(id=41)
        # print("im sending notification dashboard")
        # notify.send(user,recipient=recipient, verb='hello come to dashboard')
        if request.user.id == obj.author.id:

            serializer = PrivateProfileSerializer(obj)
            return Response(serializer.data)

        return Response(
            {"detail": "Permission deniied."}, status=status.HTTP_400_BAD_REQUEST
        )


def save_user_profile(profile, request):
    serializer = ProfileSerializer(instance=profile, data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response({"message": f"profile updated"})


@api_view(["POST", "PATCH"])
@authentication_classes([DurinTokenAuthentication])
def taskUpdate(request, pk):
    profile = RunnerProfile.objects.filter(author_id=pk)
    if profile.exists():
        print("found user, updating profile")
        save_user_profile(profile, request)

    else:
        print("profile not found, creating new user")
        profile = RunnerProfile.objects.create(author_id=pk)
        save_user_profile(profile, request)

    return Response({"error": f"Operation failed"}, status=status.HTTP_400_BAD_REQUEST)


# @method_decorator(cache_page(60 * 15), name="dispatch")
class DashboardResume(viewsets.ModelViewSet):

    """
    uses to update resume for only runner dashboard
    """

    permission_classes = [IsAuthenticated and IsOwner and IsRunner]
    authentication_classes = (DurinTokenAuthentication,)
    queryset = RunnerResume.objects.all()
    serializer_class = UserResumeSerializer
    # TODO: uncomment below

    def retrieve(self, request, pk=None):

        data = RunnerResume.objects.get_or_create(author_id=pk)
        serializer = UserResumeSerializer(data[0])
        return Response(serializer.data)


class UserDashboardResume(viewsets.ModelViewSet):

    """
    uses to viewing resume for only runner dashboard
    """

    permission_classes = [IsAuthenticated and IsOwner and IsRunner]
    authentication_classes = (DurinTokenAuthentication,)
    queryset = RunnerResume.objects.all()
    serializer_class = UserResumeSerializer

    def retrieve(self, request, pk=None):

        data = RunnerResume.objects.get_or_create(author_id=pk)
        serializer = UserResumeSerializer(data[0])
        return Response(serializer.data)


def save_profile_resume(resume, request):
    serializer = UserResumeSerializer(instance=resume, data=request.data)
    if serializer.is_valid():
        serializer.save()

        return Response({"message": f"resume updated"})


@api_view(["POST", "PATCH"])
@permission_classes([IsAuthenticated and IsOwner and IsRunner])
@authentication_classes([DurinTokenAuthentication])
def resumeUpdate(request, pk):
    resume = RunnerResume.objects.filter(author_id=pk)
    if resume.exists():
        print("found user, updating resume")
        save_profile_resume(resume, request)

    else:
        print("resume not found, creating resume for profile")
        resume = RunnerResume.objects.create(author_id=pk)
        save_profile_resume(resume, request)

    return Response({"error": f"Operation failed"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated and IsOwner])
@authentication_classes([DurinTokenAuthentication, TokenAuthentication])
def account_status(request, pk, type):

    """
    uses to upload pictures to ui dashboard.
    """
    obj, created = RunnerProfile.objects.get_or_create(
        author=request.user
    )  # TODO: CHANGE TO REQUEST
    obj.set_online_status(str(type).upper())  # pass type, either login or logout
    return Response({"message": f"status updated to {type}"})


@api_view(["POST"])
@authentication_classes([DurinTokenAuthentication, TokenAuthentication])
@api_view(["POST", "GET"])
@permission_classes([IsAuthenticated and IsOwner and IsRunner])
@authentication_classes([DurinTokenAuthentication])
def profile_mode_status(request, pk, type):

    """
    uses to upload pictures to ui dashboard.
    """
    queryset = RunnerProfile.objects.get(author=pk)  # TODO: CHANGE TO REQUEST
    queryset.private_mode(type)
    serializer = ProfileSerializer(queryset)
    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([DurinTokenAuthentication])
def verify_during_token(request):

    return Response({"message": f"token is active"})


# @method_decorator(cache_page(60 * 15), name="dispatch")
class PhotoUpload(viewsets.ModelViewSet):

    """
    uses to upload pictures to ui dashboard
    """

    queryset = Photo.objects.all()
    serializer_class = PhotosSerializer
    permissions_classes = [IsAuthenticated and IsOwner]
    authentication_classes = (DurinTokenAuthentication,)

    def get_queryset(self):
        if self.request.method == "GET":
            return Photo.objects.all()
        else:
            return Photo.objects.filter(author=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class VideoUpload(viewsets.ModelViewSet):

    """
    uses to upload video to ui dashboard
    """

    queryset = Vidoe.objects.all()
    serializer_class = VidoesSerializer
    permissions_classes = [IsAuthenticated and IsRunner]
    authentication_classes = (DurinTokenAuthentication,)


class ProjectsViewSet(viewsets.ModelViewSet):

    """
    uses to upload video to ui dashboard
    """

    queryset = Projects.objects.all()
    serializer_class = ProjectsSerializer
    permissions_classes = [IsAuthenticated and IsOwner and IsRunner]
    authentication_classes = (DurinTokenAuthentication,)

    # def get_queryset(self):

    #     user_id = self.request.query_params.get("user_id")

    #     return Projects.objects.filter(author=user_id)


@api_view(["GET"])
def public_project_viewset(request, pk):

    query = Projects.objects.filter(author=pk)
    data = ProjectsSerializer(query, many=True).data
    return Response(data, status=status.HTTP_200_OK)


# @method_decorator(cache_page(60 * 15), name="dispatch")
class ReviewView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permissions_classes = [IsAuthenticated, IsOwner]
    authentication_classes = (DurinTokenAuthentication,)

    # def get_queryset(self):

    #     return Review.objects.filter(profile=self.request.user.id)


class ClientReviewView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = ClientReview.objects.all()
    serializer_class = ClientReviewSerializer
    authentication_classes = (DurinTokenAuthentication,)
    permissions_classes = [IsAuthenticated and IsOwner]


# @method_decorator(cache_page(60 * 15), name="dispatch")
class SearchProfile(viewsets.ModelViewSet):

    """
    uses for search engine for the application
    """

    search_fields = [
        "first_name",
        "last_name",
        "address",
        "title",
        "location",
        "salary",
        "postcode",
        "description",
        "state",
        "city",
        "sector",
        "department",
        "postcode",
        "local_goverment_zone",
    ]
    queryset = RunnerProfile.objects.select_related("author").filter(
        author__is_a_runner=True
    )
    serializer_class = ProfileSerializerWithResume
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = [
        "first_name",
        "last_name",
        "title",
        "location",
        "salary",
        "sector",
        "department",
        "postcode",
        "postcode",
        "description",
        "state",
        "city",
        "local_goverment_zone",
    ]

    ordering_fields = "__all__"


# @method_decorator(cache_page(60 * 15), name="dispatch")
class ChatSearchProfile(viewsets.ModelViewSet):

    """
    uses for search engine for the application
    """

    search_fields = [
        "first_name",
        "last_name",
    ]
    queryset = RunnerProfile.objects.select_related("author").filter(
        author__is_a_runner=True
    )
    serializer_class = ChatSearchProfileSerializer
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = ["first_name", "last_name", "department", "sector"]

    ordering_fields = "__all__"


def get_client_ip(request):
    x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
    if x_forwarded_for:
        ip = x_forwarded_for.split(",")[0]
    else:
        ip = request.META.get("REMOTE_ADDR")
    return ip


# @method_decorator(cache_page(60 * 15), name="dispatch")
class UserSearchDetails(viewsets.ModelViewSet):
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

        serializer = UserProfileSearchSerializer(profile)
        return Response(serializer.data)


class DashboardServiceView(viewsets.ModelViewSet):

    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permissions_classes = [IsAuthenticated and IsOwner and IsRunner]
    authentication_classes = (DurinTokenAuthentication,)


# @method_decorator(cache_page(60 * 15), name="dispatch")
class ServiceView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    serializer_class = ServiceSerializer
    authentication_classes = (DurinTokenAuthentication,)
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        user_id = self.request.query_params.get("user_id")

        return Service.objects.filter(author=user_id)


class PrivateServiceView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    serializer_class = ServiceSerializer
    authentication_classes = (DurinTokenAuthentication,)
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        user_id = self.request.query_params.get("user_id")

        return Service.objects.filter(author=user_id)


class TestView(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    queryset = RunnerProfile.objects.select_related("author").filter(
        author__is_a_runner=True
    )
    serializer_class = ProfileSerializerWithResume

    def retrieve(self, request, pk=None):

        data = RunnerProfile.objects.get(author=pk)
        serializer = ProfileSerializerWithResume(data)
        return Response(serializer.data)


class ActivateAccountView(APIView):
    def get(self, request, uid, token):

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = AccountUser.objects.get(id=payload["user_id"])
            if not user.is_email_verified:
                user.is_email_verified = True
                user.save()
                return redirect("http://127.0.0.1:3000/react/demo/")
            return redirect("http://127.0.0.1:3000/react/demo/")
        except jwt.ExpiredSignatureError as identifier:
            id = urlsafe_base64_decode(uid)
            user = AccountUser.objects.get(pk=id)

            if not user.is_email_verified:
                current_site = get_current_site(request)
                send_verify_email(user, current_site, user.email, id)
                return redirect("http://127.0.0.1:3000/react/demo/")

            else:
                return redirect("http://127.0.0.1:3000/react/demo/")

        except jwt.exceptions.DecodeError as identifier:
            return redirect("http://127.0.0.1:3000/react/demo/")
            # return Response(
            #     {"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            # )


class ChangePasswordAccountView(APIView):

    permission_classes = [IsAuthenticated]
    authentication_classes = (DurinTokenAuthentication,)

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
            user = authenticate(
                email=email, password=request.query_params.get("old_password")
            )
            password1 = request.query_params.get("password1")
            password2 = request.query_params.get("password2")
            if user and password1 and password2:

                if password1 == password2:
                    user = AccountUser.objects.get(email=email)
                    user.set_password(password1)
                    user.save()
                    return Response(
                        {"message": "Password successfully changed!"},
                        status=status.HTTP_200_OK,
                    )

                else:
                    return Response(
                        {"error": "password doesnt match!"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

        except Exception as e:
            return Response({"error": f"{e}"}, status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def get(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.query_params.get("email")

        if AccountUser.objects.filter(email=email).exists() and email:
            user = AccountUser.objects.get(email=email)
            uid = urlsafe_base64_encode(force_bytes(user.id))

            current_site = get_current_site(request)
            send_reset_password_email(user, current_site, user.email, uid)

            return Response(
                {"message": "Reset link sent, kindly check your email!"},
                status=status.HTTP_200_OK,
            )

        else:
            return Response(
                {"message": "User doesnot exist!"}, status=status.HTTP_400_BAD_REQUEST
            )


class SetProfilePassword(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    # renderer_classes = [TemplateHTMLRenderer]
    # template_name = 'auth/set-profile-password.html'

    def get(self, request):
        """
        TODO: Use the new link from UI team to redirect to where user can change password
        """
        token = request.query_params.get("token")
        uid = request.query_params.get("uid")
        data = f"?token={token}&uid={uid}"

        response = HttpResponseRedirect(
            "http://127.0.0.1:3000/react/demo/reset-password" + data
        )
        return response
        # return Response({'message': 'Activation done'}, status=status.HTTP_200_OK)


class ChangeProfilePassword(generics.GenericAPIView):
    """
    Use for changing password for request made via email,
    last stage for password chane for request made vie email.
    """

    serializer_class = SetNewPasswordSerializer

    def get(self, request):

        password1 = request.GET.get("password1")
        password2 = request.GET.get("password2")
        token = request.GET.get("token")
        uid = request.GET.get("uid")

        try:

            serializer = self.serializer_class(data=request.data)

            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = AccountUser.objects.get(id=payload["user_id"])

        except jwt.ExpiredSignatureError as identifier:

            id = urlsafe_base64_decode(uid)
            user = AccountUser.objects.get(pk=id)
            if user.is_active:
                current_site = get_current_site(request)
                send_reset_password_email(user, current_site, user.email, uid)
            # return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/register")
            return Response(
                {"message": "check email for new link!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except jwt.exceptions.DecodeError as identifier:
            # return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/register")
            return Response(
                {"message": "token invalid!"}, status=status.HTTP_400_BAD_REQUEST
            )

        except Exception as e:
            # raise e({"error":"token expired"})
            return Response(
                {"message": "token expired!"}, status=status.HTTP_400_BAD_REQUEST
            )

        if user is not None and (password1 == password2):

            user.set_password(password1)

            user.save()

            """
            use res style to send messages accros for notification
            """
            res = Response(
                {"message": "Password successfully changed!"}, status=status.HTTP_200_OK
            )

            return res

        else:
            return Response(
                {"message": "password incorrect!"}, status=status.HTTP_400_BAD_REQUEST
            )


class SetNewPasswordAPIView(APIView):
    def get(self, request, uid, token):

        data = f"?token={token}&uid={uid}"
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            response = redirect(reverse("user-reset-password") + data)

            return response

        except jwt.ExpiredSignatureError as identifier:

            id = urlsafe_base64_decode(uid)
            user = AccountUser.objects.get(pk=id)
            if user.is_active:
                current_site = get_current_site(request)
                send_reset_password_email(user, current_site, user.email, uid)
            return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/reset" + data)

        except jwt.exceptions.DecodeError as identifier:

            return HttpResponseRedirect("http://127.0.0.1:3000/react/demo/")


class ProjectImageAPIView(viewsets.ModelViewSet):

    """
    this requires form data field
    title, description, author
    image for image files to upload

    """

    queryset = ProjectPhoto.objects.all()
    serializer_class = ProjectPhotoSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, pk=None):

        title = request.data["title"]
        description = request.data["description"]
        author_id = request.data["author"]
        user_info = AccountUser.objects.get(id=author_id)

        try:
            id = request.data["id"]
            project = Projects.objects.get(id=id, author=user_info)
            project.title = title
            project.description = description
            project.save()
        except:
            project = Projects.objects.create(
                author=user_info, title=title, description=description
            )

        form_data = {}
        form_data["project"] = project.id
        success = True
        response = []

        for images in request.FILES.getlist("image"):
            form_data["image"] = images
            print
            serializer = ProjectPhotoSerializer(data=form_data)
            if serializer.is_valid():
                serializer.save()
                response.append(serializer.data)
            else:
                success = False
        if success:
            return Response(
                {"message": f"action completed successfull! {response}"},
                status=status.HTTP_201_CREATED,
            )

        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class DeleteProjectReview(viewsets.ModelViewSet):

    """
    uses to delete images attached to projects
    """

    authentication_classes = [DurinTokenAuthentication]
    permissions_classes = IsAuthenticated  # [IsAuthenticated and IsOwner]
    queryset = ProjectPhoto.objects.all()
    serializer_class = ProjectPhotoSerializer


@api_view(["GET", "POST"])
def delete_projects(request, pk):
    try:
        query = Projects.objects.get(pk=pk)
        query.delete()
        photo = ProjectPhoto.objects.filter(project=pk)
        photo.delete()
        return Response({"message": f"project deletion was successfull!"})

    except:
        return Response(
            {"error": f"Record doesn't exists"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
def public_quotes(request):

    description = request.query_params.get("description", None)
    department = request.query_params.get("department", None)
    sector = request.query_params.get("sector", None)
    location = request.query_params.get("location", None)
    first_name = request.query_params.get("first_name", None)
    last_name = request.query_params.get("last_name", None)
    phone = request.query_params.get("phone", None)
    email = request.query_params.get("email", None)

    try:
        PublicQuotes.objects.create(
            description=description,
            department=department,
            sector=sector,
            location=location,
            first_name=first_name,
            last_name=last_name,
            phone=phone,
            email=email,
        )
        return Response({"message": f"request submitted!"})
    except Exception as e:
        print(e)
        pass
    return Response(
        {"error": f"request not completed"}, status=status.HTTP_400_BAD_REQUEST
    )


@api_view(["POST", "GET"])
@authentication_classes([DurinTokenAuthentication])
@permission_classes([IsAuthenticated])
def profile_favorite(request, pk):

    profile = get_object_or_404(RunnerProfile, author=pk)
    user = request.user.id
    if profile.bookmarks.filter(id=user).exists():
        profile.bookmarks.remove(user)
        return Response({"message": f"profile {user} removed"})
    profile.bookmarks.add(user)
    return Response({"message": f"profile {user} added"})


class DashboardProfileFavorite(viewsets.ModelViewSet):

    """
    uses to add review to profile
    """

    serializer_class = BiddersProfileSerializer
    # permissions_classes = [IsAuthenticated and IsOwner]

    def get_queryset(self):

        return RunnerProfile.objects.filter(
            author__in=RunnerProfile.objects.filter(
                author_id=self.request.user.id
            ).values_list("bookmarks")
        )


class MFATokenVerify(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication,)

    def post(self, request, *args, **kwargs):
        client_param = request.data.get("client", None)
        if not client_param:
            return Response({"Error": "client required"}, status=400)
        data = UserSerializer(request.user).data
        client = get_object_or_404(DurinClient, name=client_param)
        token_created, token_obj = AuthToken.objects.get_or_create(
            user=request.user, client=client
        )
        data["access_token"] = token_created.token
        return Response(data)


# Define a function for
# for validating an Email
def check_email(email):

    if not email:
        return False
    # Make a regular expression
    # for validating an Email
    regex = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"

    # pass the regular expression
    # and the string into the fullmatch() method
    if re.fullmatch(regex, email):
        return True

    return False


def check_passowrd(password):

    if not password:
        return False

    # passwd = 'Geek12@'
    reg = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,20}$"

    # compiling regex
    pat = re.compile(reg)

    # searching regex
    mat = re.search(pat, password)

    # validating conditions
    if mat:
        return True

    return False


@async_task
def send_singup_email(token, domain, email, uid):
    print("calling zappa send sign up email")
    # TODO Create a task to send email here
    # current_site = get_current_site(request)
    print(token, domain, email, uid)
    # uid = urlsafe_base64_encode(force_bytes(id))
    # send_verify_email(token, domain, email, uid)
    print("sent sign up email")


@api_view(["POST"])
@permission_classes([AllowAny])
@transaction.atomic
def durinSingUp(request):

    """
    uses to update user pro status
    query params: username, password, client
    """

    email = request.data.get("username")
    password = request.data.get("password")
    client = request.data.get("client")
    is_a_runner = request.data.get("is_a_runner")
    string_to_boolean = {"true": True, "false": False}
    data = {}
    if not check_email(email):
        return Response(
            {"error": "invalid email address"}, status=status.HTTP_400_BAD_REQUEST
        )
    if not check_passowrd(password):
        return Response(
            {"error": "invalid password"}, status=status.HTTP_400_BAD_REQUEST
        )
    check_user = AccountUser.objects.filter(email=email)
    if check_user.exists():
        return Response(
            {"error": "user already exist!"}, status=status.HTTP_400_BAD_REQUEST
        )

    user = AccountUser.objects.create(
        username=email,
        email=email,
        is_a_runner=string_to_boolean.get(is_a_runner, False),
    )
    user.set_password(password)
    user.save()

    token = str(get_token(user))
    domain = get_current_site(request).domain

    data["user"] = UserSerializer(user).data
    url = reverse("durin_login")
    c = Client()
    response = c.post(url, {"username": email, "password": password, "client": client})
    send_verify_email(str(token), domain, user.email, user.pk)
    data.update(response.data)
    return Response(data)


# @transaction.atomic
@api_view(["POST"])
@authentication_classes([DurinTokenAuthentication])
@permission_classes([IsAuthenticated and IsOwner])
def switch_to_pro(request):
    """
    uses to update user pro status
    query params: is_pro
    input value: ["true" or "false"]
    """
    is_pro = request.query_params.get("is_pro", False)
    str_to_bool = {"true": True}
    account_info = get_object_or_404(AccountUser, id=request.user.id)
    status = str_to_bool.get(is_pro, False)
    account_info.is_a_runner = status
    account_info.save()
    data = UserSerializer(account_info).data
    return Response(
        {"message": f"user's pro status was updated to {status}", "user_data": data}
    )


@async_task
def help_me(data):
    print("hello my word", data)


@api_view(["GET"])
def passwordless_login(request):
    account_info = get_object_or_404(AccountUser, id=1)
    token = str(get_token(account_info))
    domain = get_current_site(request).domain
    send_verify_email(str(token), domain, account_info.email, account_info.id)
    return Response({"message": f"user's pro status was updated to test"})
