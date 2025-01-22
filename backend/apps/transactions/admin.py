# apps/cryptocurrency/admin.py
from django.contrib import admin
from .models import CryptoCurrency, Transaction, Wallet, WalletCrypto

    
class CryptoCurrencyAdmin(admin.ModelAdmin):
    list_display = ('name', 'symbol')
    search_fields = ('name', 'symbol')
    ordering = ('name',)
    
class WalletAdmin(admin.ModelAdmin):
    list_display = ('user',)
    search_fields = ('user__username',)
    ordering = ('user__username',)
    
class WalletCryptoAdmin(admin.ModelAdmin):
    list_display = ('wallet', 'cryptocurrency', 'balance')
    list_filter = ('cryptocurrency',)
    search_fields = ('wallet__user__username', 'cryptocurrency__name')
    ordering = ('wallet__user__username', 'cryptocurrency__name')
    autocomplete_fields = ('wallet', 'cryptocurrency')
    
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('user', 'cryptocurrency', 'transaction_type', 'amount', 'created_at')
    list_filter = ('transaction_type', 'cryptocurrency')
    search_fields = ('user__username', 'cryptocurrency__name')



# Register models with their respective admin classes
admin.site.register(CryptoCurrency, CryptoCurrencyAdmin)
admin.site.register(WalletCrypto, WalletCryptoAdmin)
admin.site.register(Wallet, WalletAdmin)
admin.site.register(Transaction, TransactionAdmin)