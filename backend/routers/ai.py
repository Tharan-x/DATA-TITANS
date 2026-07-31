from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.gemini_service import GeminiService

router = APIRouter(prefix="/ai-chat", tags=["AI Advisor"])

class AIChatRequest(BaseModel):
    prompt: str
    language: Optional[str] = "en"
    crop: Optional[str] = "General"

@router.post("")
async def ask_ai_chat(req: AIChatRequest):
    """
    Query Gemini AI farming companion.
    Returns structured answer with: Recommendation, Reason, Precaution, Next Action.
    """
    res = await GeminiService.generate_farming_advice(req.prompt, req.crop, req.language)
    return {
        "status": "success",
        "response": res["raw_response"],
        "structured": res["structured"],
        "suggested_actions": [
            "Check soil moisture level",
            "Review recommended bio-fertilizer schedule",
            "Inspect leaf underside for pest activity"
        ]
    }
