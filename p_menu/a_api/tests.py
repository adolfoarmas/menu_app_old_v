from urllib import response
from django.test import TestCase
from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APITestCase

from a_menu.models import Dish_Category

# Create your tests here.

class DishTests(TestCase):

    @classmethod
    def setUpData(cls):
        cls.dish = Dish_Category.objesct.create(
            name = "Burgers",
            description = "Burgers made with the most fresh meal in the zone" ,
            created_by = "aam",
        )
    
    def test_dish_category_listview(self):
        response = self.client.get(reverse("categories"))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Pastas")
        self.assertTemplateNotUsed(response, "category/gategory_list.html")


