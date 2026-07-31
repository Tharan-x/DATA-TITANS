from fastapi import APIRouter
from services.crop_guide_service import CropGuideService

router = APIRouter(prefix="/crop-guide", tags=["Crop Guide"])

@router.get("")
async def get_crop_guides():
    try:
        crops = await CropGuideService.get_all_crop_guides()
        return {"status": "success", "crops": crops}
    except Exception as e:
        return {"status": "success", "crops": []}
