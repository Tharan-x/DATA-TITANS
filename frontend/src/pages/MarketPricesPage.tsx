import React, { useEffect, useState } from 'react';
import { farmApi } from '../services/farmApi';
import { CommodityPrice } from '../types';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Search, Store, WifiOff } from 'lucide-react';

export const MarketPricesPage: React.FC = () => {
  const [prices, setPrices] = useState<CommodityPrice[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    farmApi.getMarketPrices().then(setPrices);
  }, []);

  const filteredPrices = prices.filter((item) =>
    item.commodity.toLowerCase().includes(search.toLowerCase()) ||
    (item.district && item.district.toLowerCase().includes(search.toLowerCase())) ||
    (item.mandi_name && item.mandi_name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#1E3A2B]">Live Mandi Market Rates (சந்தை விலை)</h1>
          <p className="text-xs text-slate-500 mt-0.5">Live API & Cached Offline Mandi rates across South India</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Crop or District..."
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-300 outline-none text-sm font-semibold text-slate-800"
          />
        </div>
      </div>

      {/* Mandi Rates Web Data Table */}
      <Card className="p-0 overflow-hidden border-slate-200 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1E3A2B] text-white text-xs font-bold uppercase tracking-wider">
                <th className="p-4">Crop</th>
                <th className="p-4">District</th>
                <th className="p-4">Today's Price</th>
                <th className="p-4">Yesterday</th>
                <th className="p-4">Trend</th>
                <th className="p-4">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-800">
              {filteredPrices.map((item) => {
                const todaysPrice = item.modal_price_per_quintal 
                  ? `₹${item.modal_price_per_quintal} / Qtl` 
                  : (item as any).todays_price || '₹2,250 / Qtl';
                
                const yesterdaysPrice = item.min_price 
                  ? `₹${item.min_price} / Qtl` 
                  : (item as any).yesterdays_price || '₹2,200 / Qtl';

                const lastUpdated = (item as any).last_updated || 'Today, 08:30 AM (Offline Data)';

                return (
                  <tr key={item.id} className="hover:bg-emerald-50/50 transition-colors">
                    <td className="p-4 font-bold text-[#1E3A2B]">
                      {item.commodity || (item as any).crop}
                      {item.local_name?.ta && <span className="text-xs text-emerald-700 block font-normal">{item.local_name.ta}</span>}
                    </td>
                    <td className="p-4 text-slate-600">
                      <div className="flex items-center space-x-1.5">
                        <Store className="w-4 h-4 text-slate-400" />
                        <span>{item.district || 'Coimbatore'}</span>
                      </div>
                    </td>
                    <td className="p-4 text-base font-black text-emerald-700">{todaysPrice}</td>
                    <td className="p-4 text-slate-600">{yesterdaysPrice}</td>
                    <td className="p-4">
                      <Badge variant={item.trend === 'UP' || String(item.trend).includes('UP') ? 'success' : item.trend === 'DOWN' || String(item.trend).includes('DOWN') ? 'danger' : 'warning'}>
                        {item.trend === 'UP' || String(item.trend).includes('UP') ? '▲ UP' : item.trend === 'DOWN' || String(item.trend).includes('DOWN') ? '▼ DOWN' : '— STABLE'}
                      </Badge>
                    </td>
                    <td className="p-4 text-xs font-semibold text-slate-500">
                      <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                        <WifiOff className="w-3 h-3 text-slate-400" />
                        {lastUpdated}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
