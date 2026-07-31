import logging
from supabase import create_client, Client
from config import settings

logger = logging.getLogger("uzhavan.database")

supabase: Client = None

try:
    if settings.SUPABASE_URL and settings.SUPABASE_KEY:
        supabase = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)
        logger.info("Supabase client initialized successfully 🟢")
    else:
        logger.warning("Supabase credentials missing. Running in local fallback mode ⚠️")
except Exception as e:
    logger.error(f"Failed to initialize Supabase client: {e}")
    supabase = None

def get_supabase() -> Client:
    """Helper to return active Supabase client instance."""
    return supabase
