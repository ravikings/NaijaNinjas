# Generated by Django 4.0 on 2022-08-22 03:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0021_taskbidder_webhook_transaction_verified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='taskbidder',
            name='task',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='task_assigned', to='task.task'),
        ),
    ]
