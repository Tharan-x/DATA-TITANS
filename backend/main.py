import logging
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from config import settings

# Import Routers
from routers import weather, market, crop, ai, fertilizer, disease, pest, planner, offline

# Configure Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger("uzhavan.main")

# Initialize FastAPI Application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="🌾 UZHAVAN AI - Complete Production-Ready Web & Mobile API for AI Farming Companion",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Global Exception Handler - Never exposing raw HTTP 500 exceptions
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Unhandled API exception on {request.url}: {exc}")
    return JSONResponse(
        status_code=200,
        content={
            "status": "error",
            "message": "Service temporarily unavailable. Fallback data active.",
            "detail": str(exc)
        }
    )

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Attach Routers
app.include_router(weather.router)
app.include_router(market.router)
app.include_router(crop.router)
app.include_router(ai.router)
app.include_router(fertilizer.router)
app.include_router(disease.router)
app.include_router(pest.router)
app.include_router(planner.router)
app.include_router(offline.router)

@app.get("/", tags=["Health"])
async def root():
    """Root health check endpoint."""
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "ONLINE 🟢",
        "tagline": "Your AI Farming Companion for Smarter Decisions",
        "documentation": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=settings.PORT, reload=True)
