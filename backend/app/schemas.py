from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    username: str
    email: str
    name: Optional[str] = None  
    phone: Optional[str] = None 
    
class UserCreate(UserBase):
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    class Config:
        orm_mode = True

class Wallet(BaseModel):
    id: int
    user_id: int
    balance: float
    class Config:
        orm_mode = True

class Transaction(BaseModel):
    id: int
    user_id: int
    currency: str
    amount: float
    type: str
    class Config:
        orm_mode = True
