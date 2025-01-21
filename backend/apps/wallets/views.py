from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Wallet, CryptoCurrency
from .serializers import WalletSerializer, CryptoCurrencySerializer

class WalletView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wallets = Wallet.objects.filter(user=request.user)
        serializer = WalletSerializer(wallets, many=True)
        return Response(serializer.data)

class CryptoCurrencyView(APIView):
    def get(self, request):
        currencies = CryptoCurrency.objects.all()
        serializer = CryptoCurrencySerializer(currencies, many=True)
        return Response(serializer.data)
