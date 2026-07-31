import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from '../components/Button';
import { COLORS } from '../constants/theme';
import { useLanguageStore } from '../store/useLanguageStore';
import { TRANSLATIONS } from '../constants/translations';
import { Phone, ShieldCheck, Sprout } from 'lucide-react-native';

export const LoginScreen = ({ navigation }: any) => {
  const [phone, setPhone] = useState('9876543210');
  const { language } = useLanguageStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleLogin = () => {
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topSection}>
          <View style={styles.logoCircle}>
            <Sprout color="#FFFFFF" size={48} />
          </View>
          <Text style={styles.appName}>🌾 UZHAVAN AI</Text>
          <Text style={styles.welcomeText}>{t.phoneLogin}</Text>
          <Text style={styles.subText}>Enter your 10-digit mobile number to access AI farming advisory</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>{t.enterPhone}</Text>
          <View style={styles.phoneInputRow}>
            <Text style={styles.countryCode}>+91</Text>
            <View style={styles.divider} />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
              placeholder="9876543210"
            />
            <Phone color={COLORS.primaryEmerald} size={20} />
          </View>
        </View>

        <Button
          title={t.loginButton}
          onPress={handleLogin}
          variant="primary"
          style={styles.loginBtn}
        />

        <View style={styles.footerNote}>
          <ShieldCheck color={COLORS.primaryEmerald} size={18} />
          <Text style={styles.footerText}>Hackathon Instant Access Mode Activated</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.backgroundLight,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  topSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.primaryDarkGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 26,
    fontWeight: '900',
    color: COLORS.primaryDarkGreen,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: 8,
  },
  subText: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
    marginBottom: 8,
  },
  phoneInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 16,
    height: 56,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: COLORS.borderLight,
    marginHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  loginBtn: {
    marginTop: 10,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 6,
    fontWeight: '600',
  },
});
