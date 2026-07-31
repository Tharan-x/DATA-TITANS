from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.planner_service import PlannerService

router = APIRouter(prefix="/planner", tags=["Crop Planner"])

class CreatePlannerRequest(BaseModel):
    crop_name: str
    location: str
    soil_type: Optional[str] = "Clay Loam"
    area_acres: Optional[float] = 1.0
    planting_date: Optional[str] = "2026-08-01"
    user_id: Optional[str] = None

@router.get("")
async def get_planner_tasks(user_id: Optional[str] = None):
    """Retrieve planner tasks for user."""
    planners = await PlannerService.get_user_planners(user_id)
    all_tasks = []
    for p in planners:
        tasks = p.get("tasks", [])
        if isinstance(tasks, list):
            for t in tasks:
                t["crop_name"] = p.get("crop_name", "Crop")
                all_tasks.append(t)
    return {"status": "success", "tasks": all_tasks}

@router.post("")
async def create_crop_planner(req: CreatePlannerRequest):
    """Generate personalized crop schedule stored in Supabase."""
    planner = await PlannerService.generate_and_save_planner(req.dict(), req.user_id)
    return {"status": "success", "planner": planner}
