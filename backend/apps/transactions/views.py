import logging
import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Wallet, WalletCrypto, CryptoCurrency, Transaction
from .serializers import WalletCryptoSerializer, TransactionSerializer
from django.shortcuts import get_object_or_404
from django.core.exceptions import ObjectDoesNotExist
from decimal import Decimal


logger = logging.getLogger(__name__)

API_URL = "https://openapiv1.coinstats.app/coins?&limit=500"
AUTH_TOKEN = "1Kyw6LHVmD5IYhPUWcAumrK+0FrsshmwC2OKMOq8L28="


def get_crypto_prices():
    headers = {
        "X-API-KEY": AUTH_TOKEN,
    }
    response = requests.get(API_URL, headers=headers)
    if response.status_code == 200:
        data = response.json()
        return data['result']
    else:
        logger.error(f"Failed to fetch crypto prices, status code: {response.status_code}")
        return []

def get_crypto_price(crypto_symbol):
    coins = get_crypto_prices()
    for coin in coins:
        if coin['symbol'] == crypto_symbol:
            return coin['price']
    logger.warning(f"Price not found for cryptocurrency: {crypto_symbol}")
    return None



def initialize_wallet_crypto_balance(wallet, cryptocurrency):
    # Get or create the WalletCrypto object
    to_wallet_crypto, created = WalletCrypto.objects.get_or_create(wallet=wallet, cryptocurrency=cryptocurrency)

    # If it's a new object and the balance is None, set it to 0
    if created and to_wallet_crypto.balance is None:
        to_wallet_crypto.balance = Decimal('0.0')
        to_wallet_crypto.save()

    return to_wallet_crypto



