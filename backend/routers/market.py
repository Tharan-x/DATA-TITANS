from fastapi import APIRouter, Query
from services.market_service import MarketService

router = APIRouter(prefix="/market-prices", tags=["Market Prices"])

@router.get("")
async def get_market_prices(commodity: str = Query(default=None)):
    """Fetch live Mandi market rates, price trends, forecasts, and AI recommendations."""
    prices = await MarketService.get_prices(commodity)
    return {"status": "success", "count": len(prices), "prices": prices}
