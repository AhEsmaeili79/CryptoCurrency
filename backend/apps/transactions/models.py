from django.db import models
from apps.users.models import User

class CryptoCurrency(models.Model):
    name = models.CharField(max_length=50, unique=True)
    symbol = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name


class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username}'s Wallet"


class WalletCrypto(models.Model):
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE, related_name="cryptos")
    cryptocurrency = models.ForeignKey(CryptoCurrency, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=20, decimal_places=8, default=0.0)

    class Meta:
        unique_together = ('wallet', 'cryptocurrency')  # Ensure each cryptocurrency is unique within a wallet

    def __str__(self):
        return f"{self.wallet.user.username}'s {self.cryptocurrency.name}: {self.balance}"
    
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cryptocurrency = models.ForeignKey(CryptoCurrency, on_delete=models.CASCADE)
    transaction_type = models.CharField(max_length=10, choices=[('buy', 'Buy'), ('sell', 'Sell'), ('exchange', 'Exchange')])
    amount = models.DecimalField(max_digits=20, decimal_places=8)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.transaction_type} - {self.cryptocurrency.name}"


