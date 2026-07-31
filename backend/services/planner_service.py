import logging
from database.supabase_client import get_supabase

logger = logging.getLogger("uzhavan.services.planner")

class PlannerService:
    @staticmethod
    def generate_daily_schedule(crop: str = "Paddy (Rice)", growth_stage: str = "Vegetative", weather: str = "Partly Cloudy") -> dict:
        """
        Generates structured Morning, Afternoon, Evening schedule based on crop, growth stage, and weather using rule engine.
        """
        crop_lower = crop.lower()
        stage_lower = growth_stage.lower()

        # Morning Rule
        if "rice" in crop_lower or "paddy" in crop_lower:
            morning = "Inspect leaves for stem borer dead-hearts and check standing water level (maintain 5cm)."
        elif "tomato" in crop_lower:
            morning = "Inspect leaf undersides for whitefly clusters and early blight yellowing spots."
        else:
            morning = f"Inspect {crop} leaves for pest nymphs and check soil moisture consistency."

        # Afternoon Rule
        if "rain" in weather.lower() or "shower" in weather.lower():
            afternoon = "Pause irrigation due to rainfall forecast; clear field drainage channels to prevent waterlogging."
        elif "hot" in weather.lower() or "sunny" in weather.lower() or "clear" in weather.lower():
            afternoon = f"Irrigate {crop} field for 30 to 45 minutes; apply drip moisture to avoid leaf wilt."
        else:
            afternoon = f"Irrigate 30 minutes and inspect stake supports / bund stability for {crop}."

        # Evening Rule
        if "flowering" in stage_lower or "vegetative" in stage_lower:
            evening = "Spray organic Neem oil (5ml/L) or Panchagavya 3% foliar spray to boost immunity."
        else:
            evening = f"Apply organic compost top-dressing and conduct final field perimeter check for {crop}."

        return {
            "crop": crop,
            "growth_stage": growth_stage,
            "weather": weather,
            "schedule": {
                "morning": morning,
                "afternoon": afternoon,
                "evening": evening
            }
        }

    @staticmethod
    async def generate_and_save_planner(data: dict, user_id: str = None) -> dict:
        crop = data.get("crop_name", "Paddy (Rice)")
        location = data.get("location", "Coimbatore")
        soil = data.get("soil_type", "Clay Loam")
        area = data.get("area_acres", 1.0)
        planting_date = data.get("planting_date", "Today")

        schedule = PlannerService.generate_daily_schedule(crop, "Vegetative", f"Favorable climate in {location}")

        tasks = [
            {
                "id": "t-1",
                "task_name": "Morning Activity: " + schedule["schedule"]["morning"],
                "days_after_planting": 0,
                "category": "Morning",
                "status": "PENDING",
                "notes": "Daily morning inspection task."
            },
            {
                "id": "t-2",
                "task_name": "Afternoon Activity: " + schedule["schedule"]["afternoon"],
                "days_after_planting": 0,
                "category": "Afternoon",
                "status": "PENDING",
                "notes": "Daily afternoon irrigation / drainage task."
            },
            {
                "id": "t-3",
                "task_name": "Evening Activity: " + schedule["schedule"]["evening"],
                "days_after_planting": 0,
                "category": "Evening",
                "status": "PENDING",
                "notes": "Daily evening spray / organic application task."
            }
        ]

        planner_record = {
            "crop_name": crop,
            "location": location,
            "soil_type": soil,
            "area_acres": area,
            "planting_date": planting_date,
            "weather_summary": f"Favorable regional weather in {location}",
            "daily_schedule": schedule["schedule"],
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

        default_sched = PlannerService.generate_daily_schedule("Paddy (Samba)", "Vegetative", "Partly Cloudy")
        return [
            {
                "id": "planner-demo",
                "crop_name": "Paddy (Samba)",
                "location": "Coimbatore",
                "soil_type": "Clay Loam",
                "area_acres": 2.5,
                "planting_date": "2026-08-01",
                "daily_schedule": default_sched["schedule"],
                "tasks": [
                    {"id": "t-1", "task_name": "Morning: " + default_sched["schedule"]["morning"], "category": "Morning", "status": "PENDING", "notes": "Check standing water level"},
                    {"id": "t-2", "task_name": "Afternoon: " + default_sched["schedule"]["afternoon"], "category": "Afternoon", "status": "PENDING", "notes": "Irrigation check"},
                    {"id": "t-3", "task_name": "Evening: " + default_sched["schedule"]["evening"], "category": "Evening", "status": "PENDING", "notes": "Preventive spray"}
                ]
            }
        ]
