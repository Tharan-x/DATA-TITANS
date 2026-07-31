import React, { useEffect } from 'react';
import { WebPageId } from '../types';
import { useLanguageStore } from '../store/useLanguageStore';
import { useWeatherStore } from '../store/useWeatherStore';
import { useUserStore } from '../store/useUserStore';
import { useMarketStore } from '../store/useMarketStore';
import { usePlannerStore } from '../store/usePlannerStore';
import { TRANSLATIONS } from '../constants/translations';
import { WeatherWidget } from '../components/WeatherWidget';
import { StatCard } from '../components/StatCard';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

import {
  CloudSun,
  BookOpen,
  Bot,
  TrendingUp,
  Stethoscope,
  CalendarCheck,
  Building2,
  HardDriveDownload,
  FlaskConical,
  Bug,
  CheckCircle2,
  Circle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface DashboardPageProps {
  setActivePage: (page: WebPageId) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ setActivePage }) => {
  const { language } = useLanguageStore();
  const { weather, fetchWeather } = useWeatherStore();
  const { user } = useUserStore();
  const { prices, fetchPrices } = useMarketStore();
  const { tasks, fetchTasks, toggleTaskStatus } = usePlannerStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    fetchWeather(user.district);
    fetchPrices();
    fetchTasks();
  }, [user.district]);

  const quickTools: Array<{ id: WebPageId; title: string; desc: string; icon: React.ReactNode; color: string; badge?: string }> = [
    { id: 'weather', title: t.weather, desc: '7-Day rainfall & temperature station', icon: <CloudSun className="w-6 h-6 text-blue-600" />, color: 'bg-blue-50', badge: 'Live' },
    { id: 'crop-guide', title: t.cropGuide, desc: 'Sowing timeline & irrigation stages', icon: <BookOpen className="w-6 h-6 text-emerald-600" />, color: 'bg-emerald-50' },
    { id: 'ai-advisor', title: t.aiAdvisor, desc: 'Ask Gemini 1.5 AI multi-turn questions', icon: <Bot className="w-6 h-6 text-amber-600" />, color: 'bg-amber-50', badge: 'Gemini AI' },
    { id: 'market-prices', title: t.marketPrices, desc: 'Live Mandi commodity prices & trends', icon: <TrendingUp className="w-6 h-6 text-purple-600" />, color: 'bg-purple-50' },
    { id: 'disease-detection', title: t.diseaseDetection, desc: 'Leaf diagnostic & organic remedies', icon: <Stethoscope className="w-6 h-6 text-red-600" />, color: 'bg-red-50' },
    { id: 'fertilizer', title: t.fertilizerRecommend, desc: 'Soil NPK calculator & dosage plan', icon: <FlaskConical className="w-6 h-6 text-indigo-600" />, color: 'bg-indigo-50' },
    { id: 'pest-risk', title: t.pestRisk, desc: 'Weather-triggered pest outbreak radar', icon: <Bug className="w-6 h-6 text-orange-600" />, color: 'bg-orange-50', badge: 'Alert' },
    { id: 'planner', title: t.dailyPlanner, desc: 'Daily field operations & spray log', icon: <CalendarCheck className="w-6 h-6 text-teal-600" />, color: 'bg-teal-50' },
    { id: 'village-wisdom', title: t.villageWisdom, desc: 'Traditional practices & scientific basis', icon: <Building2 className="w-6 h-6 text-amber-700" />, color: 'bg-amber-100/60' },
    { id: 'offline-cards', title: t.offlineCards, desc: 'Zero-internet actionable knowledge cards', icon: <HardDriveDownload className="w-6 h-6 text-emerald-700" />, color: 'bg-emerald-100/60', badge: 'Cached' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#1E3A2B]">
            Vanakkam, {user.name} 🌾
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">
            📍 {user.district}, {user.state} • Primary Crop: <span className="font-bold text-emerald-700">{user.primaryCrop}</span> ({user.landAcres} Acres)
          </p>
        </div>

        <button
          onClick={() => setActivePage('ai-advisor')}
          className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Ask Gemini AI Advisor</span>
        </button>
      </div>

      {/* Live Weather Widget Card */}
      <WeatherWidget weather={weather} onClick={() => setActivePage('weather')} />

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Target Paddy Mandi Price" value="₹2,150 / Quintal" subtitle="Madurai Mandi • Trend UP" icon={<TrendingUp className="w-6 h-6" />} color="green" />
        <StatCard title="Field Pest Outbreak Risk" value="82% HIGH" subtitle="Humidity > 68% Alert" icon={<Bug className="w-6 h-6" />} color="red" />
        <StatCard title="Soil NPK Balance" value="6.5 pH Optimal" subtitle="Basal Dose Required" icon={<FlaskConical className="w-6 h-6" />} color="blue" />
        <StatCard title="Scheduled Tasks" value={`${tasks.filter(t=>t.status==='COMPLETED').length} / ${tasks.length} Completed`} subtitle="Irrigation & Spray Today" icon={<CalendarCheck className="w-6 h-6" />} color="amber" />
      </div>

      {/* 10 Interactive Web Action Tools Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#1E3A2B]">{t.quickActions}</h2>
          <span className="text-xs text-slate-500 font-semibold">10 AI Farming Tools Available</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {quickTools.map((tool) => (
            <Card
              key={tool.id}
              onClick={() => setActivePage(tool.id)}
              className="p-5 flex flex-col justify-between h-44 hover:-translate-y-1 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${tool.color}`}>
                    {tool.icon}
                  </div>
                  {tool.badge && <Badge variant="warning">{tool.badge}</Badge>}
                </div>
                <h3 className="font-bold text-[#1E3A2B] text-base">{tool.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{tool.desc}</p>
              </div>
              <div className="flex items-center text-xs font-bold text-emerald-700 mt-2">
                <span>Explore Tool</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lower Dashboard Section: Today's Tasks & Mandi Prices Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Today's Tasks */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-600" />
              <span>{t.todayTasks}</span>
            </h3>
            <button onClick={() => setActivePage('planner')} className="text-xs font-bold text-emerald-700 hover:underline">
              View All Tasks →
            </button>
          </div>

          <div className="space-y-3">
            {tasks.slice(0, 3).map((task) => {
              const isDone = task.status === 'COMPLETED';
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`p-3.5 rounded-xl border flex items-start space-x-3 cursor-pointer transition-all ${
                    isDone ? 'bg-slate-50 border-slate-200 opacity-75' : 'bg-emerald-50/40 border-emerald-200/80 hover:bg-emerald-50'
                  }`}
                >
                  <div className="mt-0.5">
                    {isDone ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <Circle className="w-5 h-5 text-slate-400" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isDone ? 'line-through text-slate-400' : 'text-[#1E3A2B]'}`}>
                        {task.task_name}
                      </h4>
                      <Badge variant={isDone ? 'success' : 'warning'}>{task.task_date}</Badge>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{task.notes}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Live Mandi Rates Preview */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <span>Live Mandi Market Rates</span>
            </h3>
            <button onClick={() => setActivePage('market-prices')} className="text-xs font-bold text-emerald-700 hover:underline">
              Full Mandi Table →
            </button>
          </div>

          <div className="space-y-3">
            {prices.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between hover:bg-slate-50 transition-all">
                <div>
                  <h4 className="font-bold text-[#1E3A2B] text-sm">{item.commodity}</h4>
                  <p className="text-xs text-slate-500">{item.mandi_name}, {item.district}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-emerald-700">₹{item.modal_price_per_quintal}</span>
                  <span className="text-xs text-slate-400 block">/ Quintal</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};
