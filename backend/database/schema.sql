-- 🌾 UZHAVAN AI - Supabase Database Schema
-- Run this SQL in your Supabase SQL Editor to create tables, indexes, triggers, and RLS policies.

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 1. PROFILES TABLE (User Profile & Farm Details)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    state TEXT NOT NULL DEFAULT 'Tamil Nadu',
    district TEXT NOT NULL DEFAULT 'Coimbatore',
    village TEXT,
    preferred_language TEXT NOT NULL DEFAULT 'ta',
    farm_size NUMERIC DEFAULT 1.0,
    crop_growing TEXT DEFAULT 'Paddy (Rice)',
    crop_variety TEXT DEFAULT 'Samba / CO-51',
    sowing_date DATE DEFAULT CURRENT_DATE,
    land_type TEXT DEFAULT 'Clay Loam',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 2. CROP PLANNER TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.crop_planner (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_name TEXT NOT NULL,
    location TEXT NOT NULL,
    soil_type TEXT,
    area_acres NUMERIC DEFAULT 1.0,
    planting_date DATE,
    weather_summary TEXT,
    tasks JSONB NOT NULL DEFAULT '[]'::jsonb,
    status TEXT DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 3. DISEASE HISTORY TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.disease_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    crop_name TEXT NOT NULL,
    image_url TEXT,
    disease_detected TEXT NOT NULL,
    confidence NUMERIC DEFAULT 0.90,
    severity TEXT DEFAULT 'Moderate',
    symptoms JSONB DEFAULT '[]'::jsonb,
    organic_treatment JSONB DEFAULT '[]'::jsonb,
    chemical_treatment JSONB DEFAULT '[]'::jsonb,
    preventive_measures JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 4. KNOWLEDGE CARDS TABLE (Offline Knowledge Base)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.knowledge_cards (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title JSONB NOT NULL,
    summary JSONB NOT NULL,
    actionable_steps JSONB NOT NULL,
    icon_name TEXT DEFAULT 'Sprout',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 5. MANDI PRICES TABLE (Live & Forecasted Market Rates)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.mandi_prices (
    id TEXT PRIMARY KEY,
    commodity TEXT NOT NULL,
    local_name JSONB DEFAULT '{}'::jsonb,
    mandi_name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    modal_price_per_quintal NUMERIC NOT NULL,
    min_price NUMERIC NOT NULL,
    max_price NUMERIC NOT NULL,
    trend TEXT DEFAULT 'STABLE',
    forecast_price_next_week NUMERIC,
    ai_recommendation TEXT,
    date TEXT DEFAULT 'Today',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 6. WEATHER CACHE TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.weather_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    district TEXT UNIQUE NOT NULL,
    state TEXT NOT NULL DEFAULT 'Tamil Nadu',
    temp_celsius NUMERIC NOT NULL,
    humidity NUMERIC NOT NULL,
    wind_speed_kmh NUMERIC NOT NULL,
    condition TEXT NOT NULL,
    rain_probability NUMERIC NOT NULL,
    farming_advisory TEXT,
    forecast JSONB NOT NULL DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 7. NOTIFICATIONS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    category TEXT DEFAULT 'general', -- weather, market, disease, planner, scheme
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- 8. VILLAGE WISDOM TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.village_wisdom (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title JSONB NOT NULL,
    content JSONB NOT NULL,
    category TEXT DEFAULT 'Traditional Knowledge',
    author TEXT DEFAULT 'Experienced Farmer',
    district TEXT DEFAULT 'Coimbatore',
    verified_by_ai BOOLEAN DEFAULT TRUE,
    upvotes INT DEFAULT 12,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_planner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mandi_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.village_wisdom ENABLE ROW LEVEL SECURITY;

-- Public read access for knowledge cards, mandi prices, weather cache, village wisdom
CREATE POLICY "Public Knowledge Cards are viewable by all" ON public.knowledge_cards FOR SELECT USING (true);
CREATE POLICY "Public Mandi Prices are viewable by all" ON public.mandi_prices FOR SELECT USING (true);
CREATE POLICY "Public Weather Cache is viewable by all" ON public.weather_cache FOR SELECT USING (true);
CREATE POLICY "Public Village Wisdom is viewable by all" ON public.village_wisdom FOR SELECT USING (true);

-- Profiles RLS
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Crop Planner RLS
CREATE POLICY "Users can view own planner tasks" ON public.crop_planner FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert own planner tasks" ON public.crop_planner FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update own planner tasks" ON public.crop_planner FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- Disease History RLS
CREATE POLICY "Users can view own disease history" ON public.disease_history FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can insert own disease history" ON public.disease_history FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Notifications RLS
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- ==========================================
-- AUTOMATIC UPDATED_AT TRIGGER
-- ==========================================
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_modtime BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_crop_planner_modtime BEFORE UPDATE ON public.crop_planner FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
