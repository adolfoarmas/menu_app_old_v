from wsgiref import validate
from rest_framework import serializers
from a_menu.models import Dish
from a_users.models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {
            'password':{
                'write_only': True,
                'style':{'input_stype': 'password',}

            }
        }
    
    def create(self, validated_data):

        user = UserProfile.objects.create_user(
            email = validated_data['email'],
            username = validated_data['username'],
            password=validated_data['password'],
        )

        return user

    def update(self, instance, validated_data):

        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        return super().update(instance, validated_data)




class DishSerializer(serializers.ModelSerializer):

    #created_by = serializers.ReadOnlyField(source='created_by.username')

    class Meta:
        model = Dish
        fields = '__all__'
