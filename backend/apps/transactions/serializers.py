from rest_framework import serializers
from .models import Wallet, WalletCrypto, CryptoCurrency, Transaction

class CryptoCurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = CryptoCurrency
        fields = ['id', 'name', 'symbol']


class WalletCryptoSerializer(serializers.ModelSerializer):
    cryptocurrency = CryptoCurrencySerializer()

    class Meta:
        model = WalletCrypto
        fields = ['id', 'cryptocurrency', 'balance']


class TransactionSerializer(serializers.ModelSerializer):
    cryptocurrency_name = serializers.SerializerMethodField()

    class Meta:
        model = Transaction
        fields = ['id', 'user', 'cryptocurrency', 'cryptocurrency_name', 'transaction_type', 'amount', 'created_at']
        read_only_fields = ['id', 'created_at']

    def get_cryptocurrency_name(self, obj):
        return obj.cryptocurrency.name  # Assuming 'name' is the field in the Cryptocurrency model

    def validate(self, data):
        wallet = Wallet.objects.get(user=data['user'])
        wallet_crypto, created = WalletCrypto.objects.get_or_create(
            wallet=wallet, cryptocurrency=data['cryptocurrency']
        )
        
        if data['transaction_type'] == 'sell' and wallet_crypto.balance < data['amount']:
            raise serializers.ValidationError("Insufficient balance to sell.")
        
        if data['transaction_type'] == 'exchange':
            raise serializers.ValidationError("Exchange requires a specific implementation.")
        
        return data
