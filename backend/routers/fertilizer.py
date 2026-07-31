from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/fertilizer", tags=["Fertilizer"])

class FertilizerRequest(BaseModel):
    crop_name: str
    soil_type: Optional[str] = "Clay Loam"
    nitrogen: Optional[float] = 140.0
    phosphorus: Optional[float] = 40.0
    potassium: Optional[float] = 50.0
    land_area_acres: Optional[float] = 1.0

@router.post("")
async def get_fertilizer_recommendation(req: FertilizerRequest):
    area = req.land_area_acres or 1.0
    return {
        "status": "success",
        "crop_name": req.crop_name,
        "recommended_fertilizers": [
            {
                "fertilizer": "Neem Coated Urea (46% N)",
                "quantity_kg": int(25 * area),
                "purpose": "Nitrogen boost for vigorous vegetative tillering"
            },
            {
                "fertilizer": "DAP (18-46-0)",
                "quantity_kg": int(15 * area),
                "purpose": "Phosphorus for robust early root architecture"
            },
            {
                "fertilizer": "MOP (60% K2O)",
                "quantity_kg": int(20 * area),
                "purpose": "Potassium for pest resistance and grain weight"
            }
        ],
        "organic_alternatives": [
            f"Vermi-compost: Apply {2.5 * area} Tons/acre before initial plowing",
            "Panchagavya: 3% foliar spray during vegetative growth stage",
            "Neem Cake: 100 kg/acre soil integration to eliminate root nematodes"
        ],
        "application_schedule": [
            "Basal Dose: Apply 50% DAP + 25% Urea + 50% MOP at transplanting",
            "First Top Dressing: Apply 25% Urea at 25-30 days after sowing",
            "Second Top Dressing: Apply 25% Urea + 50% MOP at panicle initiation"
        ],
        "warnings": ["Avoid excessive Urea in humid weather to prevent leaf blast outbreak."]
    }
