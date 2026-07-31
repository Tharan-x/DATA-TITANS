import React, { useEffect } from 'react';
import { useWeatherStore } from '../store/useWeatherStore';
import { useUserStore } from '../store/useUserStore';
import { Card } from '../components/Card';
import { WeatherWidget } from '../components/WeatherWidget';
import { CloudRain, Sun, Wind, Droplets, Info, Calendar } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const WeatherPage: React.FC = () => {
  const { weather, fetchWeather } = useWeatherStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchWeather(user.district);
  }, [user.district]);

  // Chart dataset for 5-day weather visualization
  const chartData = weather?.forecast.map(item => ({
    name: item.day,
    HighTemp: item.temp_max,
    LowTemp: item.temp_min,
    RainProb: item.rain_probability,
  })) || [
    { name: 'Today', HighTemp: 31.5, LowTemp: 24, RainProb: 35 },
    { name: 'Tomorrow', HighTemp: 33, LowTemp: 24, RainProb: 30 },
    { name: 'Day 3', HighTemp: 32, LowTemp: 23.5, RainProb: 75 },
    { name: 'Day 4', HighTemp: 30.5, LowTemp: 22, RainProb: 85 },
    { name: 'Day 5', HighTemp: 34, LowTemp: 24.5, RainProb: 10 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-[#1E3A2B]">Weather Station & Farm Rainfall Advisor</h1>
        <p className="text-xs text-slate-500 mt-1">Real-time satellite & OpenWeather API agricultural telemetry for {user.district}</p>
      </div>

      {/* Main Live Weather Widget */}
      <WeatherWidget weather={weather} />

      {/* Recharts Temperature & Rainfall Trend Chart */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-lg font-bold text-[#1E3A2B] flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span>5-Day Temperature & Rain Probability Trend</span>
          </h3>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">Interactive Telemetry Chart</span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#1E3A2B', color: '#fff', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="HighTemp" stroke="#10B981" fillOpacity={1} fill="url(#colorTemp)" name="Max Temp (°C)" />
              <Area type="monotone" dataKey="RainProb" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRain)" name="Rain Chance (%)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Advisory & 5-Day Forecast Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Advisory Box */}
        <Card className="lg:col-span-1 p-6 bg-amber-50/80 border-amber-200/80 space-y-3">
          <div className="flex items-center space-x-2 text-amber-800">
            <Info className="w-5 h-5" />
            <h3 className="font-bold text-base">Agricultural Weather Advisory</h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed font-medium">
            {weather?.farming_advisory}
          </p>
        </Card>

        {/* 5-Day Cards */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-base font-bold text-[#1E3A2B]">Detailed Daily Forecast Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {weather?.forecast.map((day, idx) => (
              <Card key={idx} className="p-4 border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#1E3A2B] text-sm">{day.day}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{day.condition}</p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-[#1E3A2B]">{day.temp_max}°C</span>
                  <span className="text-xs text-slate-400 block">Rain: {day.rain_probability}%</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
