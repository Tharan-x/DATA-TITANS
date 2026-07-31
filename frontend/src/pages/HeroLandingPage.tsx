import React from 'react';
import { WebPageId } from '../types';
import { Button } from '../components/Button';
import { Sprout, ArrowRight, ShieldCheck, Sparkles, Bot, CloudSun, TrendingUp, Cpu } from 'lucide-react';

interface HeroLandingPageProps {
  setActivePage: (page: WebPageId) => void;
}

export const HeroLandingPage: React.FC<HeroLandingPageProps> = ({ setActivePage }) => {
  return (
    <div className="space-y-10 py-6">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0D1F17] via-[#1E3A2B] to-[#10B981] p-8 sm:p-14 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 border border-emerald-400/30 px-4 py-1.5 rounded-full text-emerald-300 text-xs sm:text-sm font-bold">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>National Hackathon AI Agriculture Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            🌾 UZHAVAN AI
          </h1>
          <p className="text-lg sm:text-2xl font-semibold text-emerald-100">
            Your AI Farming Companion for Smarter Decisions
          </p>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Empowering farmers across India with Gemini 1.5 Flash AI, real-time mandi prices, 7-day hyper-local weather advisory, automated soil NPK calculator, disease diagnostics, and regional language support (English, தமிழ், हिंदी, తెలుగు, ಕನ್ನಡ).
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              onClick={() => setActivePage('dashboard')}
              variant="secondary"
              className="h-13 px-8 text-base shadow-lg shadow-emerald-500/30"
            >
              Open Web Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              onClick={() => setActivePage('ai-advisor')}
              variant="outline"
              className="h-13 px-8 text-base border-white text-white hover:bg-white hover:text-[#1E3A2B]"
            >
              Consult Gemini AI <Bot className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Core Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => setActivePage('weather')} 
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <CloudSun className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1E3A2B]">Live Weather Station</h3>
          <p className="text-xs text-slate-500 mt-2">7-day forecast & agricultural rain probability guidance.</p>
        </div>

        <div 
          onClick={() => setActivePage('ai-advisor')} 
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1E3A2B]">Gemini AI Assistant</h3>
          <p className="text-xs text-slate-500 mt-2">Instant multi-turn AI advice tailored to regional crops.</p>
        </div>

        <div 
          onClick={() => setActivePage('market-prices')} 
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1E3A2B]">Live Mandi Prices</h3>
          <p className="text-xs text-slate-500 mt-2">Daily commodity market rates & modal price trends.</p>
        </div>

        <div 
          onClick={() => setActivePage('disease-detection')} 
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-[#1E3A2B]">Disease Scanner</h3>
          <p className="text-xs text-slate-500 mt-2">AI diagnostics & organic remedy recommendations.</p>
        </div>
      </div>
    </div>
  );
};
