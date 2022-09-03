# Generated by Django 4.0 on 2022-08-31 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0026_remove_taskbidder_image_taskbidder_attachment'),
    ]

    operations = [
        migrations.RenameField(
            model_name='taskbidder',
            old_name='offer_charge',
            new_name='total_charge',
        ),
        migrations.AlterField(
            model_name='taskbidder',
            name='delivery_date',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
