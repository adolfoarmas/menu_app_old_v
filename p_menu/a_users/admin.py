from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from a_users.models import UserProfile


# Register your models here.
#admin.site.register(UserAdmin)
admin.site.register(UserProfile)
