from django.urls import path, include
from .views import EditProfileAPI, LoginAPI, SignupAPI, UserAPI, ResetPasswordAPI
from knox import views as knox_views

urlpatterns = [
    path("/", include("knox.urls")),
    path("signup/", SignupAPI.as_view()),
    path("login/", LoginAPI.as_view()),
    path("user/", UserAPI.as_view()),
    path("edit_profile/", EditProfileAPI.as_view()),
    path("reset_password/", ResetPasswordAPI.as_view()),
    path("logout/", knox_views.LogoutView.as_view(), name="knox_logout"),
]
