from fastapi import FastAPI
from app.routers import auth, buy_sell, dashboard, news, wallet

app = FastAPI()

# Register routers
app.include_router(auth.router)
app.include_router(buy_sell.router)
app.include_router(dashboard.router)
app.include_router(news.router)
app.include_router(wallet.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Cryptocurrency API"}
