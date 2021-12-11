from django.contrib.auth.models import AbstractUser
from django.db.models import fields
from django.core.validators import RegexValidator
from django.utils.translation import gettext as _
from .managers import CustomAccountManager


class CustomUser(AbstractUser):
    objects = CustomAccountManager()

    username = fields.CharField(
        validators=[
            RegexValidator(
                r"[a-zA-Z\d]+",
                "This field can only include letters and numbers",
            ),
            RegexValidator(
                r".{6,}",
                "This field must be at least 6 characters long",
            ),
        ],
        max_length=42,
        unique=True,
    )
    email = fields.EmailField(_("email address"), max_length=42, unique=True)

    REQUIRED_FIELDS = ["email"]
