from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password
from rest_framework_simplejwt.authentication import JWTAuthentication
from apps.transactions.models import Wallet, CryptoCurrency, WalletCrypto

class RegisterView(APIView):
    def post(self, request):
        data = request.data
        if User.objects.filter(username=data.get('username')).exists():
            return Response({"error": "نام کاربری قبلا ثبت شده است"}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=data.get('email')).exists():
            return Response({"error": "ایمیل قبلا ثبت شده است"}, status=status.HTTP_400_BAD_REQUEST)

        user = User(
            username=data.get('username'),
            email=data.get('email'),
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            phone_number=data.get('phone_number'),
            password=make_password(data.get('password')),
        )
        user.save()
        
        wallet = Wallet.objects.create(user=user)

        dogecoin = CryptoCurrency.objects.get(name="dogecoin")

        wallet_crypto, created = WalletCrypto.objects.get_or_create(wallet=wallet, cryptocurrency=dogecoin)
        
        wallet_crypto.balance += 4000  
        wallet_crypto.save()

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }, status=status.HTTP_200_OK)

        return Response({"error": "نام کاربری یا رمز عبور اشتباه است"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "خروج با موفقیت انجام شد"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": "توکن نامعتبر است"}, status=status.HTTP_400_BAD_REQUEST)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        data = request.data

        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.phone_number = data.get('phone_number', user.phone_number)
        user.email = data.get('email', user.email)

        # Save changes
        user.save()

        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
