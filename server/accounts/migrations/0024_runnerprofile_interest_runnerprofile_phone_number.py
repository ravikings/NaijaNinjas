# Generated by Django 4.0 on 2023-02-09 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0023_clientreview_task_review_task'),
    ]

    operations = [
        migrations.AddField(
            model_name='runnerprofile',
            name='interest',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='runnerprofile',
            name='phone_number',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
    ]