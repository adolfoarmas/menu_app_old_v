import os
from django.contrib.auth import get_user_model
from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from .models import Dish_Category, Dish

class DishCategoryTests(TestCase):
    "set up data and test models Disc_Category and Dish"
    @classmethod
    def setUpTestData(cls):

        #test image path (str) for dish saved in environment variable TEST_IMAGE_PATH
        test_image_path = os.getenv('TEST_IMAGE_PATH')

        """creating user instance"""
        cls.user = get_user_model().objects.create_user(
            username="testuser",
            email="a@a.com",
            password="secret",
        )

        """creating dish_category instance"""
        cls.dish_category = Dish_Category.objects.create(
            name="Sandwichs",
            description="Soft wheat bread stuffed with extense variety of meats and vegetables you can choose",
            created_by=cls.user,
        )

        """creating dish instance"""
        cls.dish = Dish.objects.create(
            name="Ham & Cheese",
            description="Ham and Cheese toasted sandwich",
            category=cls.dish_category,
            #test image to insert mandatory image field in temporary db
            image= SimpleUploadedFile(name='test_image.jpg', 
                                      content=open(test_image_path+'espresso-11.jpg', 'rb').read(), 
                                      content_type='image/jpg'
                                    ), 
            created_by=cls.user,
            price=7.5,
        )

    def test_dish_category_model(self):
        "testing dish_category model"
        self.assertEqual(self.dish_category.created_by.username, "testuser")
        self.assertEqual(self.dish_category.name, "Sandwichs")
        self.assertEqual(self.dish_category.description, "Soft wheat bread stuffed with extense variety of meats and vegetables you can choose")
        self.assertEqual(str(self.dish_category), "Sandwichs")

    def test_dish(self):
        "testing dish model"
        self.assertEqual(self.dish.created_by.username, "testuser")
        self.assertEqual(self.dish.name, "Ham & Cheese")
        #after testing once, file is saved in indicated path. Following tests will fail with a difference in file name
        self.assertEqual(self.dish.image.name, 'test_image.jpg') 
        #currency field declared in model with 'USD' value as defaul, in cls.dish we did not insert this field. Result should be 'USD'
        self.assertEqual(self.dish.currency, "USD")

