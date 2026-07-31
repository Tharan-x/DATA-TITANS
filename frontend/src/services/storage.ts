const KEYS = {
  LANGUAGE: 'uzhavan_web_language',
  WEATHER: 'uzhavan_web_cache_weather',
  CROPS: 'uzhavan_web_cache_crops',
  OFFLINE_CARDS: 'uzhavan_web_cache_cards',
  USER_PROFILE: 'uzhavan_web_user_profile',
};

export const StorageService = {
  setLanguage(lang: string): void {
    try {
      localStorage.setItem(KEYS.LANGUAGE, lang);
    } catch (e) {
      console.error('Error saving language:', e);
    }
  },

  getLanguage(): string | null {
    try {
      return localStorage.getItem(KEYS.LANGUAGE);
    } catch (e) {
      return null;
    }
  },

  cacheData(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error caching ${key}:`, e);
    }
  },

  getCachedData<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  KEYS,
};
