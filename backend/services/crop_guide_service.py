import logging
import json
import os
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

        # Check local backend crops.json
        try:
            json_path = os.path.join(os.path.dirname(__file__), "..", "data", "crops.json")
            if os.path.exists(json_path):
                with open(json_path, "r", encoding="utf-8") as f:
                    crops_data = json.load(f)
                    return list(crops_data.values())
        except Exception as e:
            logger.warning(f"Could not load crops.json: {e}")

        return [
            {
                "crop_name": "Paddy (Rice / நெல்)",
                "suitable_season": "Kharif / Samba (June - November)",
                "soil": "Clay loam, alluvial soil with pH 5.5 - 6.5",
                "seed_rate": "20 - 25 kg/acre for direct broadcasting; 8 - 10 kg/acre for SRI",
                "water": "1200 - 1400 mm (High standing water 5cm)",
                "fertilizer": "Neem Coated Urea (100kg/acre), DAP (50kg/acre), MOP (40kg/acre)",
                "harvest_days": "110 - 130 days",
                "common_diseases": "Paddy Leaf Blast, Sheath Blight, Stem Borer",
                "yield": "2.5 - 3.5 Tons / acre"
            },
            {
                "crop_name": "Tomato (தக்காளி)",
                "suitable_season": "Rabi / Winter (October - March)",
                "soil": "Well-drained sandy loam rich in organic matter (pH 6.0 - 7.0)",
                "seed_rate": "100 - 150 grams/acre",
                "water": "600 - 800 mm (Drip irrigation every 3-4 days)",
                "fertilizer": "Vermicompost 2T/acre, NPK 19:19:19 (5kg/acre), Calcium Nitrate",
                "harvest_days": "90 - 110 days",
                "common_diseases": "Early Blight, Late Blight, Tomato Leaf Curl Virus",
                "yield": "12 - 18 Tons / acre"
            },
            {
                "crop_name": "Cotton (பருத்தி)",
                "suitable_season": "Kharif (May - September)",
                "soil": "Deep black cotton soil or well-drained loams (pH 6.0 - 8.0)",
                "seed_rate": "1.5 - 2.0 kg/acre (Hybrid BG-II)",
                "water": "700 - 1000 mm",
                "fertilizer": "Urea 80kg/acre, SSP 150kg/acre, MOP 40kg/acre",
                "harvest_days": "150 - 180 days",
                "common_diseases": "Pink Bollworm, Fusarium Wilt, Alternaria Leaf Spot",
                "yield": "1.2 - 1.8 Tons / acre"
            },
            {
                "crop_name": "Banana (வாழை)",
                "suitable_season": "Year-round (Best Feb-Mar or Nov-Dec)",
                "soil": "Rich fertile alluvial or clay loam soil (pH 6.5 - 7.5)",
                "seed_rate": "1000 - 1200 suckers / acre",
                "water": "1500 - 2000 mm (High regular drip irrigation)",
                "fertilizer": "Potash 300g/plant, Urea 200g/plant, Neem Cake 1kg/plant",
                "harvest_days": "330 - 390 days (11 - 13 months)",
                "common_diseases": "Sigatoka Leaf Spot, Panama Wilt (Fusarium)",
                "yield": "25 - 35 Tons / acre"
            },
            {
                "crop_name": "Maize (Corn / மக்காச்சோளம்)",
                "suitable_season": "Kharif & Rabi (June-July & Oct-Nov)",
                "soil": "Well-drained fertile loamy soil (pH 6.5 - 7.5)",
                "seed_rate": "7 - 8 kg/acre",
                "water": "500 - 650 mm (Critical at tasseling and silking)",
                "fertilizer": "Urea 90kg/acre, DAP 60kg/acre, MOP 30kg/acre",
                "harvest_days": "90 - 115 days",
                "common_diseases": "Fall Armyworm (FAW), Maydis Leaf Blight",
                "yield": "3.0 - 4.0 Tons / acre"
            }
        ]
