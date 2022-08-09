# Generated by Django 4.0 on 2022-08-08 06:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0014_runnerprofile_bookmarks'),
        ('task', '0016_taskbidder_transaction_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='task',
            name='bookmarks',
        ),
        migrations.CreateModel(
            name='TaskBookmarks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='task_bookmarks_author', to='accounts.accountuser')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='task.task')),
            ],
        ),
    ]