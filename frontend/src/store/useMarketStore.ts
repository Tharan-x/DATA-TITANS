import { create } from 'zustand';
import { CommodityPrice } from '../types';
import { farmApi } from '../services/farmApi';

interface MarketState {
  prices: CommodityPrice[];
  loading: boolean;
  fetchPrices: (commodity?: string) => Promise<void>;
}

export const useMarketStore = create<MarketState>((set) => ({
  prices: [],
  loading: false,
  fetchPrices: async (commodity) => {
    set({ loading: true });
    const data = await farmApi.getMarketPrices(commodity);
    set({ prices: data, loading: false });
  },
}));
