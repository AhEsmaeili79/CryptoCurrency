from django.urls import path
from .views import WalletView, BuyCryptoView, SellCryptoView, ExchangeCryptoView

urlpatterns = [
    path('wallet/', WalletView.as_view(), name='wallet'),
    path('buy/', BuyCryptoView.as_view(), name='buy_crypto'),
    path('sell/', SellCryptoView.as_view(), name='sell_crypto'),
    path('exchange/', ExchangeCryptoView.as_view(), name='exchange_crypto'),
]
