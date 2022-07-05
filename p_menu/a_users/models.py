import email
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionManager, BaseUserManager, PermissionsMixin


class UserProfileManager(BaseUserManager):
    """ Profle Users Manager """

    def create_user(self, email, username, password=None):
        """ Create new User """

        if not email:
            raise ValueError('Email field is mandatory for new user')
        if not username:
            raise ValueError('username field is mandatory for new user')
        
        email = self.normalize_email(email)

        user = self.model(email=email, username=username)

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, username, password):
        user = self.create_user(email, username, password)

        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)

        return user


class UserProfile(AbstractBaseUser,PermissionsMixin):
    """ Bata Base model for Profiles """
    email = models.EmailField(max_length=255, unique=True)
    username = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= ['username']

    objects = UserProfileManager()
    
    def get_full_name(self):
        return self.username
    
    def get_short_name(self):
        return self.username

    def __str__(self):
        """Representation string of user"""
        return self.email

