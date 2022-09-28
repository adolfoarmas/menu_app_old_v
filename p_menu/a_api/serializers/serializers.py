from rest_framework import serializers
from a_menu.models import Dish, Dish_Category
from django.contrib.auth import get_user_model
from a_users.models import UserProfile
from drf_extra_fields.fields import Base64ImageField


class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model= get_user_model()
        fields = ('email', 'username', 'name', 'is_active', 'is_staff' )


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['name', 'description', 'date', 'category', 'observation', 'image', 'created_by', 'price', 'currency']


class DishCategorySerializer(serializers.ModelSerializer):
    created_by = serializers.HyperlinkedRelatedField(
        many=False,
        view_name='user-detail',
        queryset=get_user_model().objects.all() #provide queryset argument when we need the hyperlinkedrelatedfield to be writable
        )

    dishes = serializers.HyperlinkedRelatedField(many=True, view_name='dish-detail', read_only=True)

    class Meta:
        model = Dish_Category
        fields = ['id', 'url', 'name','description', 'created_by', 'dishes']