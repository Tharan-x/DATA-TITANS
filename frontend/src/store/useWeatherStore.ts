import { create } from 'zustand';
import { WeatherData } from '../types';
import { farmApi } from '../services/farmApi';

interface WeatherState {
  weather: WeatherData | null;
  loading: boolean;
  fetchWeather: (district?: string) => Promise<void>;
}

export const useWeatherStore = create<WeatherState>((set) => ({
  weather: null,
  loading: false,
  fetchWeather: async (district = 'Coimbatore') => {
    set({ loading: true });
    const data = await farmApi.getWeather(district);
    set({ weather: data, loading: false });
  },
}));
