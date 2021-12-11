from django.db.models import Q
from django.contrib.auth.backends import ModelBackend

from django.contrib.auth import get_user_model


class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        user_model = get_user_model()

        if username is None:
            username = kwargs.get(user_model.USERNAME_FIELD)

        # Filter users that matches either username or email
        users = user_model._default_manager.filter(
            Q(**{user_model.USERNAME_FIELD: username})
            | Q(email__iexact=username)
        )

        # Check for matching every user
        for user in users:
            if user.check_password(password):
                return user

        # Wait to decrease the time difference
        if not users:
            user_model().set_password(password)
