# Generated by Django 4.0 on 2022-09-08 02:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0022_remove_accountuser_last_seen'),
        ('task', '0030_alter_task_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='post_status',
            field=models.CharField(choices=[('DRAFT', 'DRAFT'), ('OPEN', 'OPEN'), ('COMPLETED', 'COMPLETED')], default='OPEN', max_length=255),
        ),
        migrations.CreateModel(
            name='BiddersOnTask',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bidder', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='task_profile_bidder', to='accounts.accountuser')),
            ],
        ),
        migrations.AddField(
            model_name='task',
            name='bidders',
            field=models.ManyToManyField(blank=True, related_name='bidders_profile_id', to='task.BiddersOnTask'),
        ),
    ]
