# Generated by Django 4.0 on 2022-09-06 22:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0021_alter_photo_image_alter_projectphoto_image_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='accountuser',
            name='last_seen',
        ),
    ]
