#from xml.etree.ElementInclude import include
from django import views
from rest_framework.routers import DefaultRouter
from django.urls import path, include


from . import views

router = DefaultRouter()
router.register('dishes', views.DishViewSet, basename='dishes')
router.register('profile', views.UserProfileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.UserLoginApiView.as_view()),
    # path('users/', views.UserList.as_view()),
    # path('users/<int:pk>/', views.UserDetail.as_view()),
    # path('logout/', views.UserLogoutApiView.as_view()),

]
