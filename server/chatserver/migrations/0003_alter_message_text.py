# Generated by Django 4.0 on 2022-07-22 02:39

import ckeditor.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chatserver', '0002_alter_message_attachment'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='text',
            field=ckeditor.fields.RichTextField(),
        ),
    ]