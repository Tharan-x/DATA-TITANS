from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/pest-risk", tags=["Pest Warning"])

class RiskAssessmentRequest(BaseModel):
    crop_name: str = "Paddy (Rice)"
    district: Optional[str] = "Coimbatore"
    temperature_celsius: Optional[float] = 32.0
    humidity_percent: Optional[float] = 75.0
    rainfall_mm: Optional[float] = 15.0

@router.post("")
async def assess_pest_risk(req: RiskAssessmentRequest):
    temp = req.temperature_celsius or 32.0
    hum = req.humidity_percent or 75.0
    rain = req.rainfall_mm or 15.0

    heat_risk = "HIGH" if temp > 38.0 else ("MODERATE" if temp > 32.0 else "LOW")
    disease_risk = "HIGH (Fungus Threat)" if hum > 85.0 else ("MODERATE" if hum > 65.0 else "LOW")
    heavy_rain_risk = "FLOOD WARNING" if rain > 40.0 else ("MODERATE RAIN" if rain > 15.0 else "LOW")
    water_stress_risk = "HIGH WATER STRESS" if (temp > 35.0 and hum < 40.0) else "NORMAL"
    pest_risk = "HIGH" if (hum > 70.0 and temp > 28.0) else "MODERATE"

    return {
        "status": "success",
        "crop_name": req.crop_name,
        "district": req.district,
        "risk_summary": {
            "heavy_rain": heavy_rain_risk,
            "heat_risk": heat_risk,
            "pest_risk": pest_risk,
            "disease_risk": disease_risk,
            "water_stress": water_stress_risk
        },
        "risk_level": pest_risk,
        "risk_score": 88 if hum > 80 else 65,
        "potential_pests": [
            {"pest_name": "Yellow Stem Borer", "symptoms": "Dead hearts in central shoots"},
            {"pest_name": "Brown Plant Hopper (BPH)", "symptoms": "Hopper burn, drying patches"},
            {"pest_name": "Leaf Folder / Caterpillar", "symptoms": "Folded leaves with white longitudinal streaks"}
        ],
        "recommended_preventive_sprays": [
            "Install Pheromone traps @ 8 traps/acre for adult moth monitoring",
            "Spray Neem Oil (5ml/L) or Chlorantraniliprole 18.5% SC @ 0.3ml/L early morning",
            "Maintain proper field drainage during heavy rainfall alerts"
        ],
        "weather_trigger_factors": [
            f"Temperature: {temp}°C ({heat_risk} Heat Factor)",
            f"Relative Humidity: {hum}% ({disease_risk})",
            f"Precipitation Forecast: {rain}mm ({heavy_rain_risk})"
        ]
    }
