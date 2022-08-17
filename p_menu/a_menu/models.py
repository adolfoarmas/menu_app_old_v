from math import degrees
from unittest.util import _MAX_LENGTH
from django.db import models
from django.utils import timezone
from a_users.models import UserProfile
from django.urls import reverse
from pkg_resources import require
from PIL import Image



# Create your models here.
class Dish_Category(models.Model):
    """
    This model represents the Dish category
    """
    name = models.CharField(max_length=20, blank=True, unique=True)
    description = models.CharField(max_length=50, blank=True)
    created_by = models.ForeignKey(UserProfile, default='4', on_delete=models.SET_DEFAULT)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = ('Dish Category')
        verbose_name_plural = ('Dish Categories')
        

    def get_related_dishes(self):
        return 
        ...


# class DishManager(models.Manager):
#     def get_dishes_by_category(self):
#         dishes = Dish.objects.all()
#         dishes_by_category = dishes.category.all()
#         return dishes_by_category


class Dish(models.Model):
    """
    Dishes registered by restorant allowed users are represented by this model
    """
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(max_length=200)
    date = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey(Dish_Category, on_delete=models.CASCADE)
    observation = models.TextField(blank=True)
    image = models.ImageField()
    created_by = models.ForeignKey(UserProfile, default='4', on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    currency = models.CharField(default='USD', max_length=3)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('', kwargs={'pk': self.pk})  

    def save(self, *args, **kwargs):
        print(kwargs)
        super().save(*args, **kwargs)
        force_height = 150
        force_width = 150
        img = Image.open(self.image.path)
        if img.height > force_height or img.width > force_width:
            output_size = (force_height,force_width)
            img.thumbnail(output_size)
            img.save(self.image.path)

    class Meta:
        verbose_name_plural = ('Dishes')




