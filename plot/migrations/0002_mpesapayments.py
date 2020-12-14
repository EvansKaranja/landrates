# Generated by Django 3.0.2 on 2020-12-13 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('plot', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MpesaPayments',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('MerchantRequestID', models.CharField(max_length=50)),
                ('CheckoutRequestID', models.CharField(max_length=50)),
                ('Amount', models.FloatField()),
                ('MpesaReceiptNumber', models.CharField(max_length=50)),
                ('TransactionDate', models.DateTimeField()),
                ('PhoneNumber', models.CharField(max_length=16)),
            ],
            options={
                'verbose_name_plural': 'Lipa na Mpesa Payments',
            },
        ),
    ]
