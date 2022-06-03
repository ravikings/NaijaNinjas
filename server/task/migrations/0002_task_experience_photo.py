# Generated by Django 4.0 on 2022-06-03 15:44

from django.db import migrations, models
import django.db.models.deletion
import task.models


class Migration(migrations.Migration):

    dependencies = [
        ('task', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='experience',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to=task.models.upload_to)),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task_photos', to='task.task')),
            ],
        ),
    ]
