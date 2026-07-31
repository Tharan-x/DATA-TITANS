import React from 'react';
import { WeatherData } from '../types';
import { Sun, CloudRain, Wind, Droplets, ArrowRight } from 'lucide-react';

interface WeatherWidgetProps {
  weather: WeatherData | null;
  onClick?: () => void;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather, onClick }) => {
  if (!weather) return null;

  return (
    <div
      onClick={onClick}
      className="bg-gradient-to-br from-[#1E3A2B] to-[#10B981] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/20 cursor-pointer hover:scale-[1.01] transition-all relative overflow-hidden"
    >
      {/* Decorative background circle */}
      <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
            📍 {weather.location}, {weather.state}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">{weather.condition}</h2>
          <p className="text-emerald-100 text-xs sm:text-sm font-medium mt-1">Live Farm Atmospheric Sensor Data</p>
        </div>

        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10">
          <Sun className="w-10 h-10 text-amber-300 animate-spin-slow" />
          <span className="text-4xl sm:text-5xl font-black text-white">{weather.temp_celsius}°C</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
        <div className="flex flex-col items-center text-center">
          <Droplets className="w-5 h-5 text-emerald-300 mb-1" />
          <span className="text-xs text-emerald-200">Humidity</span>
          <span className="text-sm sm:text-base font-bold text-white">{weather.humidity}%</span>
        </div>

        <div className="flex flex-col items-center text-center border-x border-white/10 px-2">
          <CloudRain className="w-5 h-5 text-blue-300 mb-1" />
          <span className="text-xs text-emerald-200">Rain Prob.</span>
          <span className="text-sm sm:text-base font-bold text-white">{weather.rain_probability}%</span>
        </div>

        <div className="flex flex-col items-center text-center">
          <Wind className="w-5 h-5 text-amber-300 mb-1" />
          <span className="text-xs text-emerald-200">Wind Speed</span>
          <span className="text-sm sm:text-base font-bold text-white">{weather.wind_speed_kmh} km/h</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-emerald-100 font-semibold pt-2">
        <span>{weather.farming_advisory}</span>
        <span className="flex items-center gap-1 text-white underline font-bold shrink-0 ml-2">
          View 7-Day Forecast <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
