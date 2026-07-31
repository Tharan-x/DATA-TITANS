import React, { useEffect, useState } from 'react';
import { farmApi } from '../services/farmApi';
import { PestRiskReport } from '../types';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Bug, AlertOctagon, ShieldAlert, CloudRain, Flame, Thermometer, Droplets, CloudLightning } from 'lucide-react';

export const PestRiskPage: React.FC = () => {
  const [report, setReport] = useState<PestRiskReport | any>(null);

  useEffect(() => {
    farmApi.getPestRisk('Paddy').then(setReport);
  }, []);

  const riskSummary = report?.risk_summary || {
    heavy_rain: 'MODERATE RAIN',
    heat_risk: 'MODERATE',
    pest_risk: 'HIGH',
    disease_risk: 'HIGH (Fungus Threat)',
    water_stress: 'NORMAL'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
          <Bug className="w-7 h-7 text-orange-600" />
          <span>Past & Pest Risk Engine Warning</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Atmospheric weather triggers, flood, heat, fungus, and pest risk predictions</p>
      </div>

      {report && (
        <div className="space-y-6">
          {/* Risk Level Banner */}
          <Card className="p-8 bg-gradient-to-br from-[#1E3A2B] to-emerald-900 text-white space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-red-500 text-white flex items-center justify-center shadow-lg">
                  <Bug className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">{report.crop_name || 'Paddy Crop'} Outbreak Warning</h2>
                  <p className="text-xs text-emerald-200 mt-1">{report.district || 'Coimbatore'} District • Environmental Rule Engine</p>
                </div>
              </div>
              <Badge variant="danger" className="text-base px-4 py-1">
                {report.risk_level} RISK ({report.risk_score || 82}%)
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-emerald-200">
                <span>Integrated Risk Score</span>
                <span>{report.risk_score || 82}% Outbreak Likelihood</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-500"
                  style={{ width: `${report.risk_score || 82}%` }}
                />
              </div>
            </div>
          </Card>

          {/* 5 Predictor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card className="p-4 bg-blue-50/70 border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-800">Heavy Rain</span>
                <CloudLightning className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-base font-black text-blue-950">{riskSummary.heavy_rain}</p>
            </Card>

            <Card className="p-4 bg-orange-50/70 border-orange-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-800">Heat Risk</span>
                <Flame className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-base font-black text-orange-950">{riskSummary.heat_risk}</p>
            </Card>

            <Card className="p-4 bg-red-50/70 border-red-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-800">Pest Risk</span>
                <Bug className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-base font-black text-red-950">{riskSummary.pest_risk}</p>
            </Card>

            <Card className="p-4 bg-amber-50/70 border-amber-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800">Disease Risk</span>
                <AlertOctagon className="w-5 h-5 text-amber-600" />
              </div>
              <p className="text-base font-black text-amber-950">{riskSummary.disease_risk}</p>
            </Card>

            <Card className="p-4 bg-teal-50/70 border-teal-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800">Water Stress</span>
                <Droplets className="w-5 h-5 text-teal-600" />
              </div>
              <p className="text-base font-black text-teal-950">{riskSummary.water_stress}</p>
            </Card>
          </div>

          {/* Vulnerable Pests Grid */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-[#1E3A2B]">High Vulnerability Insect Pests</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {report.potential_pests?.map((pest: any, idx: number) => (
                <Card key={idx} className="p-5 border-slate-200 space-y-2">
                  <div className="flex items-center space-x-2 text-red-600">
                    <AlertOctagon className="w-5 h-5" />
                    <h4 className="font-bold text-[#1E3A2B] text-base">{pest.pest_name}</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-semibold">Symptom: {pest.symptoms}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Preventive Action Plan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-emerald-50/50 border-emerald-200 space-y-3">
              <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-emerald-600" />
                <span>Recommended Preventive Actions</span>
              </h3>
              <div className="space-y-2">
                {report.recommended_preventive_sprays?.map((spray: string, idx: number) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-emerald-100 text-sm font-semibold text-slate-800">
                    • {spray}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-amber-50/50 border-amber-200 space-y-3">
              <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-amber-600" />
                <span>Weather Trigger Factors</span>
              </h3>
              <div className="space-y-2">
                {report.weather_trigger_factors?.map((factor: string, idx: number) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-amber-100 text-sm font-semibold text-slate-800">
                    • {factor}
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
