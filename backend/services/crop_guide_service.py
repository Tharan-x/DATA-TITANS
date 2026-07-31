import logging
from database.supabase_client import get_supabase

logger = logging.getLogger("uzhavan.services.crop_guide")

class CropGuideService:
    @staticmethod
    async def get_all_crop_guides() -> list:
        try:
            sp = get_supabase()
            if sp:
                res = sp.table("crop_guides").select("*").execute()
                if res.data and len(res.data) > 0:
                    return res.data
        except Exception as e:
            logger.warning(f"Could not load crop guides from Supabase: {e}")

        return [
            {
                "id": "crop-1",
                "name": "Paddy (Rice / நெல்)",
                "local_name": {"ta": "நெல்", "hi": "धान", "te": "వరి", "kn": "ಭತ್ತ", "ml": "നെല്ല്"},
                "category": "Cereals",
                "duration_days": 120,
                "optimal_temp": "20°C - 35°C",
                "optimal_ph": "5.5 - 6.5",
                "ideal_season": "Kharif / Samba",
                "water_requirement": "High (1200 - 1400 mm)",
                "stages": [
                    {"stage_name": "Nursery & Sowing", "days": "Day 1 - 25", "advisory": "Prepare nursery bed. Treat seeds with Pseudomonas fluorescens (10g/kg).", "water_need": "Moderate"},
                    {"stage_name": "Transplanting & Vegetative", "days": "Day 26 - 60", "advisory": "Transplant 2-3 seedlings per hill. Apply Neem coated Urea.", "water_need": "High"},
                    {"stage_name": "Panicle Initiation & Flowering", "days": "Day 61 - 90", "advisory": "Critical water requirement stage. Monitor for stem borer attack.", "water_need": "Very High"},
                    {"stage_name": "Ripening & Harvesting", "days": "Day 91 - 120", "advisory": "Drain water 10 days before harvest. Harvest when 80% grains turn golden yellow.", "water_need": "Low"}
                ]
            },
            {
                "id": "crop-2",
                "name": "Tomato (தக்காளி)",
                "local_name": {"ta": "தக்காளி", "hi": "टमाटर", "te": "టమాటా", "kn": "ಟೊಮೆಟೊ", "ml": "തക്കാളി"},
                "category": "Vegetables",
                "duration_days": 100,
                "optimal_temp": "18°C - 30°C",
                "optimal_ph": "6.0 - 7.0",
                "ideal_season": "Rabi / Winter",
                "water_requirement": "Medium (600 - 800 mm)",
                "stages": [
                    {"stage_name": "Seedling Nursery", "days": "Day 1 - 30", "advisory": "Sow seeds in pro-trays filled with vermicompost.", "water_need": "Light"},
                    {"stage_name": "Transplanting & Staking", "days": "Day 31 - 50", "advisory": "Transplant at 60x45cm spacing. Provide bamboo staking support.", "water_need": "Moderate"}
                ]
            }
        ]
