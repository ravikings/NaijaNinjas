# Generated by Django 4.0 on 2022-08-05 21:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('payment', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='transactionlog',
            name='payment_date_time',
        ),
    ]
