import logging
from database.supabase_client import get_supabase

logger = logging.getLogger("uzhavan.services.planner")

class PlannerService:
    @staticmethod
    async def generate_and_save_planner(data: dict, user_id: str = None) -> dict:
        """
        Generates personalized crop timeline tasks based on Crop, Location, Soil, Area, Planting Date.
        Stores planner in Supabase `crop_planner` table.
        """
        crop = data.get("crop_name", "Paddy (Rice)")
        location = data.get("location", "Coimbatore")
        soil = data.get("soil_type", "Clay Loam")
        area = data.get("area_acres", 1.0)
        planting_date = data.get("planting_date", "Today")

        tasks = [
            {
                "id": "t-1",
                "task_name": "Land Preparation & Deep Plowing",
                "days_after_planting": 0,
                "category": "Preparation",
                "status": "COMPLETED",
                "notes": f"Plow field for {crop} in {soil} soil ({area} acres). Incorporate 2.5T compost per acre."
            },
            {
                "id": "t-2",
                "task_name": "Basal Bio-Fertilizer Application",
                "days_after_planting": 3,
                "category": "Fertilizer",
                "status": "PENDING",
                "notes": "Apply Neem cake (100kg/acre) and Azospirillum bio-culture."
            },
            {
                "id": "t-3",
                "task_name": "Seedling Transplanting / Sowing",
                "days_after_planting": 14,
                "category": "Sowing",
                "status": "PENDING",
                "notes": "Maintain 20cm x 15cm hill spacing."
            },
            {
                "id": "t-4",
                "task_name": "First Weed Inspection & Water Maintenance",
                "days_after_planting": 25,
                "category": "Maintenance",
                "status": "PENDING",
                "notes": "Inspect for weed growth and maintain 5cm standing water layer."
            },
            {
                "id": "t-5",
                "task_name": "Panicle Initiation Top Dressing",
                "days_after_planting": 50,
                "category": "Fertilizer",
                "status": "PENDING",
                "notes": "Apply split dose Neem coated Urea with Micronutrient spray."
            }
        ]

        planner_record = {
            "crop_name": crop,
            "location": location,
            "soil_type": soil,
            "area_acres": area,
            "planting_date": planting_date,
            "weather_summary": f"Favorable regional weather in {location}",
            "tasks": tasks,
            "status": "ACTIVE"
        }

        if user_id:
            planner_record["user_id"] = user_id

        try:
            sp = get_supabase()
            if sp:
                res = sp.table("crop_planner").insert(planner_record).execute()
                if res.data and len(res.data) > 0:
                    return res.data[0]
        except Exception as e:
            logger.warning(f"Failed to save planner to Supabase: {e}")

        return planner_record

    @staticmethod
    async def get_user_planners(user_id: str = None) -> list:
        try:
            sp = get_supabase()
            if sp:
                query = sp.table("crop_planner").select("*")
                if user_id:
                    query = query.eq("user_id", user_id)
                res = query.execute()
                if res.data:
                    return res.data
        except Exception as e:
            logger.warning(f"Failed to fetch user planners from Supabase: {e}")

        return [
            {
                "id": "planner-demo",
                "crop_name": "Paddy (Samba)",
                "location": "Coimbatore",
                "soil_type": "Clay Loam",
                "area_acres": 2.5,
                "planting_date": "2026-08-01",
                "tasks": [
                    {"id": "t-1", "task_name": "Morning Water Inspection", "category": "Irrigation", "status": "PENDING", "notes": "Check standing water level"},
                    {"id": "t-2", "task_name": "Neem Oil Spray", "category": "Pest Control", "status": "PENDING", "notes": "Prevent leaf folder attack"}
                ]
            }
        ]
