from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import (
    ResetPasswordSerializer,
    EditProfileSerializer,
    SignupSerializer,
    LoginSerializer,
    UserSerializer,
)


class SignupAPI(generics.GenericAPIView):
    serializer_class = SignupSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        user_serializer = UserSerializer(
            user,
            context=self.get_serializer_context(),
        )
        _, token = AuthToken.objects.create(user)
        return Response(
            {
                "user": user_serializer.data,
                "token": token,
            }
        )


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        login(request, user)

        user_serializer = UserSerializer(
            user,
            context=self.get_serializer_context(),
        )
        _, token = AuthToken.objects.create(user)
        return Response(
            {
                "user": user_serializer.data,
                "token": token,
            }
        )


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class EditProfileAPI(generics.UpdateAPIView):
    serializer_class = EditProfileSerializer
    model = User
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = "username"

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        self.object = self.get_object()  # Request HTTP 'Authorization' header
        serializer = self.get_serializer(data=request.data)  # Request body
        if serializer.is_valid():
            verify_password = serializer.data.get("verify_password")
            if not self.object.check_password(verify_password):
                return Response(
                    {"verify_password": ["Wrong password"]},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            for attr in ("username", "email", "first_name", "last_name"):
                default = getattr(self.object, attr)
                value = serializer.data.get(attr, default)
                setattr(self.object, attr, value)

            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordAPI(generics.UpdateAPIView):
    serializer_class = ResetPasswordSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            old_password = serializer.data.get("old_password")
            if not self.object.check_password(old_password):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
