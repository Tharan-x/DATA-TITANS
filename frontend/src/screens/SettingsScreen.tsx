import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useLanguageStore } from '../store/useLanguageStore';
import { useUserStore } from '../store/useUserStore';
import { COLORS } from '../constants/theme';
import { Globe, User, Database, Info, ShieldCheck, ChevronRight } from 'lucide-react-native';

export const SettingsScreen = ({ navigation }: any) => {
  const { language } = useLanguageStore();
  const { user } = useUserStore();

  const handleClearCache = () => {
    Alert.alert('Cache Cleared', 'Offline cached data cleared successfully.');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Settings & Profile"
        subtitle="App settings & regional preferences"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Card */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <User color="#FFFFFF" size={32} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userPhone}>{user?.phone}</Text>
            <Text style={styles.userLocation}>📍 {user?.district}, {user?.state}</Text>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>App Preferences</Text>

        <TouchableOpacity onPress={() => navigation.navigate('LanguageSelect')}>
          <Card variant="bordered" style={styles.menuItem}>
            <View style={styles.menuRow}>
              <View style={styles.menuIconBox}>
                <Globe color={COLORS.primaryDarkGreen} size={20} />
              </View>
              <View style={styles.menuTextGroup}>
                <Text style={styles.menuTitle}>App Language</Text>
                <Text style={styles.menuSub}>Current: {language.toUpperCase()}</Text>
              </View>
              <ChevronRight color={COLORS.textLight} size={20} />
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleClearCache}>
          <Card variant="bordered" style={styles.menuItem}>
            <View style={styles.menuRow}>
              <View style={styles.menuIconBox}>
                <Database color={COLORS.primaryEmerald} size={20} />
              </View>
              <View style={styles.menuTextGroup}>
                <Text style={styles.menuTitle}>Offline Data Sync</Text>
                <Text style={styles.menuSub}>Status: Cached & Ready</Text>
              </View>
              <ChevronRight color={COLORS.textLight} size={20} />
            </View>
          </Card>
        </TouchableOpacity>

        {/* Hackathon Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.infoRow}>
            <ShieldCheck color={COLORS.primaryDarkGreen} size={24} />
            <View style={styles.infoTextGroup}>
              <Text style={styles.appName}>🌾 UZHAVAN AI v1.0.0</Text>
              <Text style={styles.appTag}>Your AI Farming Companion for Smarter Decisions</Text>
              <Text style={styles.teamTag}>National Hackathon Production Architecture</Text>
            </View>
          </View>
        </Card>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreen,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primaryEmerald,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userPhone: {
    fontSize: 13,
    color: '#E6F4ED',
    marginTop: 2,
  },
  userLocation: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginVertical: 10,
  },
  menuItem: {
    marginVertical: 4,
    paddingVertical: 14,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#E6F4ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextGroup: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
  },
  menuSub: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  infoCard: {
    backgroundColor: '#FEF3C7',
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoTextGroup: {
    marginLeft: 12,
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.primaryDarkGreen,
  },
  appTag: {
    fontSize: 12,
    color: COLORS.textDark,
    marginTop: 2,
  },
  teamTag: {
    fontSize: 11,
    color: COLORS.secondaryGold,
    fontWeight: '700',
    marginTop: 4,
  },
});
