# Generated by Django 4.0 on 2022-04-25 16:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_runnerprofile_resumes_runnerresume_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='review',
            name='profile',
        ),
        migrations.AddField(
            model_name='runnerprofile',
            name='reviews',
            field=models.ManyToManyField(blank=True, related_name='buyers_review', to='accounts.Review'),
        ),
        migrations.AlterField(
            model_name='review',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='authorreview', to='accounts.accountuser'),
        ),
    ]