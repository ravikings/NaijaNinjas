# Generated by Django 4.0 on 2022-09-13 01:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0034_alter_biddersontask_bidder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskbidder',
            name='total_charge',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
