# Generated by Django 4.0 on 2022-01-05 02:41

import ckeditor.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Forum',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, db_index=True, max_length=255)),
                ('body', ckeditor.fields.RichTextField(db_index=True)),
                ('tags', models.CharField(blank=True, db_index=True, max_length=255)),
                ('category', models.CharField(blank=True, db_index=True, max_length=255)),
                ('attachment', models.FileField(blank=True, upload_to='forum/documents/%Y/%m/%d/')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='authorforum', to='accounts.accountuser')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
    ]
