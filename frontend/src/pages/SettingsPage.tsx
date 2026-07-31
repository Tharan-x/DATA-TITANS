import React, { useState } from 'react';
import { useLanguageStore } from '../store/useLanguageStore';
import { useUserStore } from '../store/useUserStore';
import { TRANSLATIONS } from '../constants/translations';
import { SupportedLanguage } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Settings, User, Globe, Database, ShieldCheck, LogOut, CheckCircle2, MapPin, Wheat, Calendar } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const { user, registerUser, logout } = useUserStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [saving, setSaving] = useState(false);
  const [profileForm, setProfileForm] = useState({ ...user });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setLanguage(profileForm.preferredLanguage);
    await registerUser(profileForm);
    setSaving(false);
    alert('Profile updated and synchronized with Supabase database!');
  };

  const handleClearCache = () => {
    localStorage.clear();
    alert('Offline LocalStorage cache cleared successfully.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-[#1E3A2B] flex items-center gap-2">
          <Settings className="w-7 h-7 text-slate-700" />
          <span>{t.settings}</span>
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">Manage farmer profile, location telemetry, language preferences, and Supabase synchronization</p>
      </div>

      {/* Hero Profile Card */}
      <Card className="p-6 bg-gradient-to-r from-[#1E3A2B] to-emerald-900 text-white shadow-lg space-y-4 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white font-black text-xl flex items-center justify-center shadow-lg">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name || 'Farmer Profile'}</h2>
              <p className="text-xs text-emerald-200 mt-0.5">{user.phone} • {user.village || 'Village'}, {user.district}, {user.state}</p>
              <p className="text-xs text-emerald-300 font-semibold mt-1">
                Crop: {user.cropGrowing} ({user.cropVariety || 'Standard'}) • {user.farmSize} Acres
              </p>
            </div>
          </div>

          <Button onClick={logout} variant="outline" className="border-emerald-400 text-emerald-100 hover:bg-emerald-800 h-10 px-4 text-xs rounded-xl self-start sm:self-auto">
            <LogOut className="w-4 h-4 mr-1.5" />
            <span>{t.logout}</span>
          </Button>
        </div>
      </Card>

      {/* Profile Edit Form (All 11 attributes) */}
      <Card className="p-6 sm:p-8 space-y-6 rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
            <User className="w-5 h-5 text-emerald-600" />
            <span>{t.farmerProfile} & Farm Attributes</span>
          </h3>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            Supabase DB Synced
          </span>
        </div>

        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.name}</label>
            <input
              type="text"
              value={profileForm.name}
              onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.phone}</label>
            <input
              type="text"
              value={profileForm.phone}
              onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.state}</label>
            <input
              type="text"
              value={profileForm.state}
              onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.district}</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={profileForm.district}
                onChange={(e) => setProfileForm({ ...profileForm, district: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
                required
              />
              <MapPin className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.village}</label>
            <input
              type="text"
              value={profileForm.village}
              onChange={(e) => setProfileForm({ ...profileForm, village: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.selectLanguage}</label>
            <select
              value={profileForm.preferredLanguage}
              onChange={(e) => setProfileForm({ ...profileForm, preferredLanguage: e.target.value as SupportedLanguage })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none bg-white"
            >
              <option value="en">English</option>
              <option value="ta">தமிழ் (Tamil)</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="kn">ಕನ್ನಡ (Kannada)</option>
              <option value="ml">മലയാളം (Malayalam)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.farmSize}</label>
            <input
              type="number"
              step="0.5"
              value={profileForm.farmSize}
              onChange={(e) => setProfileForm({ ...profileForm, farmSize: parseFloat(e.target.value) || 1.0 })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.cropGrowing}</label>
            <div className="relative flex items-center">
              <input
                type="text"
                value={profileForm.cropGrowing}
                onChange={(e) => setProfileForm({ ...profileForm, cropGrowing: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
                required
              />
              <Wheat className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.cropVariety}</label>
            <input
              type="text"
              value={profileForm.cropVariety}
              onChange={(e) => setProfileForm({ ...profileForm, cropVariety: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.sowingDate}</label>
            <div className="relative flex items-center">
              <input
                type="date"
                value={profileForm.sowingDate}
                onChange={(e) => setProfileForm({ ...profileForm, sowingDate: e.target.value })}
                className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none bg-white"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.landType}</label>
            <select
              value={profileForm.landType}
              onChange={(e) => setProfileForm({ ...profileForm, landType: e.target.value })}
              className="w-full h-11 px-3 rounded-xl border border-slate-300 font-semibold text-sm outline-none bg-white"
            >
              <option value="Clay Loam">Clay Loam (களிமண் வண்டல்)</option>
              <option value="Red Soil">Red Sandy Soil (செம்மண்)</option>
              <option value="Black Cotton Soil">Black Soil (கரிசல் மண்)</option>
              <option value="Alluvial Soil">Alluvial Riverbed (ஆற்றுப் படுகை)</option>
            </select>
          </div>

          <div className="sm:col-span-2 pt-2">
            <Button type="submit" loading={saving} variant="primary" className="w-full h-12 rounded-2xl font-bold text-base">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Save & Update Profile
            </Button>
          </div>

        </form>
      </Card>

      {/* Offline Storage Controls */}
      <Card className="p-6 space-y-4 rounded-3xl">
        <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          <span>Browser LocalStorage Cache Controls</span>
        </h3>
        <p className="text-xs text-slate-500">Weather forecast, offline cards, and crop guide data are saved locally for offline resilience.</p>
        <Button onClick={handleClearCache} variant="outline" className="h-10 px-5 text-xs rounded-xl">
          Clear Local Cache Data
        </Button>
      </Card>

      {/* Hackathon Architecture Footer */}
      <Card className="p-6 bg-amber-50/60 border-amber-200/80 space-y-2 rounded-3xl">
        <div className="flex items-center space-x-2 text-amber-900 font-bold">
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>🌾 UZHAVAN AI Production Architecture</span>
        </div>
        <p className="text-xs text-slate-700">Vite + React + TypeScript + Tailwind CSS + Supabase Auth & PostgreSQL + FastAPI Gemini 1.5 Backend</p>
      </Card>
    </div>
  );
};
