# Generated by Django 4.0 on 2022-01-21 12:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='accountuser',
            options={},
        ),
        migrations.AlterField(
            model_name='accountuser',
            name='phone_number',
            field=models.CharField(max_length=12),
        ),
    ]
