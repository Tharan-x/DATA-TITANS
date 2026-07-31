import React from 'react';
import { WebPageId } from '../types';
import { useLanguageStore } from '../store/useLanguageStore';
import { TRANSLATIONS } from '../constants/translations';
import {
  LayoutDashboard,
  CloudSun,
  BookOpen,
  Bot,
  Stethoscope,
  TrendingUp,
  FlaskConical,
  Bug,
  CalendarCheck,
  Building2,
  HardDriveDownload,
  Settings,
  Globe,
  LogIn,
  Home
} from 'lucide-react';

interface SidebarProps {
  activePage: WebPageId;
  setActivePage: (page: WebPageId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const menuItems: Array<{ id: WebPageId; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'hero', label: 'Welcome Portal', icon: <Home className="w-5 h-5" /> },
    { id: 'dashboard', label: t.appName + ' Dashboard', icon: <LayoutDashboard className="w-5 h-5" />, badge: 'Main' },
    { id: 'weather', label: t.weather, icon: <CloudSun className="w-5 h-5" />, badge: 'Live' },
    { id: 'crop-guide', label: t.cropGuide, icon: <BookOpen className="w-5 h-5" /> },
    { id: 'ai-advisor', label: t.aiAdvisor, icon: <Bot className="w-5 h-5" />, badge: 'AI 1.5' },
    { id: 'disease-detection', label: t.diseaseDetection, icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'market-prices', label: t.marketPrices, icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'fertilizer', label: t.fertilizerRecommend, icon: <FlaskConical className="w-5 h-5" /> },
    { id: 'pest-risk', label: t.pestRisk, icon: <Bug className="w-5 h-5" />, badge: 'Warning' },
    { id: 'planner', label: t.dailyPlanner, icon: <CalendarCheck className="w-5 h-5" /> },
    { id: 'village-wisdom', label: t.villageWisdom, icon: <Building2 className="w-5 h-5" /> },
    { id: 'offline-cards', label: t.offlineCards, icon: <HardDriveDownload className="w-5 h-5" />, badge: 'Cached' },
    { id: 'language', label: 'Language Select', icon: <Globe className="w-5 h-5" /> },
    { id: 'login', label: 'Farmer Login', icon: <LogIn className="w-5 h-5" /> },
    { id: 'settings', label: t.settings, icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden lg:block shrink-0 min-h-[calc(100vh-4rem)] p-4">
      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-3">
        Agriculture Suite
      </div>
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                isActive
                  ? 'bg-[#1E3A2B] text-white shadow-md shadow-emerald-900/20'
                  : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={isActive ? 'text-emerald-400' : 'text-slate-500'}>
                  {item.icon}
                </span>
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-100 text-amber-800 border border-amber-300/50'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
