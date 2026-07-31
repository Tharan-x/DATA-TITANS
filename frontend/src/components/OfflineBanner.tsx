import React, { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

interface OfflineBannerProps {
  message?: string;
}

export const OfflineBanner: React.FC<OfflineBannerProps> = ({ message }) => {
  const [isOnline, setIsOnline] = useState(typeof window !== 'undefined' ? window.navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline && !message) return null;

  return (
    <div className={`text-xs sm:text-sm font-bold px-4 py-2.5 flex items-center justify-center space-x-2 rounded-2xl shadow-inner ${
      isOnline ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
    }`}>
      {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4 text-amber-200" />}
      <span>{message || (isOnline ? 'Connected: Syncing with Supabase...' : 'Offline Mode: Using LocalStorage Cache')}</span>
    </div>
  );
};
