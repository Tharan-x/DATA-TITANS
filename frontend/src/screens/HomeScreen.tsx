import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useLanguageStore } from '../store/useLanguageStore';
import { useWeatherStore } from '../store/useWeatherStore';
import { useUserStore } from '../store/useUserStore';
import { TRANSLATIONS } from '../constants/translations';
import { WeatherWidget } from '../components/WeatherWidget';
import { QuickActionCard } from '../components/QuickActionCard';
import { COLORS } from '../constants/theme';

import {
  CloudSun,
  BookOpen,
  Bot,
  TrendingUp,
  Stethoscope,
  CalendarCheck,
  Building2,
  HardDriveDownload,
  Settings,
  Bell
} from 'lucide-react-native';

export const HomeScreen = ({ navigation }: any) => {
  const { language } = useLanguageStore();
  const { weather, fetchWeather } = useWeatherStore();
  const { user } = useUserStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  useEffect(() => {
    fetchWeather(user?.district || 'Coimbatore');
  }, [user?.district]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header section */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.greeting}>🌾 Vanakkam, {user?.name || 'Farmer'}</Text>
            <Text style={styles.districtBadge}>📍 {user?.district}, {user?.state}</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.navigate('Settings')}>
              <Settings color={COLORS.primaryDarkGreen} size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Weather Widget */}
        <TouchableOpacity onPress={() => navigation.navigate('Weather')}>
          <WeatherWidget weather={weather} />
        </TouchableOpacity>

        {/* Banner Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t.quickActions}</Text>
        </View>

        {/* 8 Core Feature Cards */}
        <View style={styles.grid}>
          <QuickActionCard
            title={t.weather}
            subtitle="7-day rain prediction & temperature"
            icon={<CloudSun color={COLORS.primaryDarkGreen} size={24} />}
            onPress={() => navigation.navigate('Weather')}
            badge="Live"
          />
          <QuickActionCard
            title={t.cropGuide}
            subtitle="Growth stages & irrigation plan"
            icon={<BookOpen color={COLORS.primaryEmerald} size={24} />}
            onPress={() => navigation.navigate('CropGuide')}
          />
          <QuickActionCard
            title={t.aiAdvisor}
            subtitle="Ask Gemini AI expert 24/7"
            icon={<Bot color={COLORS.secondaryGold} size={24} />}
            onPress={() => navigation.navigate('AIFarmingAdvisor')}
            badge="AI"
          />
          <QuickActionCard
            title={t.marketPrices}
            subtitle="Daily mandi rates & price trends"
            icon={<TrendingUp color="#3B82F6" size={24} />}
            onPress={() => navigation.navigate('MarketPrices')}
          />
          <QuickActionCard
            title={t.diseaseDetection}
            subtitle="Leaf diagnostic & organic treatment"
            icon={<Stethoscope color="#EF4444" size={24} />}
            onPress={() => navigation.navigate('DiseaseDetection')}
          />
          <QuickActionCard
            title={t.dailyPlanner}
            subtitle="Field irrigation & spray schedule"
            icon={<CalendarCheck color="#8B5CF6" size={24} />}
            onPress={() => navigation.navigate('DailyPlanner')}
          />
          <QuickActionCard
            title={t.villageWisdom}
            subtitle="Traditional farming practices AI"
            icon={<Building2 color="#D97706" size={24} />}
            onPress={() => navigation.navigate('VillageWisdom')}
          />
          <QuickActionCard
            title={t.offlineCards}
            subtitle="Zero-internet knowledge cards"
            icon={<HardDriveDownload color="#059669" size={24} />}
            onPress={() => navigation.navigate('OfflineCards')}
            badge="Cached"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  greeting: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primaryDarkGreen,
  },
  districtBadge: {
    fontSize: 13,
    color: COLORS.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#E6F4ED',
    marginLeft: 8,
  },
  sectionHeader: {
    marginVertical: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justify: 'space-between',
  },
});
