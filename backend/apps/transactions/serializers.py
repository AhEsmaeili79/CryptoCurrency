from rest_framework import serializers
from .models import Transaction
from apps.wallets.serializers import CryptoCurrencySerializer

class TransactionSerializer(serializers.ModelSerializer):
    cryptocurrency = CryptoCurrencySerializer()

    class Meta:
        model = Transaction
        fields = ['id', 'user', 'cryptocurrency', 'transaction_type', 'amount', 'created_at']
