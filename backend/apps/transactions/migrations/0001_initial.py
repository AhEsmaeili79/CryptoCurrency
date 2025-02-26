# Generated by Django 5.1.5 on 2025-01-21 21:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CryptoCurrency',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('symbol', models.CharField(max_length=10, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Wallet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('balance', models.DecimalField(decimal_places=8, default=0.0, max_digits=20)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('transaction_type', models.CharField(choices=[('buy', 'Buy'), ('sell', 'Sell'), ('exchange', 'Exchange')], max_length=10)),
                ('amount', models.DecimalField(decimal_places=8, max_digits=20)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('cryptocurrency', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='transactions.cryptocurrency')),
            ],
        ),
    ]
