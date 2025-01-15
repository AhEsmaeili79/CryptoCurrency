from sqlalchemy import Column, Integer, String, Float, ForeignKey, Table
from datetime import datetime
from app.database import metadata

# User Table
users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("username", String, unique=True, index=True),
    Column("email", String, unique=True, index=True),
    Column("hashed_password", String),
    Column("name", String), 
    Column("phone", String),
)

# Wallet Table
wallets = Table(
    "wallets",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("balance", Float, default=0.0),
)

# Transactions Table
transactions = Table(
    "transactions",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("currency", String),
    Column("amount", Float),
    Column("type", String),  # "buy" or "sell"
)

tokens = Table(
    "tokens",
    metadata,
    Column("id", Integer, primary_key=True, index=True),
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("access_token", String, unique=True),
    Column("is_active", Integer, default=1),  # 1 for active, 0 for invalidated
    Column("created_at", String, default=datetime.utcnow),
    Column("expires_at", String),
)