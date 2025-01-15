from fastapi import APIRouter, Depends, HTTPException, Request
from app.schemas import UserCreate, User ,LoginRequest
from app.crud import create_user, get_user_by_email ,get_user_by_username
from app.database import database
from passlib.context import CryptContext
from app.utils.jwt import create_access_token, verify_token

router = APIRouter(prefix="/auth", tags=["Auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

blacklist = set()
def get_password_hash(password):
    return pwd_context.hash(password)

async def verify_user(email: str, password: str):
    user = await get_user_by_email(email)
    if user and pwd_context.verify(password, user.hashed_password):
        return user
    return None

@router.post("/signup/", response_model=User)
async def signup(user: UserCreate):
    existing_user_email = await get_user_by_email(user.email)
    existing_user_username = await get_user_by_username(user.username)
    if existing_user_email:
        raise HTTPException(status_code=400, detail="ایمیل در سایت وجود دارد")
    elif existing_user_username : 
        raise HTTPException(status_code=400, detail="نام کاربری در سایت وجود دارد")
    hashed_password = get_password_hash(user.password)
    user_id = await create_user(user.username, user.email, hashed_password)
    await database.execute(f"INSERT INTO wallets (user_id, balance) VALUES ({user_id}, 0.0)")
    raise HTTPException(status_code=200, detail="ثبت نام با موفقیت انجام شد")

@router.post("/login/")
async def login(request: LoginRequest):
    email = request.email
    password = request.password

    user = await get_user_by_email(email)
    
    if not user or not pwd_context.verify(password, user.hashed_password):
        raise HTTPException(status_code=401, detail="نام کاربری یا رمز اشتباه است")
    token_data = {"sub": user.email, "user_id": user.id}
    access_token = create_access_token(data=token_data)
    
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/verify_token/")
async def verify_token_route(token: str):
    payload = verify_token(token)
    return {"message": "توکن معتبر نیست", "payload": payload}


@router.post("/logout/")
async def logout(request: Request):
    token = request.query_params.get("token")  # Get token from query parameters
    if not token:
        raise HTTPException(status_code=400, detail="Token is missing from the request.")
    
    # Verify the token
    token_data = verify_token(token)
    
    if not token_data:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    # Add the token's JWT ID (jti) to the blacklist or handle it accordingly
    jti = token_data.get("jti")
    
    # Simulating blacklist action here
    blacklist.add(jti)  # Ensure `blacklist` is defined and available for token management
    
    return {"message": "You have been logged out successfully."}

@router.get("/secure-endpoint/")
async def secure_endpoint(token: str = Depends(verify_token)):
    jti = token.get("jti")
    if jti in blacklist:
        raise HTTPException(status_code=401, detail="توکن معتبر نیست")
    return {"message": "دسترسی تایید شد"}