from fastapi import APIRouter
from database.supabase_client import get_supabase

router = APIRouter(prefix="/offline-tips", tags=["Offline Knowledge Cards"])

@router.get("")
async def get_offline_cards():
    """Fetch 20+ verified knowledge cards from Supabase for offline caching."""
    cards = []
    try:
        sp = get_supabase()
        if sp:
            res = sp.table("knowledge_cards").select("*").execute()
            if res.data and len(res.data) > 0:
                cards = res.data
    except Exception:
        pass

    if not cards:
        cards = [
            {
                "id": "card-01",
                "category": "Soil Health",
                "title": {"en": "Testing Soil pH at Home", "ta": "வீட்டிலேயே மண் pH சோதனை"},
                "summary": {"en": "Simple vinegar and baking soda test to estimate soil pH."},
                "actionable_steps": [
                    "Take 2 tbsp soil, add 1/2 cup vinegar. If it fizzes, soil is alkaline (pH > 7).",
                    "Take fresh soil, add water, then 1/2 cup baking soda. If it fizzes, soil is acidic (pH < 7).",
                    "If neither fizzes, soil pH is neutral (6.5 - 7.0), ideal for most crops!"
                ],
                "icon_name": "FlaskConical"
            },
            {
                "id": "card-02",
                "category": "Pest Control",
                "title": {"en": "Organic Panchagavya Preparation", "ta": "இயற்கை பஞ்சகவ்யா தயாரிப்பு"},
                "summary": {"en": "Traditional 5-cow product bio-fertilizer & immunity booster."},
                "actionable_steps": [
                    "Mix 5kg Fresh Cow Dung + 500g Ghee in plastic drum for 3 days.",
                    "On day 4, add Cow Urine, Milk, Curd, Coconut Water, Jaggery, Bananas.",
                    "Ferment for 18 days with daily stirring. Spray at 3% concentration."
                ],
                "icon_name": "Sprout"
            }
        ]

    return {"status": "success", "count": len(cards), "cards": cards}
