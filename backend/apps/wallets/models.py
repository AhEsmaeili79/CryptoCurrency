from django.db import models
from apps.users.models import User

class CryptoCurrency(models.Model):
    name = models.CharField(max_length=50, unique=True)
    symbol = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return self.name

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    cryptocurrency = models.ForeignKey(CryptoCurrency, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=20, decimal_places=8, default=0.0)

    def __str__(self):
        return f"{self.user.username}'s Wallet ({self.cryptocurrency.name})"
