from fastapi import APIRouter, HTTPException
from app.models import wallets
from app.database import database

router = APIRouter(prefix="/wallet", tags=["Wallet"])

@router.get("/{user_id}/balance/")
async def get_balance(user_id: int):
    query = wallets.select().where(wallets.c.user_id == user_id)
    wallet = await database.fetch_one(query)
    if not wallet:
        raise HTTPException(status_code=404, detail="Wallet not found")
    return {"balance": wallet.balance}

@router.post("/{user_id}/deposit/")
async def deposit(user_id: int, amount: float):
    if amount <= 0:
        raise HTTPException(status_code=400, detail="Invalid amount")
    query = wallets.update().where(wallets.c.user_id == user_id).values(balance=wallets.c.balance + amount)
    await database.execute(query)
    return {"message": f"{amount} deposited successfully"}
