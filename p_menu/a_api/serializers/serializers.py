from rest_framework import serializers
from a_menu.models import Dish, Dish_Category
from a_users.models import UserProfile
from drf_extra_fields.fields import Base64ImageField

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ['id', 'email', 'name', 'password',]
        extra_kwargs = {
            'password':{
                'write_only': True,
                'style':{'input_type': 'password',}
            }
        }
    
    def create(self, validated_data):

        user = UserProfile.objects.create_user(
            email = validated_data['email'],
            name = validated_data['name'],
            password=validated_data['password'],
        )

        return user

    def update(self, instance, validated_data):

        if 'password' in validated_data:
            password = validated_data.pop('password')
            instance.set_password(password)
        
        return super().update(instance, validated_data)

class UserTokenSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('email', 'password',)


class UserSerializer(serializers.HyperlinkedModelSerializer):
    
    class Meta:
        model=UserProfile
        fields = ('email', 'name', 'is_active', )


# class DishSerializer(serializers.HyperlinkedModelSerializer):
    
#     created_by = serializers.ReadOnlyField(source='UserProfile.name')
#     category = serializers.HyperlinkedRelatedField(many=False, view_name='dish_category-detail', read_only=True)
#     image = Base64ImageField(required=False)
 
#     class Meta:
#         model = Dish
#         fields = (
#             'id',
#             'url',
#             'name',
#             'created_by',
#             'description',
#             'category',
#             'observation',
#             'image',
#             'price',
#             'currency',
#             )

#     def get_image(self, dish):
#         request = self.context.get('request')
#         image = dish.image.url
#         return request.build_absolute_uri(image)


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dish
        fields = ['name', 'description', 'date', 'category', 'observation', 'image', 'created_by', 'price', 'currency']


class DishCategorySerializer(serializers.ModelSerializer):
    
    #created_by = serializers.ReadOnlyField(source='UserProfile.name')
    #dishes = serializers.HyperlinkedRelatedField(many=True, view_name='dishes-detail', read_only=True)

    class Meta:
        model = Dish_Category
        fields = ['id', 'url', 'name','description', 'created_by',]

    # def to_representation(self, instance):

    #     dishes = Dish.objects.filter(category=instance.id)
    #     dishes_values = dishes.values()
    #     images_url = [dish.image.url for dish in dishes]
    #     print(repr([dish.image for dish in dishes]))
    #     for i, dish_value in enumerate(dishes_values):
    #         dish_value['image'] = images_url[i]


    #     return {
    #         'id': instance.id,
    #         'name': instance.name,
    #         'description': instance.description,
    #         'created_by': instance.created_by.name,
    #         'dishes': dishes_values,
    #     }