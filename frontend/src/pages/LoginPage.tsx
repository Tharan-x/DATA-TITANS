import React, { useState } from 'react';
import { SupportedLanguage, UserProfile, WebPageId } from '../types';
import { useUserStore } from '../store/useUserStore';
import { useLanguageStore } from '../store/useLanguageStore';
import { TRANSLATIONS } from '../constants/translations';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Sprout, Phone, User, MapPin, Wheat, Calendar, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  setActivePage: (page: WebPageId) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ setActivePage }) => {
  const { registerUser, loginWithPhoneOrEmail } = useUserStore();
  const { language, setLanguage } = useLanguageStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  // Form State for all 11 required fields
  const [formData, setFormData] = useState<UserProfile>({
    id: `usr-${Date.now()}`,
    name: 'Muthu Farmer',
    phone: '9876543210',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    village: 'Thondamuthur',
    preferredLanguage: language,
    farmSize: 3.5,
    cropGrowing: 'Paddy (Rice)',
    cropVariety: 'Samba / CO-51',
    sowingDate: '2026-06-15',
    landType: 'Clay Loam'
  });

  const handleChange = (field: keyof UserProfile, val: any) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await loginWithPhoneOrEmail(formData.phone);
    setLoading(false);
    setActivePage('dashboard');
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLanguage(formData.preferredLanguage);
    await registerUser(formData);
    setLoading(false);
    setActivePage('dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <Card className="p-6 sm:p-8 space-y-6 shadow-xl border-emerald-100 bg-white rounded-3xl">
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-[#1E3A2B] text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/20">
            <Sprout className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A2B]">
            {mode === 'login' ? t.phoneLogin : t.signUpButton}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            {t.tagline}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              mode === 'login'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.phoneLogin}
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
              mode === 'register'
                ? 'bg-white text-emerald-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            {t.signUpButton}
          </button>
        </div>

        {/* LOGIN FORM */}
        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.phone}
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4 text-sm font-bold text-slate-500">+91</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  maxLength={10}
                  className="w-full h-12 pl-14 pr-10 rounded-2xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none text-sm font-semibold"
                  placeholder="9876543210"
                  required
                />
                <Phone className="w-4 h-4 text-emerald-600 absolute right-4" />
              </div>
            </div>

            <Button type="submit" variant="primary" className="w-full h-12 text-base mt-4 font-bold rounded-2xl" disabled={loading}>
              {loading ? 'Authenticating...' : t.loginButton}
            </Button>
          </form>
        ) : (
          /* REGISTRATION FORM (All 11 Requested Fields) */
          <form onSubmit={handleRegisterSubmit} className="space-y-4 pt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* 1. Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.name}</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold"
                    required
                  />
                  <User className="w-4 h-4 text-slate-400 absolute right-3" />
                </div>
              </div>

              {/* 2. Phone */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.phone}</label>
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold"
                    required
                  />
                </div>
              </div>

              {/* 3. State */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.state}</label>
                <select
                  value={formData.state}
                  onChange={(e) => handleChange('state', e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold bg-white"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Punjab">Punjab</option>
                </select>
              </div>

              {/* 4. District */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.district}</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleChange('district', e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold"
                    required
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3" />
                </div>
              </div>

              {/* 5. Village */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.village}</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleChange('village', e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold"
                  placeholder="Thondamuthur"
                />
              </div>

              {/* 6. Preferred Language */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.selectLanguage}</label>
                <select
                  value={formData.preferredLanguage}
                  onChange={(e) => handleChange('preferredLanguage', e.target.value as SupportedLanguage)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold bg-white"
                >
                  <option value="en">English</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="kn">ಕನ್ನಡ (Kannada)</option>
                  <option value="ml">മലയാളം (Malayalam)</option>
                </select>
              </div>

              {/* 7. Farm Size */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.farmSize}</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.farmSize}
                  onChange={(e) => handleChange('farmSize', parseFloat(e.target.value) || 1.0)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold"
                  required
                />
              </div>

              {/* 8. Crop Growing */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.cropGrowing}</label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={formData.cropGrowing}
                    onChange={(e) => handleChange('cropGrowing', e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold"
                    required
                  />
                  <Wheat className="w-4 h-4 text-slate-400 absolute right-3" />
                </div>
              </div>

              {/* 9. Crop Variety */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.cropVariety}</label>
                <input
                  type="text"
                  value={formData.cropVariety}
                  onChange={(e) => handleChange('cropVariety', e.target.value)}
                  className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold"
                  placeholder="e.g. Samba / CO-51"
                />
              </div>

              {/* 10. Sowing Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.sowingDate}</label>
                <div className="relative flex items-center">
                  <input
                    type="date"
                    value={formData.sowingDate}
                    onChange={(e) => handleChange('sowingDate', e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold bg-white"
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
                </div>
              </div>

              {/* 11. Land Type */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">{t.landType}</label>
                <select
                  value={formData.landType}
                  onChange={(e) => handleChange('landType', e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-slate-300 focus:border-emerald-500 outline-none text-sm font-semibold bg-white"
                >
                  <option value="Clay Loam">Clay Loam (களிமண் வண்டல்)</option>
                  <option value="Red Soil">Red Sandy Soil (செம்மண்)</option>
                  <option value="Black Cotton Soil">Black Soil (கரிசல் மண்)</option>
                  <option value="Alluvial Soil">Alluvial Riverbed (ஆற்றுப் படுகை)</option>
                </select>
              </div>

            </div>

            <Button type="submit" variant="primary" className="w-full h-12 text-base mt-6 font-bold rounded-2xl" disabled={loading}>
              <CheckCircle2 className="w-5 h-5 mr-2" /> {loading ? 'Saving Profile...' : 'Complete Registration & Launch'}
            </Button>
          </form>
        )}

        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Connected to Supabase PostgreSQL & Auth</span>
        </div>

      </Card>
    </div>
  );
};
