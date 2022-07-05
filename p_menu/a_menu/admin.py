from django.contrib import admin

from a_menu.models import Dish, Dish_Category

# Register your models here.
admin.site.register(Dish)
admin.site.register(Dish_Category)