# 🌾 UZHAVAN AI - AI Farming Decision Intelligence Platform

> **UZHAVAN AI** is a complete, production-ready agricultural companion designed to empower farmers across India with hyper-local weather advisory, Gemini AI decision intelligence, live Mandi commodity prices, disease diagnostics, soil fertilizer calculators, personalized crop planners, and 6-language regional localization with full offline resilience.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: Vite + React 18 + TypeScript + Tailwind CSS
- **Backend**: FastAPI (Python 3.10+) + Uvicorn
- **AI Engine**: Google Gemini AI (`gemini-1.5-flash` text and vision models)
- **Database & Auth**: Supabase PostgreSQL + Supabase Auth
- **Weather Telemetry**: Open-Meteo Real-Time Weather & Geocoding API
- **Deployment**: Vercel (Frontend), Render (Backend), Supabase (Database)

---

## 🌐 Supported Regional Languages (i18n)

- 🇬🇧 **English**
- 🇮🇳 **தமிழ் (Tamil)**
- 🇮🇳 **கನ್ನಡ (Kannada)**
- 🇮🇳 **മലയാളം (Malayalam)**
- 🇮🇳 **తెలుగు (Telugu)**
- 🇮🇳 **हिन्दी (Hindi)**

---

## ⚡ Quick Start Guide

### 1. Database Setup (Supabase)

1. Open your [Supabase Dashboard](https://app.supabase.com) project SQL Editor.
2. Run `backend/database/schema.sql` to initialize tables (`profiles`, `crop_planner`, `disease_history`, `knowledge_cards`, `mandi_prices`, `weather_cache`, `notifications`, `village_wisdom`) and enable Row Level Security (RLS).
3. Run `backend/database/seed.sql` to populate **20+ verified knowledge cards**, live Mandi market rates, traditional village wisdom, and notification presets.

### 2. Backend Setup (FastAPI)

```bash
cd backend
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

Create `backend/.env`:
```env
PORT=8000
ENVIRONMENT=development
GEMINI_API_KEY=your_gemini_api_key_here
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key-here
```

Start backend API:
```bash
python main.py
```
Backend Swagger API documentation will be live at `http://localhost:8000/docs`.

### 3. Frontend Setup (Vite / React)

```bash
cd frontend
npm install
```

Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key-here
```

Start development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🚀 Deployment Instructions

### Vercel Deployment (Frontend)
1. Push workspace repository to GitHub.
2. Import project into Vercel and set Root Directory to `frontend`.
3. Set Environment Variables:
   - `VITE_API_URL` -> Your deployed Render backend URL.
   - `VITE_SUPABASE_URL` -> Your Supabase project URL.
   - `VITE_SUPABASE_ANON_KEY` -> Your Supabase anon key.
4. Deploy! SPA rewrites are pre-configured in `frontend/vercel.json`.

### Render Deployment (Backend)
1. In Render Dashboard, click **New +** -> **Web Service**.
2. Select repository and set Root Directory to `backend`.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables (`GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_KEY`).

---

## 🛡️ Production Verification Checklist

- [x] Application compiles cleanly with 0 build errors (`npm run build`).
- [x] Multi-step farmer registration (11 profile attributes) connected to Supabase PostgreSQL.
- [x] Live Open-Meteo weather API integrated with Gemini AI advisory.
- [x] Dynamic Mandi rates with AI trend forecasting.
- [x] Gemini AI chat advisor returning Recommendation, Reason, Precaution, Next Action.
- [x] Gemini Vision disease detection scanner with organic/chemical remedies.
- [x] Personalized Crop Planner stored in Supabase.
- [x] 6-language instant UI localization (en, ta, hi, te, kn, ml).
- [x] 20+ verified knowledge cards with zero-internet offline caching.
