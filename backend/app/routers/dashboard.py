from fastapi import APIRouter, HTTPException
from app.database import database
from app.models import wallets, transactions

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/{user_id}/wallet/")
async def get_wallet(user_id: int):
    query = wallets.select().where(wallets.c.user_id == user_id)
    wallet = await database.fetch_one(query)
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return wallet

@router.get("/{user_id}/transactions/")
async def get_transactions(user_id: int):
    query = transactions.select().where(transactions.c.user_id == user_id)
    return await database.fetch_all(query)
