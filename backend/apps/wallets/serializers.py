from rest_framework import serializers
from .models import Wallet, CryptoCurrency

class CryptoCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCurrency
        fields = ['id', 'name', 'symbol', 'current_price']

class WalletSerializer(serializers.ModelSerializer):
    cryptocurrency = CryptoCurrencySerializer()

    class Meta:
        model = Wallet
        fields = ['id', 'user', 'cryptocurrency', 'balance']
