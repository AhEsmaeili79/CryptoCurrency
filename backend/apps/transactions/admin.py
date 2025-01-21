# apps/cryptocurrency/admin.py
from django.contrib import admin
from .models import CryptoCurrency, Transaction, Wallet

class CryptoCurrencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol')
    search_fields = ('name', 'symbol')

class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'cryptocurrency', 'transaction_type', 'amount', 'created_at')
    list_filter = ('transaction_type', 'cryptocurrency')
    search_fields = ('user__username', 'cryptocurrency__name')

class WalletAdmin(admin.ModelAdmin):
    list_display = ('user', 'cryptocurrency', 'balance')
    search_fields = ('user__username', 'cryptocurrency__name')

# Register models with their respective admin classes
admin.site.register(CryptoCurrency, CryptoCurrencyAdmin)
admin.site.register(Transaction, TransactionAdmin)
admin.site.register(Wallet, WalletAdmin)
