from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/pest-risk", tags=["Pest Warning"])

class PestRiskRequest(BaseModel):
    crop_name: str
    district: Optional[str] = "Coimbatore"
    temperature_celsius: Optional[float] = 31.5
    humidity_percent: Optional[float] = 68.0

@router.post("")
async def assess_pest_risk(req: PestRiskRequest):
    return {
        "status": "success",
        "risk_level": "HIGH" if req.humidity_percent > 65 else "MODERATE",
        "risk_score": 82,
        "potential_pests": [
            {"pest_name": "Yellow Stem Borer", "symptoms": "Dead hearts in central shoots"},
            {"pest_name": "Brown Plant Hopper (BPH)", "symptoms": "Hopper burn, drying patches"},
            {"pest_name": "Rice Leaf Folder", "symptoms": "Folded leaves with white longitudinal streaks"}
        ],
        "recommended_preventive_sprays": [
            "Install Pheromone traps @ 8 traps/acre for stem borer monitoring",
            "Set up Light Traps at field corners to capture adult moths",
            "Spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L if threshold crosses 5%"
        ],
        "weather_trigger_factors": [
            f"High relative humidity of {req.humidity_percent}% creates breeding environment",
            f"Temperature of {req.temperature_celsius}°C accelerates egg hatching cycles",
            "Overcast cloudy sky conditions past 48 hours"
        ]
    }
