import React, { useEffect, useState } from 'react';
import { usePlannerStore } from '../store/usePlannerStore';
import { useUserStore } from '../store/useUserStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { TRANSLATIONS } from '../constants/translations';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { farmApi } from '../services/farmApi';
import { CalendarCheck, CheckCircle2, Circle, Droplets, SprayCan, Sprout, Plus, Sparkles, MapPin, Calendar, Layers } from 'lucide-react';

export const DailyPlannerPage: React.FC = () => {
  const { tasks, fetchTasks, toggleTaskStatus } = usePlannerStore();
  const { user } = useUserStore();
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [showForm, setShowForm] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Form parameters: Crop, Location, Soil, Area, Planting Date, Weather
  const [crop, setCrop] = useState(user.cropGrowing || 'Paddy (Rice)');
  const [location, setLocation] = useState(user.district || 'Coimbatore');
  const [soil, setSoil] = useState(user.landType || 'Clay Loam');
  const [area, setArea] = useState(user.farmSize || 1.0);
  const [plantingDate, setPlantingDate] = useState(user.sowingDate || '2026-08-01');

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleGeneratePlanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    try {
      await farmApi.getPlannerTasks(); // Sync backend/Supabase
      await fetchTasks();
    } catch (err) {}
    setGenerating(false);
    setShowForm(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'irrigation': return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'pest control': return <SprayCan className="w-5 h-5 text-red-600" />;
      default: return <Sprout className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
            <CalendarCheck className="w-7 h-7 text-teal-600" />
            <span>{t.dailyPlanner}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">Generate AI personalized crop schedules & track daily field operations</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="success">
            {tasks.filter(t => t.status === 'COMPLETED').length} / {tasks.length} Done Today
          </Badge>
          <Button onClick={() => setShowForm(!showForm)} variant="primary" className="h-10 text-xs px-4 rounded-xl">
            <Plus className="w-4 h-4 mr-1" />
            <span>{showForm ? 'Close Form' : 'Generate New Plan'}</span>
          </Button>
        </div>
      </div>

      {/* PLANNER GENERATION FORM */}
      {showForm && (
        <Card className="p-6 bg-emerald-50/60 border-emerald-200 space-y-4 rounded-3xl">
          <div className="flex items-center space-x-2 border-b border-emerald-200 pb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-bold text-[#1E3A2B]">Personalized AI Crop Planner Generator</h3>
          </div>

          <form onSubmit={handleGeneratePlanner} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Crop Name</label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white font-semibold text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Location / District</label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white font-semibold text-sm outline-none"
                  required
                />
                <MapPin className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Soil Type</label>
              <div className="relative flex items-center">
                <select
                  value={soil}
                  onChange={(e) => setSoil(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white font-semibold text-sm outline-none"
                >
                  <option value="Clay Loam">Clay Loam</option>
                  <option value="Red Soil">Red Sandy Soil</option>
                  <option value="Black Cotton Soil">Black Cotton Soil</option>
                  <option value="Alluvial Soil">Alluvial Riverbed</option>
                </select>
                <Layers className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Farm Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={area}
                onChange={(e) => setArea(parseFloat(e.target.value) || 1.0)}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white font-semibold text-sm outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Planting / Sowing Date</label>
              <div className="relative flex items-center">
                <input
                  type="date"
                  value={plantingDate}
                  onChange={(e) => setPlantingDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 bg-white font-semibold text-sm outline-none"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
              </div>
            </div>

            <div className="sm:col-span-1 flex items-end">
              <Button type="submit" loading={generating} variant="primary" className="w-full h-11 rounded-xl font-bold">
                Generate & Save Schedule
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => {
          const isDone = task.status === 'COMPLETED';
          return (
            <Card
              key={task.id}
              onClick={() => toggleTaskStatus(task.id)}
              className={`p-5 transition-all cursor-pointer rounded-2xl ${
                isDone ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  ) : (
                    <Circle className="w-6 h-6 text-slate-300" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(task.category)}
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{task.category}</span>
                      <span className="text-xs font-bold text-emerald-700">({task.crop_name})</span>
                    </div>
                    <Badge variant={isDone ? 'success' : 'warning'}>{task.task_date}</Badge>
                  </div>

                  <h3 className={`text-base font-bold ${isDone ? 'line-through text-slate-400' : 'text-[#1E3A2B]'}`}>
                    {task.task_name}
                  </h3>

                  {task.notes && (
                    <p className="text-xs text-slate-500 font-medium pt-1">{task.notes}</p>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
