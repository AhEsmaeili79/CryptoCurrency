from fastapi import APIRouter, HTTPException, Depends
from app.schemas import UserCreate, User
from app.crud import create_user, get_user_by_email
from app.database import database
from passlib.context import CryptContext

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

async def verify_user(email: str, password: str):
    user = await get_user_by_email(email)
    if user and pwd_context.verify(password, user.hashed_password):
        return user
    return None

@router.post("/signup/", response_model=User)
async def signup(user: UserCreate):
    existing_user = await get_user_by_email(user.email)
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    user_id = await create_user(user.username, user.email, hashed_password)
    await database.execute(f"INSERT INTO wallets (user_id, balance) VALUES ({user_id}, 0.0)")
    return {"id": user_id, "username": user.username, "email": user.email}

@router.post("/login/")
async def login(email: str, password: str):
    user = await verify_user(email, password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "user": {"id": user.id, "username": user.username}}
