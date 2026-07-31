// 🌾 UZHAVAN AI - Web Application TypeScript Global Types

export type SupportedLanguage = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  preferredLanguage: SupportedLanguage;
  farmSize: number;
  cropGrowing: string;
  cropVariety: string;
  sowingDate: string;
  landType: string;
  email?: string;
}

export interface WeatherForecastDay {
  day: string;
  temp_max: number;
  temp_min: number;
  condition: string;
  rain_probability: number;
}

export interface WeatherData {
  location: string;
  state: string;
  temp_celsius: number;
  humidity: number;
  wind_speed_kmh: number;
  condition: string;
  rain_probability: number;
  farming_advisory: string;
  forecast: WeatherForecastDay[];
}

export interface CommodityPrice {
  id: string;
  commodity: string;
  local_name?: Record<string, string>;
  mandi_name: string;
  state: string;
  district: string;
  modal_price_per_quintal: number;
  min_price: number;
  max_price: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  forecast_price_next_week?: number;
  ai_recommendation?: string;
  date: string;
}

export interface CropStageInfo {
  stage_name: string;
  days: string;
  advisory: string;
  water_need: string;
}

export interface CropGuideItem {
  id: string;
  name: string;
  local_name: Record<string, string>;
  category: string;
  duration_days: number;
  optimal_temp: string;
  optimal_ph: string;
  ideal_season: string;
  water_requirement: string;
  stages: CropStageInfo[];
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  suggestedActions?: string[];
  timestamp: string;
}

export interface FertilizerPlan {
  crop_name: string;
  recommended_fertilizers: Array<{
    fertilizer: string;
    quantity_kg: number;
    purpose: string;
  }>;
  organic_alternatives: string[];
  application_schedule: string[];
  warnings?: string[];
}

export interface DiseaseReport {
  disease_detected: string;
  confidence: number;
  severity: 'Low' | 'Moderate' | 'High';
  symptoms: string[];
  organic_treatment: string[];
  chemical_treatment: string[];
  preventive_measures: string[];
  precaution?: string;
  next_action?: string;
}

export interface PestRiskReport {
  risk_level: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  risk_score: number;
  potential_pests: Array<{ pest_name: string; symptoms: string }>;
  recommended_preventive_sprays: string[];
  weather_trigger_factors: string[];
}

export interface PlannerTask {
  id: string;
  crop_name: string;
  task_name: string;
  task_date: string;
  category: string;
  status: 'PENDING' | 'COMPLETED';
  notes?: string;
}

export interface KnowledgeCard {
  id: string;
  category: string;
  title: Record<string, string>;
  summary: Record<string, string>;
  actionable_steps: string[];
  icon_name: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'weather' | 'market' | 'disease' | 'planner' | 'scheme' | 'general';
  is_read: boolean;
  created_at: string;
}

export interface VillageWisdomItem {
  id: string;
  title: Record<string, string>;
  content: Record<string, string>;
  category: string;
  author: string;
  district: string;
  verified_by_ai: boolean;
  upvotes: number;
}

export type WebPageId =
  | 'hero'
  | 'language'
  | 'login'
  | 'dashboard'
  | 'weather'
  | 'crop-guide'
  | 'ai-advisor'
  | 'disease-detection'
  | 'market-prices'
  | 'fertilizer'
  | 'pest-risk'
  | 'planner'
  | 'village-wisdom'
  | 'offline-cards'
  | 'settings';
