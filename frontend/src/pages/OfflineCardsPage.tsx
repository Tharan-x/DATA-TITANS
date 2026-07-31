import React, { useEffect, useState } from 'react';
import { farmApi } from '../services/farmApi';
import { KnowledgeCard } from '../types';
import { useLanguageStore } from '../store/useLanguageStore';
import { TRANSLATIONS } from '../constants/translations';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { OfflineBanner } from '../components/OfflineBanner';
import { HardDriveDownload, CheckCircle2, Search, Sparkles, Filter } from 'lucide-react';

export const OfflineCardsPage: React.FC = () => {
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [cards, setCards] = useState<KnowledgeCard[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  useEffect(() => {
    farmApi.getOfflineTips().then(setCards);
  }, []);

  const categories = ['All', ...Array.from(new Set(cards.map(c => c.category)))];

  const filteredCards = cards.filter(card => {
    const title = (card.title[language] || card.title.en || '').toLowerCase();
    const summary = (card.summary[language] || card.summary.en || '').toLowerCase();
    const matchesSearch = title.includes(search.toLowerCase()) || summary.includes(search.toLowerCase());
    const matchesCat = selectedCat === 'All' || card.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
            <HardDriveDownload className="w-7 h-7 text-emerald-600" />
            <span>{t.offlineCards}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">20+ verified zero-internet actionable agricultural cards loaded from Supabase</p>
        </div>
        <Badge variant="success" className="w-fit">
          {filteredCards.length} Verified Cards Cached
        </Badge>
      </div>

      <OfflineBanner message="20+ Knowledge Cards Cached in LocalStorage — Seamless Zero-Internet Offline Access" />

      {/* Search & Category Filter */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search soil test, panchagavya, pests, organic tips..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 bg-white font-semibold text-sm outline-none focus:border-emerald-500 shadow-sm"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-4 h-4 text-slate-500 shrink-0 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCat === cat
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCards.map((card) => {
          const title = card.title[language] || card.title.en || 'Card Title';
          const summary = card.summary[language] || card.summary.en || '';

          return (
            <Card key={card.id} className="p-6 space-y-4 rounded-3xl hover:-translate-y-1 transition-all">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <Badge variant="info">{card.category}</Badge>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Offline Ready
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1E3A2B]">{title}</h3>
                {summary && (
                  <p className="text-sm text-slate-600 font-medium mt-1 leading-relaxed">{summary}</p>
                )}
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-[#1E3A2B] uppercase tracking-wider">Actionable Step-by-Step Guide:</h4>
                {card.actionable_steps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
