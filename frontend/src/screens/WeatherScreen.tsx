import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { WeatherWidget } from '../components/WeatherWidget';
import { Card } from '../components/Card';
import { StatBox } from '../components/StatBox';
import { useWeatherStore } from '../store/useWeatherStore';
import { useUserStore } from '../store/useUserStore';
import { COLORS } from '../constants/theme';
import { CloudRain, Wind, Thermometer, Info } from 'lucide-react-native';

export const WeatherScreen = ({ navigation }: any) => {
  const { weather, fetchWeather } = useWeatherStore();
  const { user } = useUserStore();

  useEffect(() => {
    fetchWeather(user?.district || 'Coimbatore');
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Weather Advisory"
        subtitle="Farm rainfall forecast & weather alerts"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <WeatherWidget weather={weather} />

        {/* Agricultural Advisory Card */}
        <Card style={styles.advisoryCard}>
          <View style={styles.advisoryTitleRow}>
            <Info color={COLORS.secondaryGold} size={22} />
            <Text style={styles.advisoryHeading}>Farmer Advisory</Text>
          </View>
          <Text style={styles.advisoryBody}>{weather?.farming_advisory}</Text>
        </Card>

        {/* 4-Day Forecast Section */}
        <Text style={styles.sectionTitle}>5-Day Farm Forecast</Text>
        {weather?.forecast.map((day, idx) => (
          <Card key={idx} variant="bordered" style={styles.forecastCard}>
            <View style={styles.forecastRow}>
              <Text style={styles.dayText}>{day.day}</Text>
              <View style={styles.condRow}>
                <CloudRain color="#3B82F6" size={18} />
                <Text style={styles.condText}>{day.condition}</Text>
              </View>
              <View style={styles.tempRange}>
                <Text style={styles.highTemp}>{day.temp_max}°</Text>
                <Text style={styles.lowTemp}>/ {day.temp_min}°C</Text>
              </View>
            </View>
          </Card>
        ))}
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
  },
  advisoryCard: {
    backgroundColor: '#FEF3C7',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.secondaryGold,
    marginVertical: 12,
  },
  advisoryTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  advisoryHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginLeft: 8,
  },
  advisoryBody: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginVertical: 12,
  },
  forecastCard: {
    marginVertical: 4,
    paddingVertical: 14,
  },
  forecastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dayText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
    width: 100,
  },
  condRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  condText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: '600',
  },
  tempRange: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highTemp: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  lowTemp: {
    fontSize: 14,
    color: COLORS.textLight,
  },
});
