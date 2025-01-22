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
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

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
    to_wallet_crypto, created = WalletCrypto.objects.get_or_create(wallet=wallet, cryptocurrency=cryptocurrency)

    if created and to_wallet_crypto.balance is None:
        to_wallet_crypto.balance = Decimal('0.0')
        to_wallet_crypto.save()

    return to_wallet_crypto


class TransactionListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            return Transaction.objects.filter(user=user).order_by('-created_at')  # Order by created_at descending
        return Transaction.objects.none()


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

        if not all([crypto_name, amount]):
            return Response({"error": "تمام فیلدها الزامی هستند."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            cryptocurrency = CryptoCurrency.objects.get(name=crypto_name)
            usd_currency = CryptoCurrency.objects.get(name="MONEY_USD")
        except ObjectDoesNotExist:
            return Response({"error": f"رمز ارز {crypto_name} یا کیف پول دلاری وجود ندارد."}, status=status.HTTP_400_BAD_REQUEST)

        wallet = get_object_or_404(Wallet, user=request.user)

        wallet_crypto = WalletCrypto.objects.filter(wallet=wallet, cryptocurrency=usd_currency).first()

        if not wallet_crypto or wallet_crypto.balance < Decimal(amount):
            if not wallet_crypto:
                return Response(
                    {"error": f"شما هیچ {usd_currency.symbol} در کیف پول خود ندارید.", "current_balance": 0},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response(
                {"error": f"موجودی کافی برای خرید {crypto_name} با {amount} {usd_currency.symbol} وجود ندارد.",
                 "current_balance": wallet_crypto.balance},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        wallet_crypto_crypto = initialize_wallet_crypto_balance(wallet, cryptocurrency)
        wallet_crypto_crypto, created = WalletCrypto.objects.get_or_create(wallet=wallet, cryptocurrency=cryptocurrency)
                    
        price = get_crypto_price(cryptocurrency.symbol)
        price_usd = get_crypto_price("USDT") 

        if not price or not price_usd:
            return Response({"error": "نتواستیم قیمت رمزارزها را دریافت کنیم."}, status=status.HTTP_400_BAD_REQUEST)

        wallet_crypto.balance -= Decimal(price) * Decimal(amount)
        wallet_crypto.save()

        
        wallet_crypto_crypto.balance += Decimal(amount)
        wallet_crypto_crypto.save()

        logger.info(f"خرید {amount} {cryptocurrency.symbol} به {amount} {usd_currency.symbol}.")

        Transaction.objects.create(
            user=request.user,
            cryptocurrency=cryptocurrency,
            transaction_type='buy',
            amount=amount
        )

        return Response(
            {
                "message": f"خرید {amount} {cryptocurrency.symbol} با {amount} {usd_currency.symbol} با موفقیت انجام شد.",
                "usd_balance": wallet_crypto.balance,
                "crypto_balance": wallet_crypto_crypto.balance,
            },
            status=status.HTTP_201_CREATED
        )





class SellCryptoView(APIView):
    def post(self, request):
        from_crypto_name = request.data.get("cryptocurrency")
        amount = request.data.get("amount")

        if not all([from_crypto_name, amount]):
            return Response({"error": "تمام فیلدها الزامی هستند."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from_currency = CryptoCurrency.objects.get(name=from_crypto_name)
            usd_currency = CryptoCurrency.objects.get(name="MONEY_USD")
        except ObjectDoesNotExist as e:
            return Response({"error": f"رمز ارز {from_currency} وجود ندارد."}, status=status.HTTP_400_BAD_REQUEST)

        wallet = get_object_or_404(Wallet, user=request.user)

        from_wallet_crypto = WalletCrypto.objects.filter(wallet=wallet, cryptocurrency=from_currency).first()

        if not from_wallet_crypto or from_wallet_crypto.balance < amount:
            if not from_wallet_crypto:
                return Response(
                    {"error": f"شما هیچ {from_currency.symbol} در کیف پول خود ندارید.", "current_balance": 0},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response(
                {"error": f"موجودی کافی برای تبدیل {amount} {from_currency.symbol} وجود ندارد.",
                 "current_balance": from_wallet_crypto.balance},
                status=status.HTTP_400_BAD_REQUEST
            )
        to_wallet_crypto, created = WalletCrypto.objects.get_or_create(wallet=wallet, cryptocurrency=usd_currency)
        to_wallet_crypto = initialize_wallet_crypto_balance(wallet, usd_currency)

        price_from = get_crypto_price(from_currency.symbol)
        price_usd = get_crypto_price("USDT")  

        if not price_from or not price_usd:
            return Response({"error": "نتواستیم قیمت رمزارزها را دریافت کنیم."}, status=status.HTTP_400_BAD_REQUEST)

        usd_amount = Decimal(amount) * Decimal(price_from) / Decimal(price_usd)

        from_wallet_crypto.balance -= Decimal(amount)
        to_wallet_crypto.balance += usd_amount
        from_wallet_crypto.save()
        to_wallet_crypto.save()

        # Log the exchange action
        logger.info(f"فروش {amount} {from_currency.symbol} به {usd_amount} USDT.")

        Transaction.objects.create(
            user=request.user,
            cryptocurrency=from_currency,
            transaction_type='sell',
            amount=Decimal(amount)
        )

        return Response(
            {
                "message": f"فروش {amount} {from_currency.symbol} به {usd_amount} USDT با موفقیت انجام شد.",
                "from_currency_balance": from_wallet_crypto.balance,
                "usd_balance": to_wallet_crypto.balance,
            },
            status=status.HTTP_200_OK
        )


class ExchangeCryptoView(APIView):
    def post(self, request):
        from_crypto_name = request.data.get("from_currency_id")
        to_crypto_name = request.data.get("to_currency_id")
        amount = request.data.get("amount")
        
        if not all([from_crypto_name, to_crypto_name, amount]):
            return Response({"error": "تمام فیلدها الزامی هستند."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from_currency = CryptoCurrency.objects.get(name=from_crypto_name)
            to_currency = CryptoCurrency.objects.get(name=to_crypto_name)
        except ObjectDoesNotExist as e:
            missing_currency = str(e).split(' ')[-1]
            return Response({"error": f"رمز ارز {missing_currency} وجود ندارد."}, status=status.HTTP_400_BAD_REQUEST)

        wallet = get_object_or_404(Wallet, user=request.user)

        from_wallet_crypto = WalletCrypto.objects.filter(wallet=wallet, cryptocurrency=from_currency).first()
        
        if not from_wallet_crypto or from_wallet_crypto.balance < amount:
            if not from_wallet_crypto:
                return Response(
                    {"error": f"شما هیچ {from_currency.symbol} در کیف پول خود ندارید.", "current_balance": 0},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            return Response(
                {"error": f"موجودی کافی برای تبدیل {amount} {from_currency.symbol} وجود ندارد.",
                "current_balance": from_wallet_crypto.balance},
                status=status.HTTP_400_BAD_REQUEST
            )


        to_wallet_crypto, created = WalletCrypto.objects.get_or_create(wallet=wallet, cryptocurrency=to_currency)
        to_wallet_crypto = initialize_wallet_crypto_balance(wallet, to_currency)
                    

        price_from = get_crypto_price(from_currency.symbol)  
        price_to = get_crypto_price(to_currency.symbol)  
        

        if not price_from or not price_to:
            return Response({"error": "نتواستیم قیمت رمزارزها را دریافت کنیم."}, status=status.HTTP_400_BAD_REQUEST)

        to_amount = Decimal(amount) * Decimal(price_from) / Decimal(price_to)

        from_wallet_crypto.balance -= Decimal(amount)  
        to_wallet_crypto.balance += to_amount 
        from_wallet_crypto.save()
        to_wallet_crypto.save()

        # Log the exchange action
        logger.info(f"تبدیل {amount} {from_currency.symbol} به {to_currency.symbol}.")

        Transaction.objects.create(
            user=request.user,
            cryptocurrency=to_currency,
            transaction_type='exchange',
            amount=to_amount
        )

        return Response(
            {
                "message": f"تبدیل {amount} {from_currency.symbol} به {to_amount} {to_currency.symbol} با موفقیت انجام شد.",
                "from_currency_balance": from_wallet_crypto.balance,
                "to_currency_balance": to_wallet_crypto.balance,
            },
            status=status.HTTP_200_OK
        )
