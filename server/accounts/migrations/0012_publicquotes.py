# Generated by Django 4.0 on 2022-07-22 02:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0011_remove_accountuser_login_tracker_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PublicQuotes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('department', models.CharField(max_length=250)),
                ('sector', models.CharField(max_length=250)),
                ('location', models.CharField(db_index=True, max_length=250, null=True)),
                ('first_name', models.CharField(db_index=True, max_length=250, null=True)),
                ('last_name', models.CharField(db_index=True, max_length=250, null=True)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
    ]
