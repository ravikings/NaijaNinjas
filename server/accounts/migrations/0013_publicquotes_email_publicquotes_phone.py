# Generated by Django 4.0 on 2022-07-22 03:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0012_publicquotes'),
    ]

    operations = [
        migrations.AddField(
            model_name='publicquotes',
            name='email',
            field=models.CharField(max_length=25, null=True),
        ),
        migrations.AddField(
            model_name='publicquotes',
            name='phone',
            field=models.CharField(max_length=15, null=True),
        ),
    ]