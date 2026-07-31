import React from 'react';
import { SupportedLanguage } from '../types';
import { Check } from 'lucide-react';

interface LanguagePickerProps {
  selectedLanguage: SupportedLanguage;
  onSelectLanguage: (lang: SupportedLanguage) => void;
}

const LANGUAGES: Array<{ code: SupportedLanguage; label: string; native: string }> = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'Malayalam', native: 'മലയാളം' },
];

export const LanguagePicker: React.FC<LanguagePickerProps> = ({
  selectedLanguage,
  onSelectLanguage,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
      {LANGUAGES.map((lang) => {
        const isSelected = selectedLanguage === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => onSelectLanguage(lang.code)}
            className={`flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all ${
              isSelected
                ? 'border-emerald-600 bg-emerald-50 shadow-sm'
                : 'border-slate-200 bg-white hover:border-emerald-300'
            }`}
          >
            <div>
              <p className={`text-lg font-bold ${isSelected ? 'text-emerald-900' : 'text-slate-800'}`}>
                {lang.native}
              </p>
              <p className={`text-xs ${isSelected ? 'text-emerald-700' : 'text-slate-500'}`}>
                {lang.label}
              </p>
            </div>
            {isSelected && (
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white">
                <Check className="w-4 h-4" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
};
