# Generated by Django 4.0.5 on 2022-08-05 19:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('a_menu', '0005_alter_dish_created_by'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='dish_category',
            options={'verbose_name': 'Dish Category', 'verbose_name_plural': 'Dish Categories'},
        ),
        migrations.AlterUniqueTogether(
            name='dish',
            unique_together={('name', 'category')},
        ),
    ]