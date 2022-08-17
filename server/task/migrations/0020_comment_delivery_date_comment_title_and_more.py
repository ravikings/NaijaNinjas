# Generated by Django 4.0 on 2022-08-15 18:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0019_remove_taskbidder_transaction_completed_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='delivery_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='comment',
            name='title',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='status',
            field=models.CharField(blank=True, choices=[('CONTRACT', 'CONTRACT'), ('STARTED', 'STARTED'), ('PROGRESS', 'PROGRESS'), ('DELIVERED', 'DELIVERED'), ('CLIENT_REVIEW', 'CLIENT_REVIEW'), ('PRO_REVIEW', 'PRO_REVIEW'), ('APPROVED', 'APPROVED')], max_length=255, null=True),
        ),
    ]