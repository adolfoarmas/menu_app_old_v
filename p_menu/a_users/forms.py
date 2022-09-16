from statistics import mode
from unittest import mock
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import UserProfile

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = UserProfile
        fields = UserCreationForm.Meta.fields + ("email", "username","is_active","is_staff",)

class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = UserProfile
        fields = UserChangeForm.Meta.fields