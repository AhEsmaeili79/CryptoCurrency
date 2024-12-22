from fastapi import APIRouter, Depends, HTTPException
from app.utils.jwt import verify_token
from fastapi.security import OAuth2PasswordBearer

router = APIRouter(prefix="/protected", tags=["Protected"])

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login/")

# Protect this route with JWT
@router.get("/dashboard/")
async def get_dashboard(token: str = Depends(oauth2_scheme)):
    payload = verify_token(token)  # This will raise an exception if the token is invalid
    return {"message": "Welcome to your dashboard", "user": payload}
