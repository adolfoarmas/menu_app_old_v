#from xml.etree.ElementInclude import include
from django import views
from rest_framework.routers import DefaultRouter
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



from . import views

router = DefaultRouter()
# router.register('dishes', views.DishViewSet)
# router.register('categories', views.DishCategoryList)
# router.register('profile', views.UserProfileViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('login/', views.UserLoginApiView.as_view()),
    path('dishCategory/', views.DishCategoryList.as_view(), name='dish_category-list'),
    path('dishCategory/<int:pk>/', views.DishCategoryDetail.as_view(), name='dish_category-detail'),
    path('dishes/', views.DishList.as_view(), name='dish-list'),
    path('dishes/<int:pk>/', views.DishDetail.as_view(), name='dish-detail'),
    path('auth/', include("dj_rest_auth.urls")),


    # path('users/', views.UserList.as_view()),
    # path('users/<int:pk>/', views.UserDetail.as_view()),
    # path('logout/', views.UserLogoutApiView.as_view()),
 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

print(settings.MEDIA_URL)