class WalletView(APIView):
    def get(self, request):
        wallet = get_object_or_404(Wallet, user=request.user)
        cryptos = WalletCrypto.objects.filter(wallet=wallet)
        logger.info(f"Fetched wallet data for user: {request.user}")
        serializer = WalletCryptoSerializer(cryptos, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BuyCryptoView(APIView):
    def post(self, request):
        crypto_name = request.data.get("cryptocurrency")
        amount = request.data.get("amount")

        if not crypto_name or not amount:
            return Response({"error": "Cryptocurrency name and amount are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cryptocurrency = CryptoCurrency.objects.get(name=crypto_name)
        except ObjectDoesNotExist:
            return Response({"error": f"Cryptocurrency {crypto_name} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        price = get_crypto_price(cryptocurrency.symbol)
        if price is None:
            return Response({"error": f"Unable to fetch the price for {crypto_name}."}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            "cryptocurrency": cryptocurrency.id,
            "amount": amount,
            "user": request.user.id,
            "price": price,  
        }
        
        serializer = TransactionSerializer(data=data)
        if serializer.is_valid():
            transaction = serializer.save()
            wallet = Wallet.objects.get(user=transaction.user)
            wallet_crypto, _ = WalletCrypto.objects.get_or_create(
                wallet=wallet, cryptocurrency=transaction.cryptocurrency
            )
            wallet_crypto.balance += transaction.amount
            wallet_crypto.save()

            logger.info(f"Crypto bought successfully: {transaction.amount} {crypto_name} for {price} each.")
            return Response({"message": "Crypto bought successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SellCryptoView(APIView):
    def post(self, request):
        crypto_name = request.data.get("cryptocurrency")
        amount = request.data.get("amount")
        
        if not crypto_name or not amount:
            return Response({"error": "Cryptocurrency name and amount are required."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            cryptocurrency = CryptoCurrency.objects.get(name=crypto_name)
        except ObjectDoesNotExist:
            return Response({"error": f"Cryptocurrency {crypto_name} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        price = get_crypto_price(cryptocurrency.symbol)
        if price is None:
            return Response({"error": f"Unable to fetch the price for {crypto_name}."}, status=status.HTTP_400_BAD_REQUEST)

        data = {
            "cryptocurrency": cryptocurrency.id,
            "amount": amount,
            "user": request.user.id,
            "price": price,  
        }

        serializer = TransactionSerializer(data=data)
        if serializer.is_valid():
            transaction = serializer.save()
            wallet = Wallet.objects.get(user=transaction.user)
            wallet_crypto = WalletCrypto.objects.get(
                wallet=wallet, cryptocurrency=transaction.cryptocurrency
            )
            if wallet_crypto.balance >= transaction.amount:
                wallet_crypto.balance -= transaction.amount
                wallet_crypto.save()

                logger.info(f"Crypto sold successfully: {transaction.amount} {crypto_name} for {price} each.")
                return Response({"message": "Crypto sold successfully!"}, status=status.HTTP_200_OK)
            return Response({"error": "Insufficient balance to sell"}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        
# Replace "-" with space in the currency names
        # from_crypto_name = from_crypto_name.replace("-", " ") if from_crypto_name else from_crypto_name
        # to_crypto_name = to_crypto_name.replace("-", " ") if to_crypto_name else to_crypto_name


class ExchangeCryptoView(APIView):
    def post(self, request):
        from_crypto_name = request.data.get("from_currency_id")
        to_crypto_name = request.data.get("to_currency_id")
        amount = request.data.get("amount")
        
        print(amount)

        if not all([from_crypto_name, to_crypto_name, amount]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from_currency = CryptoCurrency.objects.get(name=from_crypto_name)
            to_currency = CryptoCurrency.objects.get(name=to_crypto_name)
        except ObjectDoesNotExist as e:
            missing_currency = str(e).split(' ')[-1]
            return Response({"error": f"Cryptocurrency {missing_currency} does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        wallet = get_object_or_404(Wallet, user=request.user)

        from_wallet_crypto = WalletCrypto.objects.filter(wallet=wallet, cryptocurrency=from_currency).first()
        
        to_wallet_crypto, created = WalletCrypto.objects.get_or_create(wallet=wallet, cryptocurrency=to_currency)
        
        to_wallet_crypto = initialize_wallet_crypto_balance(wallet, to_currency)

            
        if not from_wallet_crypto:
            return Response(
                {"error": f"You do not have any {from_currency.symbol} in your wallet.", "current_balance": 0},
                status=status.HTTP_400_BAD_REQUEST
            )

        if from_wallet_crypto.balance < amount:
            return Response(
                {"error": f"Insufficient balance to exchange {amount} {from_currency.symbol}.",
                 "current_balance": from_wallet_crypto.balance},
                status=status.HTTP_400_BAD_REQUEST
            )

        price_from = get_crypto_price(from_currency.symbol)  
        price_to = get_crypto_price(to_currency.symbol)  

        if not price_from or not price_to:
            return Response({"error": "Could not fetch cryptocurrency prices."}, status=status.HTTP_400_BAD_REQUEST)

        to_amount = Decimal(amount) * Decimal(price_from) / Decimal(price_to)

        from_wallet_crypto.balance -= Decimal(amount)  
        to_wallet_crypto.balance += to_amount 
        from_wallet_crypto.save()
        to_wallet_crypto.save()

        # Log the exchange action
        logger.info(f"Exchanged {amount} {from_currency.symbol} to {to_currency.symbol}.")

        Transaction.objects.create(
            user=request.user,
            cryptocurrency=from_currency,
            transaction_type='exchange',
            amount=Decimal(amount)
        )
        Transaction.objects.create(
            user=request.user,
            cryptocurrency=to_currency,
            transaction_type='exchange',
            amount=to_amount
        )

        return Response(
            {
                "message": f"Successfully exchanged {amount} {from_currency.symbol} to {to_amount} {to_currency.symbol}.",
                "from_currency_balance": from_wallet_crypto.balance,
                "to_currency_balance": to_wallet_crypto.balance,
            },
            status=status.HTTP_200_OK
        )
