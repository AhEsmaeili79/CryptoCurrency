from fastapi import APIRouter

router = APIRouter(prefix="/news", tags=["News"])

mock_news = [
    {"id": 1, "title": "Cryptocurrency Trends", "content": "Bitcoin hits all-time high."},
    {"id": 2, "title": "Ethereum 2.0 Update", "content": "Exciting changes coming to Ethereum."},
]

@router.get("/")
async def get_all_news():
    return mock_news

@router.get("/{news_id}")
async def get_news_detail(news_id: int):
    news_item = next((news for news in mock_news if news["id"] == news_id), None)
    if not news_item:
        return {"detail": "News not found"}
    return news_item
