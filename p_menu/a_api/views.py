#from django.contrib.auth.models import User
from lib2to3.pgen2.pgen import generate_grammar
from django import views
from a_users.models import UserProfile
from django.http import JsonResponse
from django.shortcuts import render
from a_menu.models import Dish, Dish_Category
from rest_framework import generics, permissions, viewsets, filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .permissions.permissions import IsAuthenticatedUserOrReadOnlyUser, IsAuthenticatedUserOrReadOnlyMenu
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from django.contrib.auth import get_user_model
from django_filters.rest_framework import DjangoFilterBackend

#from rest_framework.settings import api_settings

from a_api.serializers.serializers import UserProfileSerializer

from .serializers.serializers import DishSerializer, DishCategorySerializer

#from django.contrib.auth import logout


# def getRoutes(Request):
    
#     routes = [ {
#             'Endpoint': '/dishes/',
#             'method': 'GET',
#             'body': None,
#             'description': 'Returns an array of restaurant available dishes'
#         },]

#     return JsonResponse(routes, safe=False)

class DishList(generics.ListCreateAPIView):
    queryset = Dish.objects.all()
    serializer_class = DishSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category',]

class DishDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyMenu,)
    queryset = Dish.objects.all()
    serializer_class = DishSerializer

class DishCategoryList(generics.ListCreateAPIView):
    queryset = Dish_Category.objects.all()
    serializer_class = DishCategorySerializer

class DishCategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyMenu,)
    queryset = Dish_Category.objects.all()
    serializer_class = DishCategorySerializer

class UserList(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyUser,)
    queryset = get_user_model().objects.all()
    serializer_class = UserProfileSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (IsAuthenticatedUserOrReadOnlyUser,)
    queryset = get_user_model().objects.all()
    serializer_class = UserProfileSerializer
