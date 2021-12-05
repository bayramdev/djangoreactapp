from django.contrib.auth import login
from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import SignupSerializer, LoginSerializer, UserSerializer


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
