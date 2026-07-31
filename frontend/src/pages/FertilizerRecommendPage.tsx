import React, { useState } from 'react';
import { farmApi } from '../services/farmApi';
import { FertilizerPlan } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { FlaskConical, Calendar, AlertTriangle, Sprout, CheckCircle2 } from 'lucide-react';

export const FertilizerRecommendPage: React.FC = () => {
  const [crop, setCrop] = useState('Paddy (Rice)');
  const [acres, setAcres] = useState(2.0);
  const [nitrogen, setNitrogen] = useState(40);
  const [phosphorus, setPhosphorus] = useState(20);
  const [potassium, setPotassium] = useState(30);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<FertilizerPlan | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    const res = await farmApi.getFertilizerRecommendation({
      crop_name: crop,
      soil_type: 'Clay Loam',
      nitrogen,
      phosphorus,
      potassium,
      land_area_acres: acres,
    });
    setPlan(res);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
          <FlaskConical className="w-7 h-7 text-indigo-600" />
          <span>Fertilizer Dosage & NPK Soil Calculator</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Calculate precise Urea, DAP, and MOP dosage based on soil NPK levels and land acreage</p>
      </div>

      {/* Input Sliders Card */}
      <Card className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Crop</label>
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-white font-semibold text-sm text-slate-800 outline-none"
            >
              <option value="Paddy (Rice)">Paddy (Rice / நெல்)</option>
              <option value="Tomato">Tomato (தக்காளி)</option>
              <option value="Cotton">Cotton (பருத்தி)</option>
              <option value="Banana">Banana (வாழை)</option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Land Area (Acres):</label>
              <span className="text-base font-black text-emerald-700">{acres} Acres</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="20"
              step="0.5"
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>
        </div>

        {/* N-P-K Sliders */}
        <div className="space-y-4 pt-2">
          <h3 className="text-sm font-bold text-[#1E3A2B]">Soil Test NPK Values (kg/acre):</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-emerald-700">Nitrogen (N)</span>
                <span>{nitrogen} kg/acre</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={nitrogen}
                onChange={(e) => setNitrogen(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-blue-700">Phosphorus (P)</span>
                <span>{phosphorus} kg/acre</span>
              </div>
              <input
                type="range"
                min="5"
                max="60"
                value={phosphorus}
                onChange={(e) => setPhosphorus(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-purple-700">Potassium (K)</span>
                <span>{potassium} kg/acre</span>
              </div>
              <input
                type="range"
                min="5"
                max="80"
                value={potassium}
                onChange={(e) => setPotassium(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleCalculate} loading={loading} variant="primary" className="w-full h-12 text-base">
          Calculate Organic & Inorganic Fertilizer Schedule
        </Button>
      </Card>

      {/* Results View */}
      {plan && (
        <div className="space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-[#1E3A2B] border-b border-slate-100 pb-3">
              🧪 Inorganic Fertilizer Dosage ({acres} Acres Total)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {plan.recommended_fertilizers.map((fert, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-[#1E3A2B] text-base">{fert.fertilizer}</h4>
                    <p className="text-xs text-slate-500 mt-1">{fert.purpose}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-500">Required Quantity</span>
                    <span className="text-xl font-black text-emerald-700">{fert.quantity_kg} kg</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Organic Alternatives & Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-emerald-50/50 border-emerald-200 space-y-3">
              <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
                <Sprout className="w-5 h-5 text-emerald-600" />
                <span>🌱 Organic Alternatives</span>
              </h3>
              <div className="space-y-2">
                {plan.organic_alternatives.map((alt, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-100 text-sm font-semibold text-slate-800">
                    • {alt}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-blue-50/50 border-blue-200 space-y-3">
              <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span>📅 Top-Dressing Application Schedule</span>
              </h3>
              <div className="space-y-2">
                {plan.application_schedule.map((sch, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-blue-100 text-sm font-semibold text-slate-800">
                    • {sch}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
