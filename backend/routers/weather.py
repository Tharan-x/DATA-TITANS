from fastapi import APIRouter, Query
from services.weather_service import WeatherService

router = APIRouter(prefix="/weather", tags=["Weather"])

@router.get("")
async def get_weather(district: str = Query(default="Coimbatore", description="District or location name")):
    """Get live weather data, forecast, and farming advisory with automatic fallback."""
    return await WeatherService.fetch_real_weather(district)
