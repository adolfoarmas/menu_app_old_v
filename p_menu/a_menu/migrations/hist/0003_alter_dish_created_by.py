# Generated by Django 4.0.5 on 2022-07-19 03:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('a_menu', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dish',
            name='created_by',
            field=models.ForeignKey(default='4', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
