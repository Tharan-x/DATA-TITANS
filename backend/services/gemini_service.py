import logging
import json
import google.generativeai as genai
from config import settings

logger = logging.getLogger("uzhavan.services.gemini")

if settings.GEMINI_API_KEY:
    try:
        genai.configure(api_key=settings.GEMINI_API_KEY)
        logger.info("Gemini AI API configured successfully 🟢")
    except Exception as e:
        logger.error(f"Failed to configure Gemini AI: {e}")

class GeminiService:
    @staticmethod
    def get_text_model():
        try:
            return genai.GenerativeModel('gemini-1.5-flash')
        except Exception:
            return None

    @staticmethod
    async def generate_farming_advice(prompt: str, crop: str = "General", language: str = "en") -> dict:
        """
        Generates structured AI advisory with mandatory fields:
        Recommendation, Reason, Precaution, Next Action
        """
        lang_names = {
            "en": "English", "ta": "Tamil", "hi": "Hindi", 
            "te": "Telugu", "kn": "Kannada", "ml": "Malayalam"
        }
        target_lang = lang_names.get(language, "English")

        sys_instruction = (
            f"You are UZHAVAN AI, an expert agricultural advisor for Indian farmers. "
            f"Answer the query in {target_lang}. "
            f"You MUST structure your response into 4 distinct sections:\n"
            f"1. Recommendation: Direct actionable farming advice.\n"
            f"2. Reason: Clear agricultural explanation.\n"
            f"3. Precaution: Safety or preventive guidance.\n"
            f"4. Next Action: Immediate step for the farmer.\n"
            f"Keep language simple, farmer-friendly, and practical."
        )

        try:
            model = GeminiService.get_text_model()
            if model and settings.GEMINI_API_KEY:
                full_prompt = f"{sys_instruction}\n\nCrop: {crop}\nUser Query: {prompt}"
                response = model.generate_content(full_prompt)
                text = response.text if response else ""
                
                return {
                    "raw_response": text,
                    "structured": GeminiService._parse_structured_response(text, target_lang)
                }
        except Exception as e:
            logger.warning(f"Gemini API call failed, using fallback: {e}")

        # Fallback structured advice
        return {
            "raw_response": f"[UZHAVAN AI]: For {crop}, maintain optimal irrigation and inspect leaves for pests.",
            "structured": {
                "recommendation": f"Maintain regular moisture and check soil condition for {crop}.",
                "reason": "Optimal moisture ensures healthy root uptake and prevents drought stress.",
                "precaution": "Avoid waterlogging near root zones to prevent root rot fungus.",
                "next_action": "Inspect leaf underside in the morning for sucking pests or discoloration."
            }
        }

    @staticmethod
    async def analyze_disease_image(image_bytes: bytes, crop_name: str = "Crop") -> dict:
        """
        Analyzes crop image using Gemini Vision model.
        If no image uploaded: Prompts user to upload image.
        If Gemini Vision unavailable: Uses heuristic fallback without hallucinating.
        """
        if not image_bytes or len(image_bytes) == 0:
            return {
                "status": "error",
                "message": "Please upload a crop image to analyze disease.",
                "disease_detected": None,
                "confidence": 0,
                "severity": "None",
                "symptoms": [],
                "organic_treatment": [],
                "chemical_treatment": [],
                "precaution": "",
                "next_action": ""
            }

        try:
            if settings.GEMINI_API_KEY:
                model = genai.GenerativeModel('gemini-1.5-flash')
                image_parts = [{"mime_type": "image/jpeg", "data": image_bytes}]
                prompt = (
                    f"Analyze this image of a {crop_name} plant. Identify any visible plant disease. "
                    f"Provide response in JSON format with keys: "
                    f"disease_detected, confidence (0.0 to 1.0), severity (Low/Moderate/High), "
                    f"symptoms (list of strings), organic_treatment (list of strings), "
                    f"chemical_treatment (list of strings), precaution (string), next_action (string)."
                )
                response = model.generate_content([prompt, image_parts[0]])
                if response and response.text:
                    clean_text = response.text.replace("```json", "").replace("```", "").strip()
                    parsed = json.loads(clean_text)
                    parsed["status"] = "success"
                    return parsed
        except Exception as e:
            logger.warning(f"Gemini Vision failed or no key: {e}")

        # Fallback when Gemini vision is unavailable
        return {
            "status": "unavailable",
            "message": "Image analysis unavailable. Please try again.",
            "disease_detected": "Image Analysis Unavailable",
            "confidence": 0.0,
            "severity": "None",
            "symptoms": [
                "Image analysis unavailable. Please try again."
            ],
            "organic_treatment": [],
            "chemical_treatment": [],
            "precaution": "Please ensure you have an active network connection or valid Gemini API key.",
            "next_action": "Try uploading a clear, well-lit image again."
        }

    @staticmethod
    def _parse_structured_response(text: str, language: str) -> dict:
        lines = text.split("\n")
        rec, reason, prec, action = "", "", "", ""
        
        current_section = None
        for line in lines:
            line_str = line.strip()
            if "1. Recommendation" in line_str or "Recommendation:" in line_str:
                current_section = "rec"
                continue
            elif "2. Reason" in line_str or "Reason:" in line_str:
                current_section = "reason"
                continue
            elif "3. Precaution" in line_str or "Precaution:" in line_str:
                current_section = "prec"
                continue
            elif "4. Next Action" in line_str or "Next Action:" in line_str:
                current_section = "action"
                continue

            if current_section == "rec":
                rec += " " + line_str
            elif current_section == "reason":
                reason += " " + line_str
            elif current_section == "prec":
                prec += " " + line_str
            elif current_section == "action":
                action += " " + line_str

        return {
            "recommendation": rec.strip() or text[:150],
            "reason": reason.strip() or "Based on agricultural best practices for your region.",
            "precaution": prec.strip() or "Monitor field moisture and avoid chemical over-application.",
            "next_action": action.strip() or "Inspect crops daily and consult local KVK center if symptoms persist."
        }
