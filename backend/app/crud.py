from sqlalchemy import insert, select, update
from app.models import users, wallets, transactions
from app.database import database

async def create_user(username: str, email: str, hashed_password: str):
    query = insert(users).values(username=username, email=email, hashed_password=hashed_password)
    return await database.execute(query)

async def get_user_by_email(email: str):
    query = select(users).where(users.c.email == email)
    return await database.fetch_one(query)

async def get_user_by_username(username: str):
    query = select(users).where(users.c.username == username)
    return await database.fetch_one(query)

async def create_transaction(user_id: int, currency: str, amount: float, type: str):
    query = insert(transactions).values(user_id=user_id, currency=currency, amount=amount, type=type)
    return await database.execute(query)

async def update_wallet_balance(user_id: int, new_balance: float):
    query = update(wallets).where(wallets.c.user_id == user_id).values(balance=new_balance)
    return await database.execute(query)
