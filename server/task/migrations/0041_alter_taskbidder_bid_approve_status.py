# Generated by Django 4.0 on 2023-02-05 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0040_alter_comment_status_alter_timeline_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskbidder',
            name='bid_approve_status',
            field=models.CharField(choices=[('False', 'False'), ('True', 'True'), ('Reject', 'Reject')], default='False', max_length=255),
        ),
    ]