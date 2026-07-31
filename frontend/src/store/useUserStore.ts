import { create } from 'zustand';
import { UserProfile, SupportedLanguage } from '../types';
import { supabase } from '../lib/supabase';

interface UserState {
  user: UserProfile;
  isAuthenticated: boolean;
  setUser: (user: UserProfile) => void;
  updateProfileField: (field: keyof UserProfile, value: any) => void;
  registerUser: (profileData: UserProfile) => Promise<boolean>;
  loginWithPhoneOrEmail: (identifier: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loadSession: () => Promise<void>;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr-demo-001',
  name: 'Muthu Farmer',
  phone: '+91 98765 43210',
  state: 'Tamil Nadu',
  district: 'Coimbatore',
  village: 'Thondamuthur',
  preferredLanguage: 'ta',
  farmSize: 3.5,
  cropGrowing: 'Paddy (Rice)',
  cropVariety: 'Samba / CO-51',
  sowingDate: '2026-06-15',
  landType: 'Clay Loam'
};

export const useUserStore = create<UserState>((set, get) => ({
  user: DEFAULT_USER,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),

  updateProfileField: (field, value) => set((state) => ({
    user: { ...state.user, [field]: value }
  })),

  registerUser: async (profileData) => {
    try {
      // Save profile to Supabase database
      const { data: authUser } = await supabase.auth.getUser();
      const userId = authUser.user?.id || profileData.id || `usr-${Date.now()}`;
      
      const updatedProfile = { ...profileData, id: userId };

      const { error } = await supabase.from('profiles').upsert({
        id: userId,
        name: profileData.name,
        phone: profileData.phone,
        state: profileData.state,
        district: profileData.district,
        village: profileData.village,
        preferred_language: profileData.preferredLanguage,
        farm_size: profileData.farmSize,
        crop_growing: profileData.cropGrowing,
        crop_variety: profileData.cropVariety,
        sowing_date: profileData.sowingDate,
        land_type: profileData.landType
      });

      if (error) {
        console.warn('Supabase DB profile insert notice:', error.message);
      }

      set({ user: updatedProfile, isAuthenticated: true });
      localStorage.setItem('uzhavan_user_profile', JSON.stringify(updatedProfile));
      return true;
    } catch (e) {
      console.error('Registration failed:', e);
      set({ user: profileData, isAuthenticated: true });
      return true;
    }
  },

  loginWithPhoneOrEmail: async (identifier) => {
    try {
      const saved = localStorage.getItem('uzhavan_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        set({ user: parsed, isAuthenticated: true });
        return true;
      }
      set({ isAuthenticated: true });
      return true;
    } catch (e) {
      set({ isAuthenticated: true });
      return true;
    }
  },

  logout: async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
    localStorage.removeItem('uzhavan_user_profile');
    set({ isAuthenticated: false, user: DEFAULT_USER });
  },

  loadSession: async () => {
    try {
      const saved = localStorage.getItem('uzhavan_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        set({ user: parsed, isAuthenticated: true });
      } else {
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
          if (profile) {
            const userObj: UserProfile = {
              id: profile.id,
              name: profile.name,
              phone: profile.phone,
              state: profile.state,
              district: profile.district,
              village: profile.village,
              preferredLanguage: profile.preferred_language as SupportedLanguage,
              farmSize: profile.farm_size,
              cropGrowing: profile.crop_growing,
              cropVariety: profile.crop_variety,
              sowingDate: profile.sowing_date,
              landType: profile.land_type
            };
            set({ user: userObj, isAuthenticated: true });
          }
        }
      }
    } catch (e) {
      console.warn('Session load notice:', e);
    }
  }
}));
