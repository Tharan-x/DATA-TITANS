from fastapi import APIRouter, File, UploadFile, Form
from typing import Optional
from services.gemini_service import GeminiService

router = APIRouter(prefix="/disease-detection", tags=["Disease Scanner"])

@router.post("")
async def detect_disease(
    crop_name: Optional[str] = Form(default="Paddy (Rice)"),
    symptoms_description: Optional[str] = Form(default=None),
    file: Optional[UploadFile] = File(default=None)
):
    """
    Analyzes crop disease using Gemini Vision API or expert diagnosis models.
    """
    image_bytes = None
    if file and file.filename:
        image_bytes = await file.read()

    res = await GeminiService.analyze_disease_image(image_bytes, crop_name)
    return res
