import { create } from 'zustand';
import { SupportedLanguage } from '../types';
import { StorageService } from '../services/storage';

interface LanguageState {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  loadLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: 'ta', // Default Tamil
  setLanguage: (lang) => {
    set({ language: lang });
    StorageService.setLanguage(lang);
  },
  loadLanguage: () => {
    const saved = StorageService.getLanguage();
    if (saved) {
      set({ language: saved as SupportedLanguage });
    }
  },
}));
