# Generated by Django 4.0 on 2022-09-03 23:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0021_alter_photo_image_alter_projectphoto_image_and_more'),
        ('task', '0028_alter_task_author'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='views',
            field=models.ManyToManyField(blank=True, null=True, related_name='task_views', to='accounts.IpModel'),
        ),
    ]
