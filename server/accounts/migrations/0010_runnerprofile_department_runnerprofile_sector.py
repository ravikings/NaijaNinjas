# Generated by Django 4.0 on 2022-05-01 19:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0009_service'),
    ]

    operations = [
        migrations.AddField(
            model_name='runnerprofile',
            name='department',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='runnerprofile',
            name='sector',
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
    ]
