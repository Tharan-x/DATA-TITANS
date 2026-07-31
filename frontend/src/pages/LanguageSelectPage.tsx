import React from 'react';
import { useLanguageStore } from '../store/useLanguageStore';
import { SupportedLanguage, WebPageId } from '../types';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Globe, Check } from 'lucide-react';

interface LanguageSelectPageProps {
  setActivePage: (page: WebPageId) => void;
}

const LANGUAGES: Array<{ code: SupportedLanguage; name: string; native: string; desc: string }> = [
  { code: 'en', name: 'English', native: 'English', desc: 'Default Global Language' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', desc: 'தமிழ்நாடு விவசாயிகளுக்கான பதிப்பு' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी', desc: 'उत्तर और मध्य भारत के किसानों के लिए' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', desc: 'ఆంధ్రప్రదేశ్ మరియు తెలంగాణ రైతులకు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', desc: 'ಕರ್ನಾಟಕದ ರೈತ ಸಮುದಾಯಕ್ಕಾಗಿ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', desc: 'കേരളത്തിലെ കർഷകർക്കായി' },
];

export const LanguageSelectPage: React.FC<LanguageSelectPageProps> = ({ setActivePage }) => {
  const { language, setLanguage } = useLanguageStore();

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#1E3A2B] flex items-center justify-center mx-auto mb-4">
          <Globe className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-black text-[#1E3A2B]">Select Your Language (மொழி தேர்வு)</h2>
        <p className="text-slate-600 text-sm">Choose your preferred regional Indian language for AI recommendations & weather</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
        {LANGUAGES.map((lang) => {
          const isSelected = language === lang.code;
          return (
            <Card
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-6 transition-all rounded-2xl ${
                isSelected ? 'border-2 border-emerald-500 bg-emerald-50/50 shadow-md' : 'hover:border-emerald-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#1E3A2B]">{lang.native}</h3>
                  <p className="text-sm font-semibold text-emerald-600">{lang.name}</p>
                  <p className="text-xs text-slate-500 mt-1">{lang.desc}</p>
                </div>
                {isSelected && (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-center pt-6">
        <Button onClick={() => setActivePage('dashboard')} variant="primary" className="h-12 px-10 text-base rounded-2xl">
          Save Preference & Proceed to Dashboard
        </Button>
      </div>
    </div>
  );
};
