# Generated by Django 4.0 on 2022-05-14 02:05

import accounts.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_alter_accountuser_is_online'),
    ]

    operations = [
        migrations.AlterField(
            model_name='service',
            name='display',
            field=models.ImageField(blank=True, upload_to=accounts.models.upload_to),
        ),
    ]
