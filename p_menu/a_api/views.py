#from django.contrib.auth.models import User
from django import views
from a_users.models import UserProfile
from django.http import JsonResponse
from django.shortcuts import render
from a_menu.models import Dish, Dish_Category
from rest_framework import status, viewsets, filters
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from .permissions.permissions import UpdateOwnProfile
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings


#from rest_framework.settings import api_settings

from a_api.serializers.serializers import UserProfileSerializer

from .serializers.serializers import DishSerializer, DishCategorySerializer

#from django.contrib.auth import logout


def getRoutes(Request):
    
    routes = [ {
            'Endpoint': '/dishes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of restaurant available dishes'
        },]

    return JsonResponse(routes, safe=False)

class DishViewSet(viewsets.ModelViewSet):

    # authentication_classes = (TokenAuthentication,)
    # permission_classes=(IsAuthenticatedOrReadOnly,)

    queryset = Dish.objects.all().order_by("category")
    serializer_class = DishSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
    # def list(self, request):

    #     queryset = Dish.objects.all().order_by("-category")
    #     serializer = DishSerializer(queryset, many=True)
    #     response = Response(serializer.data, status = status.HTTP_200_OK)
    #     return response
    
    def create(self, request, *args, **kwargs):
        serializer = DishSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = Response(serializer.data, status=status.HTTP_200_OK)
        return response
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class DishCategoryViewSet(viewsets.ModelViewSet):

    queryset = Dish_Category.objects.all()
    serializer_class = DishCategorySerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    
    serializer_class = UserProfileSerializer
    queryset = UserProfile.objects.all()
    #authentication_classes = (TokenAuthentication,)
    permission_classes = (UpdateOwnProfile,)
    filter_backends = (filters.SearchFilter, )
    search_fields = ('username', 'email')

class UserLoginApiView(ObtainAuthToken):
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES