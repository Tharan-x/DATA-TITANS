import React, { useEffect, useState } from 'react';
import { farmApi } from '../services/farmApi';
import { CropGuideItem } from '../types';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Sprout, Calendar, Droplets, Thermometer, CheckCircle2, ShieldAlert } from 'lucide-react';

export const CropGuidePage: React.FC = () => {
  const [crops, setCrops] = useState<CropGuideItem[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<CropGuideItem | null>(null);

  useEffect(() => {
    farmApi.getCropGuides().then((data) => {
      setCrops(data);
      if (data.length > 0) setSelectedCrop(data[0]);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1E3A2B]">Crop Advisory & Growth Timeline Guide</h1>
        <p className="text-xs text-slate-500 mt-1">Stage-by-stage agronomic instructions, water requirements, and soil parameters</p>
      </div>

      {/* Horizontal Crop Selection Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-none">
        {crops.map((crop) => {
          const isSelected = selectedCrop?.id === crop.id;
          return (
            <button
              key={crop.id}
              onClick={() => setSelectedCrop(crop)}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-[#1E3A2B] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
              }`}
            >
              <Sprout className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{crop.name}</span>
            </button>
          );
        })}
      </div>

      {selectedCrop && (
        <div className="space-y-6">
          {/* Crop Overview Banner */}
          <Card className="p-6 bg-white border-emerald-100 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-black text-[#1E3A2B]">{selectedCrop.name}</h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">Category: {selectedCrop.category}</p>
              </div>
              <Badge variant="success">{selectedCrop.ideal_season}</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-emerald-600" />
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Total Duration</span>
                  <span className="text-base font-extrabold text-[#1E3A2B]">{selectedCrop.duration_days} Days</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
                <Droplets className="w-6 h-6 text-blue-600" />
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Water Demand</span>
                  <span className="text-base font-extrabold text-[#1E3A2B]">{selectedCrop.water_requirement}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
                <Thermometer className="w-6 h-6 text-amber-600" />
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Optimal Temp</span>
                  <span className="text-base font-extrabold text-[#1E3A2B]">{selectedCrop.optimal_temp}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center space-x-3">
                <Sprout className="w-6 h-6 text-purple-600" />
                <div>
                  <span className="text-xs text-slate-500 block font-semibold">Optimal Soil pH</span>
                  <span className="text-base font-extrabold text-[#1E3A2B]">{selectedCrop.optimal_ph}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Timeline Stages */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#1E3A2B]">Growth Stage Advisory Timeline</h3>
            <div className="space-y-4">
              {selectedCrop.stages.map((stage, idx) => (
                <Card key={idx} className="p-6 border-slate-200 hover:border-emerald-300 transition-all">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-black text-sm flex items-center justify-center">
                        {idx + 1}
                      </div>
                      <h4 className="text-lg font-bold text-[#1E3A2B]">{stage.stage_name}</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                      {stage.days}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {stage.advisory}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
