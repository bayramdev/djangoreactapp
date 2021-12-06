from django.contrib.auth import login
from django.contrib.auth.models import User
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from knox.models import AuthToken
from rest_framework.views import APIView
from .serializers import (
    ResetPasswordSerializer,
    EditProfileSerializer,
    SignupSerializer,
    LoginSerializer,
    UserSerializer,
)
from authentication import serializers


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

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = EditProfileSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.data.get("password")
            if not self.object.check_password(password):
                return Response(
                    {"password": ["Wrong password."]},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            serializer.save()
            return Response(serializer.data)
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
