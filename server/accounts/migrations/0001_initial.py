# Generated by Django 4.0 on 2022-05-23 00:07

import accounts.models
import ckeditor.fields
import django.contrib.auth.models
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AccountUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('phone_number', models.CharField(max_length=12)),
                ('is_a_runner', models.BooleanField(default=False, verbose_name='is_a_runner')),
                ('is_online', models.BooleanField(blank=True, default=False, verbose_name='is_online')),
                ('is_email_verified', models.BooleanField(default=False, verbose_name='email_verified')),
                ('is_phone_number_verified', models.BooleanField(default=False, verbose_name='phone_number_verified')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='IpModel',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ip', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='RunnerProfile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=50, null=True)),
                ('last_name', models.CharField(blank=True, max_length=50, null=True)),
                ('title', models.CharField(blank=True, db_index=True, max_length=55)),
                ('photo', models.ImageField(blank=True, null=True, upload_to='users/%Y/%m/%d/')),
                ('language', models.CharField(blank=True, max_length=55, null=True)),
                ('location', models.CharField(blank=True, db_index=True, max_length=55, null=True)),
                ('salary', models.CharField(blank=True, db_index=True, max_length=55, null=True)),
                ('country', models.CharField(blank=True, db_index=True, max_length=55, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('postcode', models.CharField(blank=True, db_index=True, max_length=55, null=True)),
                ('sector', models.CharField(blank=True, db_index=True, max_length=255, null=True)),
                ('department', models.CharField(blank=True, db_index=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, db_index=True, null=True)),
                ('state', models.CharField(blank=True, db_index=True, max_length=55, null=True)),
                ('city', models.CharField(blank=True, db_index=True, max_length=55, null=True)),
                ('local_goverment_zone', models.CharField(blank=True, db_index=True, max_length=55, null=True)),
                ('author', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='userinfo', to='accounts.accountuser')),
                ('views', models.ManyToManyField(blank=True, related_name='user_views', to='accounts.IpModel')),
            ],
        ),
        migrations.CreateModel(
            name='Vidoe',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(db_index=True, max_length=250, null=True)),
                ('video', models.FileField(blank=True, upload_to='documents/video/%Y/%m/%d/')),
                ('tags', models.CharField(db_index=True, max_length=250, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='video_author', to='accounts.accountuser')),
            ],
        ),
        migrations.CreateModel(
            name='Service',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(db_index=True, max_length=250, null=True)),
                ('display', models.ImageField(blank=True, upload_to=accounts.models.upload_to)),
                ('amount', models.CharField(max_length=250, null=True)),
                ('location', models.CharField(db_index=True, max_length=250, null=True)),
                ('tag', models.CharField(db_index=True, max_length=250, null=True)),
                ('status', models.CharField(db_index=True, max_length=250, null=True)),
                ('delivery_method', models.CharField(db_index=True, max_length=250, null=True)),
                ('created', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated', models.DateTimeField(auto_now=True, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_author', to='accounts.accountuser')),
            ],
        ),
        migrations.CreateModel(
            name='RunnerResume',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('headline', models.CharField(blank=True, db_index=True, max_length=255)),
                ('skills', models.TextField(blank=True, db_index=True, null=True)),
                ('employment', models.TextField(blank=True, db_index=True, null=True)),
                ('education', models.TextField(blank=True, db_index=True, null=True)),
                ('projects', models.TextField(blank=True, db_index=True, null=True)),
                ('profile_summary', models.CharField(blank=True, db_index=True, max_length=255)),
                ('accomplishment', models.TextField(blank=True, db_index=True, null=True)),
                ('career_profile', models.TextField(blank=True, db_index=True, null=True)),
                ('postcode', models.CharField(blank=True, db_index=True, max_length=55)),
                ('description', models.TextField(db_index=True, null=True)),
                ('attachment', models.FileField(blank=True, upload_to='documents/%Y/%m/%d/')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='resume_author', to='accounts.accountuser')),
                ('profile', models.ManyToManyField(blank=True, related_name='user_profile', to='accounts.RunnerProfile')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('body', ckeditor.fields.RichTextField()),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('rating', models.IntegerField(validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='authorreview', to='accounts.accountuser')),
                ('profile', models.ForeignKey(default=False, on_delete=django.db.models.deletion.CASCADE, related_name='profile_review', to='accounts.runnerprofile')),
            ],
            options={
                'ordering': ('created',),
            },
        ),
        migrations.CreateModel(
            name='Photo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(db_index=True, max_length=250, null=True)),
                ('image', models.ImageField(upload_to='users/%Y/%m/%d/')),
                ('tags', models.CharField(db_index=True, max_length=250, null=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='photo_author', to='accounts.accountuser')),
            ],
        ),
    ]
