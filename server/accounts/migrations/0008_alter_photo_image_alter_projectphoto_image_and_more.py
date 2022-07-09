# Generated by Django 4.0 on 2022-07-04 02:12

import accounts.models
from django.db import migrations, models
import django_s3_storage.storage


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_alter_runnerresume_accomplishment_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='photo',
            name='image',
            field=models.ImageField(storage=django_s3_storage.storage.S3Storage(aws_s3_bucket_name='zappa-wnf4dp8g2'), upload_to='users/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='projectphoto',
            name='image',
            field=models.ImageField(storage=django_s3_storage.storage.S3Storage(aws_s3_bucket_name='zappa-wnf4dp8g2'), upload_to=accounts.models.upload_to),
        ),
        migrations.AlterField(
            model_name='runnerprofile',
            name='photo',
            field=models.ImageField(blank=True, null=True, storage=django_s3_storage.storage.S3Storage(aws_s3_bucket_name='zappa-wnf4dp8g2'), upload_to='users/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='runnerresume',
            name='attachment',
            field=models.FileField(blank=True, storage=django_s3_storage.storage.S3Storage(aws_s3_bucket_name='zappa-wnf4dp8g2'), upload_to=accounts.models.upload_to_resume),
        ),
        migrations.AlterField(
            model_name='service',
            name='image',
            field=models.ImageField(blank=True, storage=django_s3_storage.storage.S3Storage(aws_s3_bucket_name='zappa-wnf4dp8g2'), upload_to=accounts.models.upload_to),
        ),
        migrations.AlterField(
            model_name='vidoe',
            name='video',
            field=models.FileField(blank=True, storage=django_s3_storage.storage.S3Storage(aws_s3_bucket_name='zappa-wnf4dp8g2'), upload_to='documents/video/%Y/%m/%d/'),
        ),
    ]
