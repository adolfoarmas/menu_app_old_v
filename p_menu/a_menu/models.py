from email.mime import base
from django.db import models
from django.utils import timezone
from a_users.models import UserProfile
from django.urls import reverse
from PIL import Image
from django.conf import settings
import base64, io
from cloudinary.models import CloudinaryField



# Create your models here.
class DishCategory(models.Model):
    """
    This model represents the Dish category
    """
    name = models.CharField(max_length=20, blank=True, unique=True)
    description = models.CharField(max_length=100, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = ('Dish Category')
        verbose_name_plural = ('Dish Categories')

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
    category = models.ForeignKey(DishCategory, related_name='dishes', on_delete=models.CASCADE)
    observation = models.TextField(blank=True)
    image = models.FileField(upload_to='media')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='created_by', on_delete=models.CASCADE)
    price = models.FloatField(default=0)
    currency = models.CharField(default='USD', max_length=3)


    def get_absolute_url(self):
        return reverse('', kwargs={'pk': self.pk})
   
    @property
    def image_url(self):
        return f"https://res.cloudinary.com/dc3xqdidh/{self.image}"
    
   
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs) # here is why original size image get save
        force_height = 250
        force_width = 250
        img = Image.open(self.image)
        print(self.image)
        if img.height > force_height or img.width > force_width:
            output_size = (force_height,force_width)
            img.thumbnail(output_size)
            print(self.image.__format__)
            img.save(self.image)


    class Meta:
        verbose_name_plural = ('Dishes')

    def __str__(self):
        return self.name
    



