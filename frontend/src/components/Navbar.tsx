import React from 'react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useUserStore } from '../store/useUserStore';
import { SupportedLanguage, WebPageId } from '../types';
import { TRANSLATIONS } from '../constants/translations';
import { Sprout, Globe, User, MapPin } from 'lucide-react';

interface NavbarProps {
  activePage: WebPageId;
  setActivePage: (page: WebPageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const { language, setLanguage } = useLanguageStore();
  const { user } = useUserStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const languages: Array<{ code: SupportedLanguage; label: string }> = [
    { code: 'en', label: 'English' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1E3A2B] text-white shadow-md border-b border-emerald-800/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActivePage('dashboard')} 
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wide text-white flex items-center gap-1.5">
              🌾 UZHAVAN AI
            </h1>
            <p className="text-xs text-emerald-200 font-medium hidden sm:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Location & Crop Bar */}
        <div className="hidden md:flex items-center space-x-3 bg-emerald-950/60 border border-emerald-700/50 rounded-full px-4 py-1.5 text-sm text-emerald-100">
          <MapPin className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-emerald-200">{user.district || 'Coimbatore'}, {user.state || 'Tamil Nadu'}</span>
          <span className="text-emerald-600">|</span>
          <span className="text-emerald-300 text-xs font-medium">Crop: {user.cropGrowing || 'Paddy (Rice)'}</span>
        </div>

        {/* Right Actions: Language Selector & User Profile */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          
          {/* Language Selector Dropdown */}
          <div className="relative flex items-center bg-emerald-900/80 border border-emerald-700/60 rounded-xl px-3 py-1.5 text-sm">
            <Globe className="w-4 h-4 text-emerald-400 mr-2" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-white font-semibold outline-none cursor-pointer text-xs sm:text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code} className="bg-[#1E3A2B] text-white">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          {/* User Profile Button */}
          <button
            onClick={() => setActivePage('settings')}
            className="flex items-center space-x-2 bg-emerald-700/50 hover:bg-emerald-600/60 border border-emerald-600/50 px-3 py-1.5 rounded-xl transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
              <User className="w-4 h-4" />
            </div>
            <span className="text-sm font-bold text-white hidden sm:inline">{user.name || 'Farmer Profile'}</span>
          </button>

        </div>
      </div>
    </header>
  );
};
