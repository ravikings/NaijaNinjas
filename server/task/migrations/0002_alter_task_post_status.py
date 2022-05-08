# Generated by Django 4.0 on 2022-05-05 20:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='post_status',
            field=models.CharField(choices=[('Open', 'Accepting offers'), ('Assigned', 'Task assigned to a pro'), ('Completed', 'Task completed!')], default='open', max_length=255),
        ),
    ]