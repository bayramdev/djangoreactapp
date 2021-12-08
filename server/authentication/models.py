from django.contrib.auth.base_user import BaseUserManager
from django.db.models import fields
from django.core.validators import RegexValidator


class CustomUser(BaseUserManager):
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
        unique=True,
    )
    email = fields.EmailField(unique=True)
