# Generated by Django 4.0 on 2022-05-23 00:07

import chatserver.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Conversation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.DateTimeField(auto_now_add=True)),
                ('initiator', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='convo_starter', to='accounts.accountuser')),
                ('receiver', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='convo_participant', to='accounts.accountuser')),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=200)),
                ('attachment', models.FileField(blank=True, upload_to=chatserver.models.upload_to)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('conversation_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chatserver.conversation')),
                ('sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='message_sender', to='accounts.accountuser')),
            ],
            options={
                'ordering': ('-timestamp',),
            },
        ),
    ]
