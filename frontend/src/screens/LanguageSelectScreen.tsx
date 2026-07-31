import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useLanguageStore } from '../store/useLanguageStore';
import { LanguagePicker } from '../components/LanguagePicker';
import { Button } from '../components/Button';
import { COLORS } from '../constants/theme';
import { TRANSLATIONS } from '../constants/translations';
import { Globe } from 'lucide-react-native';

export const LanguageSelectScreen = ({ navigation }: any) => {
  const { language, setLanguage } = useLanguageStore();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  const handleContinue = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerBox}>
          <View style={styles.iconBadge}>
            <Globe color={COLORS.primaryDarkGreen} size={32} />
          </View>
          <Text style={styles.title}>{t.selectLanguage}</Text>
          <Text style={styles.subtitle}>Choose your preferred regional language for AI advice and weather updates</Text>
        </View>

        <LanguagePicker selectedLanguage={language} onSelectLanguage={setLanguage} />

        <Button
          title={t.continue}
          onPress={handleContinue}
          variant="primary"
          style={styles.button}
        />
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
    padding: 20,
  },
  headerBox: {
    alignItems: 'center',
    marginVertical: 20,
  },
  iconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E6F4ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 6,
  },
  button: {
    marginTop: 20,
  },
});
