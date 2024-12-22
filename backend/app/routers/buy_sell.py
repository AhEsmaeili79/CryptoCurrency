from fastapi import APIRouter, Depends
from app.crud import create_transaction
from app.schemas import Transaction

router = APIRouter(prefix="/buy-sell", tags=["Buy/Sell"])

@router.post("/transaction/")
async def create_transaction_api(transaction: Transaction):
    return await create_transaction(
        user_id=transaction.user_id,
        currency=transaction.currency,
        amount=transaction.amount,
        type=transaction.type,
    )
