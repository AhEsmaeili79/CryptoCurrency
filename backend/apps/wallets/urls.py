from django.urls import path
from .views import WalletView, CryptoCurrencyView

urlpatterns = [
    path('wallets/', WalletView.as_view(), name='wallets'),
    path('currencies/', CryptoCurrencyView.as_view(), name='currencies'),
]
