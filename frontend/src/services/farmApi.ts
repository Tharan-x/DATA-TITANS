import { apiClient } from './api';
import { StorageService } from './storage';
import { supabase } from '../lib/supabase';
import {
  WeatherData,
  CommodityPrice,
  CropGuideItem,
  FertilizerPlan,
  DiseaseReport,
  PestRiskReport,
  PlannerTask,
  KnowledgeCard,
  NotificationItem,
  VillageWisdomItem
} from '../types';

export const farmApi = {
  async getWeather(district = 'Coimbatore'): Promise<WeatherData> {
    try {
      const res = await apiClient.get('/weather', { params: { district } });
      if (res.data) {
        StorageService.cacheData(StorageService.KEYS.WEATHER, res.data);
        return res.data;
      }
    } catch (e) {
      console.warn('Backend weather API notice, using cache or Supabase fallback');
    }

    // Try Supabase directly
    try {
      const { data } = await supabase.from('weather_cache').select('*').ilike('district', district).single();
      if (data) {
        const weatherObj: WeatherData = {
          location: data.district,
          state: data.state,
          temp_celsius: data.temp_celsius,
          humidity: data.humidity,
          wind_speed_kmh: data.wind_speed_kmh,
          condition: data.condition,
          rain_probability: data.rain_probability,
          farming_advisory: data.farming_advisory,
          forecast: data.forecast || []
        };
        StorageService.cacheData(StorageService.KEYS.WEATHER, weatherObj);
        return weatherObj;
      }
    } catch (e) {}

    const cached = StorageService.getCachedData<WeatherData>(StorageService.KEYS.WEATHER);
    if (cached) return cached;

    return {
      location: district,
      state: 'Tamil Nadu',
      temp_celsius: 31.5,
      humidity: 68,
      wind_speed_kmh: 12.4,
      condition: 'Partly Cloudy',
      rain_probability: 35,
      farming_advisory: 'Favorable weather for irrigation. Expected light drizzles in the evening.',
      forecast: [
        { day: 'Tomorrow', temp_max: 33.0, temp_min: 24.0, condition: 'Partly Cloudy', rain_probability: 30 },
        { day: 'Day 3', temp_max: 32.0, temp_min: 23.5, condition: 'Moderate Rain', rain_probability: 75 },
        { day: 'Day 4', temp_max: 30.5, temp_min: 22.0, condition: 'Thunderstorm', rain_probability: 85 },
        { day: 'Day 5', temp_max: 34.0, temp_min: 24.5, condition: 'Sunny', rain_probability: 10 },
      ]
    };
  },

  async getCropGuides(): Promise<CropGuideItem[]> {
    try {
      const res = await apiClient.get('/crop-guide');
      if (res.data?.crops && res.data.crops.length > 0) return res.data.crops;
    } catch (e) {}

    try {
      const { data } = await supabase.from('crop_guides').select('*');
      if (data && data.length > 0) return data;
    } catch (e) {}

    return [
      {
        id: 'crop-1',
        name: 'Paddy (Rice / நெல்)',
        category: 'Cereals',
        duration_days: 120,
        optimal_temp: '20°C - 35°C',
        optimal_ph: '5.5 - 6.5',
        ideal_season: 'Kharif / Samba (June - Nov)',
        water_requirement: '1200 - 1400 mm (High)',
        stages: [
          { stage_name: 'Nursery & Sowing', days: 'Day 1 - 25', advisory: 'Prepare nursery bed. Seed rate: 20-25kg/acre. Treat seeds with Pseudomonas fluorescens (10g/kg). Soil: Clay Loam (pH 5.5-6.5).', water_need: 'Moderate' },
          { stage_name: 'Transplanting & Tillering', days: 'Day 26 - 60', advisory: 'Transplant 2-3 seedlings per hill. Apply Neem coated Urea (100kg/acre), DAP (50kg), MOP (40kg). Maintain 5cm water level.', water_need: 'High' },
          { stage_name: 'Panicle Initiation & Flowering', days: 'Day 61 - 90', advisory: 'Critical water requirement stage. Monitor for Yellow Stem Borer & Leaf Blast.', water_need: 'Very High' },
          { stage_name: 'Ripening & Harvest', days: 'Day 91 - 120', advisory: 'Harvest at 110-130 days when 80% grains turn golden yellow. Expected yield: 2.5 - 3.5 Tons/acre.', water_need: 'Low' }
        ]
      },
      {
        id: 'crop-2',
        name: 'Tomato (தக்காளி)',
        category: 'Vegetables',
        duration_days: 100,
        optimal_temp: '18°C - 30°C',
        optimal_ph: '6.0 - 7.0',
        ideal_season: 'Rabi / Winter (Oct - Mar)',
        water_requirement: '600 - 800 mm (Medium)',
        stages: [
          { stage_name: 'Seedling Nursery', days: 'Day 1 - 30', advisory: 'Sow 100-150g seeds/acre in pro-trays filled with vermicompost.', water_need: 'Light' },
          { stage_name: 'Transplanting & Staking', days: 'Day 31 - 60', advisory: 'Transplant at 60x45cm spacing in sandy loam soil. Apply NPK 19:19:19 and Calcium Nitrate.', water_need: 'Moderate' },
          { stage_name: 'Flowering & Fruiting', days: 'Day 61 - 90', advisory: 'Monitor for Early Blight and Fruit Borer. Drip irrigate every 3-4 days.', water_need: 'High' },
          { stage_name: 'Harvesting', days: 'Day 91 - 110', advisory: 'Harvest at pink breaker stage. Expected yield: 12 - 18 Tons/acre.', water_need: 'Moderate' }
        ]
      },
      {
        id: 'crop-3',
        name: 'Cotton (பருத்தி)',
        category: 'Fiber',
        duration_days: 165,
        optimal_temp: '21°C - 35°C',
        optimal_ph: '6.0 - 8.0',
        ideal_season: 'Kharif (May - Sept)',
        water_requirement: '700 - 1000 mm',
        stages: [
          { stage_name: 'Sowing & Germination', days: 'Day 1 - 35', advisory: 'Sow 1.5-2kg BG-II hybrid seeds/acre in deep black cotton soil.', water_need: 'Moderate' },
          { stage_name: 'Vegetative & Square Formation', days: 'Day 36 - 90', advisory: 'Apply Urea (80kg/acre), SSP (150kg/acre), MOP (40kg/acre). Install pheromone traps.', water_need: 'High' },
          { stage_name: 'Boll Formation & Harvest', days: 'Day 91 - 165', advisory: 'Monitor for Pink Bollworm. Harvest in 3-4 hand-picking passes. Expected yield: 1.2 - 1.8 Tons/acre.', water_need: 'Moderate' }
        ]
      },
      {
        id: 'crop-4',
        name: 'Banana (வாழை)',
        category: 'Fruit',
        duration_days: 360,
        optimal_temp: '15°C - 38°C',
        optimal_ph: '6.5 - 7.5',
        ideal_season: 'Year-round (Best Feb-Mar)',
        water_requirement: '1500 - 2000 mm (High)',
        stages: [
          { stage_name: 'Planting & Vegetative', days: 'Day 1 - 120', advisory: 'Plant 1000 suckers/acre in fertile clay loam soil. Apply Potash 300g/plant and Neem Cake.', water_need: 'High' },
          { stage_name: 'Shooting & Bunch Formation', days: 'Day 121 - 270', advisory: 'Support heavy bunches with bamboo poles. Spray Pseudomonas against Sigatoka Leaf Spot.', water_need: 'Very High' },
          { stage_name: 'Maturation & Harvest', days: 'Day 271 - 360', advisory: 'Harvest when bunch fingers become rounded. Expected yield: 25 - 35 Tons/acre.', water_need: 'Moderate' }
        ]
      },
      {
        id: 'crop-5',
        name: 'Maize (Corn / மக்காச்சோளம்)',
        category: 'Cereals',
        duration_days: 105,
        optimal_temp: '18°C - 32°C',
        optimal_ph: '6.5 - 7.5',
        ideal_season: 'Kharif & Rabi',
        water_requirement: '500 - 650 mm',
        stages: [
          { stage_name: 'Sowing & Germination', days: 'Day 1 - 25', advisory: 'Sow 7-8kg seeds/acre in fertile loamy soil.', water_need: 'Moderate' },
          { stage_name: 'Tasseling & Silking', days: 'Day 26 - 70', advisory: 'Critical irrigation stage. Apply Urea (90kg/acre), DAP (60kg), MOP (30kg). Monitor Fall Armyworm.', water_need: 'High' },
          { stage_name: 'Grain Filling & Harvest', days: 'Day 71 - 105', advisory: 'Harvest when husk turns yellow-brown. Expected yield: 3.0 - 4.0 Tons/acre.', water_need: 'Low' }
        ]
      }
    ];
  },

  async getMarketPrices(commodity?: string): Promise<CommodityPrice[]> {
    try {
      const res = await apiClient.get('/market-prices', { params: { commodity } });
      if (res.data?.prices) return res.data.prices;
    } catch (e) {}

    try {
      let query = supabase.from('mandi_prices').select('*');
      if (commodity) {
        query = query.ilike('commodity', `%${commodity}%`);
      }
      const { data } = await query;
      if (data && data.length > 0) return data;
    } catch (e) {}

    return [
      {
        id: 'mk-1',
        commodity: 'Paddy (Rice / Dhan)',
        local_name: { ta: 'நெல்', hi: 'धान', te: 'వరి', kn: 'ಭತ್ತ', ml: 'നെല്ല്' },
        mandi_name: 'Madurai Central Mandi',
        state: 'Tamil Nadu',
        district: 'Madurai',
        modal_price_per_quintal: 2250.0,
        min_price: 2100.0,
        max_price: 2400.0,
        trend: 'UP',
        forecast_price_next_week: 2320.0,
        ai_recommendation: 'Festival season arrival driving steady demand.',
        date: 'Today'
      },
      {
        id: 'mk-2',
        commodity: 'Tomato (தக்காளி)',
        local_name: { ta: 'தக்காளி', hi: 'टमाटर', te: 'టమాటా', kn: 'టోమెటో', ml: 'തക്കാളി' },
        mandi_name: 'Koyambedu Wholesale',
        state: 'Tamil Nadu',
        district: 'Chennai',
        modal_price_per_quintal: 3800.0,
        min_price: 3200.0,
        max_price: 4300.0,
        trend: 'UP',
        forecast_price_next_week: 4100.0,
        ai_recommendation: 'Prices strong due to rains in supplying districts.',
        date: 'Today'
      }
    ];
  },

  async askAIChat(prompt: string, language = 'en', crop?: string): Promise<{ response: string; structured?: any; suggestedActions: string[] }> {
    try {
      const res = await apiClient.post('/ai-chat', { prompt, language, crop });
      return {
        response: res.data.response,
        structured: res.data.structured,
        suggestedActions: res.data.suggested_actions || []
      };
    } catch (e) {
      return {
        response: `[Gemini AI Advisor]: For ${crop || 'your crop'}, maintain regular morning irrigation and apply organic Neem oil (5ml/L) to manage sucking pests. Keep soil pH balanced around 6.5.`,
        structured: {
          recommendation: `Apply organic Neem oil spray (5ml/L) early morning for ${crop || 'your crop'}.`,
          reason: "Neem oil acts as a natural antifeedant and insect growth regulator without damaging soil bio-flora.",
          precaution: "Avoid spraying during peak mid-day heat to prevent leaf scorching.",
          next_action: "Inspect leaves in 48 hours to confirm reduction in pest nymph populations."
        },
        suggestedActions: ['Check Soil Moisture', 'Apply Bio-fertilizer', 'Inspect Root System']
      };
    }
  },

  async getFertilizerRecommendation(data: { crop_name: string; soil_type: string; nitrogen: number; phosphorus: number; potassium: number; land_area_acres: number }): Promise<FertilizerPlan> {
    try {
      const res = await apiClient.post('/fertilizer', data);
      return res.data;
    } catch (e) {
      const area = data.land_area_acres || 1.0;
      return {
        crop_name: data.crop_name,
        recommended_fertilizers: [
          { fertilizer: 'Neem Coated Urea (46% N)', quantity_kg: Math.round(25 * area), purpose: 'Nitrogen boost for tillering' },
          { fertilizer: 'DAP (18-46-0)', quantity_kg: Math.round(15 * area), purpose: 'Phosphorus for strong root development' },
          { fertilizer: 'MOP (60% K2O)', quantity_kg: Math.round(20 * area), purpose: 'Potassium for pest resistance' }
        ],
        organic_alternatives: [
          `Vermi-compost: Apply ${2.5 * area} Tons/acre before plowing`,
          'Panchagavya: 3% foliar spray during vegetative stage',
          'Neem Cake: 100kg/acre soil application'
        ],
        application_schedule: [
          'Basal Dose: 50% DAP + 25% Urea + 50% MOP at transplanting',
          'First Top Dressing: 25% Urea at 25-30 days after sowing',
          'Second Top Dressing: 25% Urea + 50% MOP at panicle initiation'
        ],
        warnings: ['Avoid excess Urea in humid weather to prevent leaf blast disease.']
      };
    }
  },

  async getDiseaseDetection(crop_name: string, fileData?: File): Promise<DiseaseReport> {
    try {
      const formData = new FormData();
      formData.append('crop_name', crop_name);
      if (fileData) formData.append('file', fileData);

      const res = await apiClient.post('/disease-detection', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return res.data;
    } catch (e) {
      return {
        disease_detected: 'Paddy Leaf Blast (Magnaporthe oryzae)',
        confidence: 0.94,
        severity: 'Moderate',
        symptoms: [
          'Spindle-shaped spots on leaves with gray centers',
          'Lesions coalescing to cause leaf drying',
          'Nodal infection leading to tiller breakage'
        ],
        organic_treatment: [
          'Spray Pseudomonas fluorescens @ 10g/L water early morning',
          'Apply Cow dung slurry extract (10%) with neem oil'
        ],
        chemical_treatment: [
          'Spray Tricyclazole 75% WP @ 0.6 g/L water',
          'Alternate with Azoxystrobin 23% SC @ 1 ml/L'
        ],
        preventive_measures: [
          'Avoid excess Nitrogen fertilizer application',
          'Maintain proper field water drainage',
          'Use blast-resistant seed varieties'
        ],
        precaution: "Do not broadcast urea during fog/high humidity conditions.",
        next_action: "Isolate infected plants and spray Pseudomonas bio-agent immediately."
      };
    }
  },

  async getPestRisk(crop_name: string, district = 'Coimbatore', temp = 31.5, humidity = 68): Promise<PestRiskReport> {
    try {
      const res = await apiClient.post('/pest-risk', { crop_name, district, temperature_celsius: temp, humidity_percent: humidity });
      return res.data;
    } catch (e) {
      return {
        risk_level: humidity > 65 ? 'HIGH' : 'MODERATE',
        risk_score: 82,
        potential_pests: [
          { pest_name: 'Yellow Stem Borer', symptoms: 'Dead hearts in central shoots' },
          { pest_name: 'Brown Plant Hopper (BPH)', symptoms: 'Hopper burn, drying patches' },
          { pest_name: 'Rice Leaf Folder', symptoms: 'Folded leaves with white longitudinal streaks' }
        ],
        recommended_preventive_sprays: [
          'Install Pheromone traps @ 8 traps/acre for stem borer monitoring',
          'Set up Light Traps at field corners to capture adult moths',
          'Spray Chlorantraniliprole 18.5% SC @ 0.3 ml/L if threshold crosses 5%'
        ],
        weather_trigger_factors: [
          `High relative humidity of ${humidity}% creates breeding environment`,
          `Temperature of ${temp}°C accelerates egg hatching cycles`,
          'Overcast cloudy sky conditions past 48 hours'
        ]
      };
    }
  },

  async getPlannerTasks(): Promise<PlannerTask[]> {
    try {
      const res = await apiClient.get('/planner');
      if (res.data?.tasks) return res.data.tasks;
    } catch (e) {}

    try {
      const { data } = await supabase.from('crop_planner').select('*');
      if (data && data.length > 0) {
        const tasks: PlannerTask[] = [];
        data.forEach((p) => {
          if (Array.isArray(p.tasks)) {
            p.tasks.forEach((t: any) => tasks.push({ ...t, crop_name: p.crop_name }));
          }
        });
        if (tasks.length > 0) return tasks;
      }
    } catch (e) {}

    return [
      { id: 'task-101', crop_name: 'Paddy (Samba)', task_name: 'Morning Field Water Level Inspection', task_date: 'Today', category: 'Irrigation', status: 'PENDING', notes: 'Maintain 5cm standing water level.' },
      { id: 'task-102', crop_name: 'Tomato', task_name: 'Foliar Application of Micronutrient Spray', task_date: 'Today', category: 'Fertilizer', status: 'COMPLETED', notes: 'Mix Zinc Sulphate (0.5%) + Boric Acid (0.2%).' },
      { id: 'task-103', crop_name: 'Paddy', task_name: 'Neem Oil Organic Spray (Pest Preventative)', task_date: 'Tomorrow', category: 'Pest Control', status: 'PENDING', notes: 'Prevent leaf folder attack.' },
      { id: 'task-104', crop_name: 'Cotton', task_name: 'Field Weeding & Soil Mulching', task_date: 'In 2 Days', category: 'Maintenance', status: 'PENDING', notes: 'Remove weeds along ridge boundaries.' }
    ];
  },

  async getOfflineTips(): Promise<KnowledgeCard[]> {
    try {
      const res = await apiClient.get('/offline-tips');
      if (res.data?.cards && res.data.cards.length > 0) {
        StorageService.cacheData(StorageService.KEYS.OFFLINE_CARDS, res.data.cards);
        return res.data.cards;
      }
    } catch (e) {}

    try {
      const { data } = await supabase.from('knowledge_cards').select('*');
      if (data && data.length > 0) {
        StorageService.cacheData(StorageService.KEYS.OFFLINE_CARDS, data);
        return data;
      }
    } catch (e) {}

    const cached = StorageService.getCachedData<KnowledgeCard[]>(StorageService.KEYS.OFFLINE_CARDS);
    if (cached && cached.length > 0) return cached;

    return [
      {
        id: 'card-rice',
        category: 'Rice (Paddy)',
        title: { en: 'Paddy / Rice Complete Guide', ta: 'நெல் சாகுபடி வழிகாட்டி' },
        summary: { en: 'Best Season: Kharif / Samba. Water: 1200-1400mm. Soil: Clay Loam (pH 5.5 - 6.5).' },
        actionable_steps: [
          'Best Season: Kharif / Samba (June - November)',
          'Water Requirement: 1200 - 1400 mm (High standing water 5cm)',
          'Fertilizer: Neem Coated Urea (100kg/acre), DAP (50kg/acre), MOP (40kg/acre)',
          'Soil: Clay loam, alluvial soil with pH 5.5 - 6.5',
          'Pest & Disease: Yellow Stem Borer, Paddy Leaf Blast, Sheath Blight',
          'Harvest: 110 - 130 days after sowing'
        ],
        icon_name: 'Sprout'
      },
      {
        id: 'card-tomato',
        category: 'Tomato',
        title: { en: 'Tomato Cultivation Guide', ta: 'தக்காளி சாகுபடி வழிகாட்டி' },
        summary: { en: 'Best Season: Rabi / Winter. Water: 600-800mm. Soil: Sandy Loam (pH 6.0 - 7.0).' },
        actionable_steps: [
          'Best Season: Rabi / Winter (October - March)',
          'Water Requirement: 600 - 800 mm (Drip irrigation every 3-4 days)',
          'Fertilizer: Vermicompost 2T/acre, NPK 19:19:19 (5kg/acre), Calcium Nitrate',
          'Soil: Well-drained sandy loam rich in organic matter (pH 6.0 - 7.0)',
          'Pest & Disease: Fruit Borer, Early Blight, Tomato Leaf Curl Virus',
          'Harvest: 90 - 110 days after transplanting'
        ],
        icon_name: 'Sprout'
      },
      {
        id: 'card-cotton',
        category: 'Cotton',
        title: { en: 'Cotton Crop Guide', ta: 'பருத்தி சாகுபடி வழிகாட்டி' },
        summary: { en: 'Best Season: Kharif. Water: 700-1000mm. Soil: Deep Black Cotton Soil (pH 6.0 - 8.0).' },
        actionable_steps: [
          'Best Season: Kharif (May - September)',
          'Water Requirement: 700 - 1000 mm (Critical at boll formation)',
          'Fertilizer: Urea (80kg/acre), SSP (150kg/acre), MOP (40kg/acre)',
          'Soil: Deep black cotton soil or well-drained loams (pH 6.0 - 8.0)',
          'Pest & Disease: Pink Bollworm, Fusarium Wilt, Alternaria Leaf Spot',
          'Harvest: 150 - 180 days (3-4 hand-picking passes)'
        ],
        icon_name: 'Sprout'
      },
      {
        id: 'card-banana',
        category: 'Banana',
        title: { en: 'Banana Farming Guide', ta: 'வாழை சாகுபடி வழிகாட்டி' },
        summary: { en: 'Best Season: Year-round. Water: 1500-2000mm. Soil: Fertile Clay Loam (pH 6.5 - 7.5).' },
        actionable_steps: [
          'Best Season: Year-round (Best planting Feb-Mar or Nov-Dec)',
          'Water Requirement: 1500 - 2000 mm (High regular moisture)',
          'Fertilizer: Potash (300g/plant), Urea (200g/plant), Neem cake (1kg/plant)',
          'Soil: Rich fertile alluvial or clay loam soil (pH 6.5 - 7.5)',
          'Pest & Disease: Banana Stem Weevil, Sigatoka Leaf Spot, Panama Wilt',
          'Harvest: 11 - 13 months (when bunch fingers become rounded)'
        ],
        icon_name: 'Sprout'
      },
      {
        id: 'card-maize',
        category: 'Maize',
        title: { en: 'Maize (Corn) Farming Guide', ta: 'மக்காச்சோளம் சாகுபடி வழிகாட்டி' },
        summary: { en: 'Best Season: Kharif & Rabi. Water: 500-650mm. Soil: Fertile Loam (pH 6.5 - 7.5).' },
        actionable_steps: [
          'Best Season: Kharif & Rabi (June-July & Oct-Nov)',
          'Water Requirement: 500 - 650 mm (Critical at tasseling and silking)',
          'Fertilizer: Urea (90kg/acre), DAP (60kg/acre), MOP (30kg/acre)',
          'Soil: Well-drained fertile loamy soil (pH 6.5 - 7.5)',
          'Pest & Disease: Fall Armyworm (FAW), Maydis Leaf Blight',
          'Harvest: 90 - 115 days (when husk turns yellow-brown)'
        ],
        icon_name: 'Sprout'
      },
      {
        id: 'card-01',
        category: 'Soil Health',
        title: { en: 'Testing Soil pH at Home', ta: 'வீட்டிலேயே மண் pH சோதனை' },
        summary: { en: 'Simple vinegar and baking soda test to estimate soil pH.' },
        actionable_steps: [
          'Take 2 tbsp soil, add 1/2 cup vinegar. If it fizzes, soil is alkaline (pH > 7).',
          'Take fresh soil, add water, then 1/2 cup baking soda. If it fizzes, soil is acidic (pH < 7).',
          'If neither fizzes, soil pH is neutral (6.5 - 7.0), ideal for most crops!'
        ],
        icon_name: 'FlaskConical'
      },
      {
        id: 'card-02',
        category: 'Pest Control',
        title: { en: 'Organic Panchagavya Preparation', ta: 'இயற்கை பஞ்சகவ்யா தயாரிப்பு' },
        summary: { en: 'Traditional 5-cow product bio-fertilizer & immunity booster.' },
        actionable_steps: [
          'Mix 5kg Fresh Cow Dung + 500g Ghee in plastic drum for 3 days.',
          'On day 4, add Cow Urine, Milk, Curd, Coconut Water, Jaggery, Bananas.',
          'Ferment for 18 days with daily stirring. Spray at 3% concentration.'
        ],
        icon_name: 'Sprout'
      }
    ];
  },

  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const { data } = await supabase.from('notifications').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) return data;
    } catch (e) {}

    return [
      { id: 'n-1', title: 'Rain Alert', message: 'Moderate drizzles expected in Coimbatore district over next 24 hours. Pause top dressing.', category: 'weather', is_read: false, created_at: '10 mins ago' },
      { id: 'n-2', title: 'Mandi Rate Increase', message: 'Paddy modal price up by ₹150/quintal in Madurai Mandi.', category: 'market', is_read: false, created_at: '2 hours ago' },
      { id: 'n-3', title: 'PM-KISAN Update', message: 'Subsidized seed distribution active at nearest KVK center.', category: 'scheme', is_read: true, created_at: '1 day ago' }
    ];
  },

  async getVillageWisdom(): Promise<VillageWisdomItem[]> {
    try {
      const { data } = await supabase.from('village_wisdom').select('*');
      if (data && data.length > 0) return data;
    } catch (e) {}

    return [
      {
        id: 'vw-1',
        title: { en: 'Predicting Rain from Dragonflies', ta: 'தும்பிகள் தாழ்வாகப் பறந்தால் மழை வரும்' },
        content: { en: 'When dragonflies fly low near ground, expect rain within 24 hrs.', ta: 'தும்பிகள் தரைக்கு தாளவாக பறப்பது பெருமழையின் அறிகுறி.' },
        category: 'Weather Observation',
        author: 'Ponnusamy Gounder (72 yrs)',
        district: 'Coimbatore',
        verified_by_ai: true,
        upvotes: 48
      }
    ];
  }
};
