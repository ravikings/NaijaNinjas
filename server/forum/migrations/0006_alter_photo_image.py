# Generated by Django 4.0 on 2022-05-14 02:05

from django.db import migrations, models
import forum.models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0005_photo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='image',
            field=models.ImageField(upload_to=forum.models.upload_to),
        ),
    ]
