import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { OfflineBanner } from '../components/OfflineBanner';
import { farmApi } from '../services/farmApi';
import { KnowledgeCard } from '../types';
import { useLanguageStore } from '../store/useLanguageStore';
import { COLORS } from '../constants/theme';
import { CheckCircle2, HardDrive } from 'lucide-react-native';

export const OfflineCardsScreen = ({ navigation }: any) => {
  const { language } = useLanguageStore();
  const [cards, setCards] = useState<KnowledgeCard[]>([]);

  useEffect(() => {
    farmApi.getOfflineTips().then(setCards);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Offline Knowledge Cards"
        subtitle="Zero-connectivity actionable farming tips"
        onBackPress={() => navigation.goBack()}
      />
      <OfflineBanner message="Offline Cards Cached in Phone Storage" />
      <ScrollView contentContainerStyle={styles.container}>
        {cards.map((card) => {
          const title = card.title[language] || card.title.en;
          const summary = card.summary[language] || card.summary.en;

          return (
            <Card key={card.id} style={styles.card}>
              <View style={styles.headerRow}>
                <Badge label={card.category} variant="info" />
                <HardDrive color={COLORS.primaryEmerald} size={18} />
              </View>

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.summary}>{summary}</Text>

              <View style={styles.stepsBox}>
                <Text style={styles.stepsHeader}>Action Steps:</Text>
                {card.actionable_steps.map((step, idx) => (
                  <View key={idx} style={styles.stepRow}>
                    <CheckCircle2 color={COLORS.primaryEmerald} size={16} />
                    <Text style={styles.stepText}>{step}</Text>
                  </View>
                ))}
              </View>
            </Card>
          );
        })}
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
  card: {
    marginVertical: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 6,
  },
  summary: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  stepsBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  stepsHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 8,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  stepText: {
    fontSize: 13,
    color: COLORS.textDark,
    marginLeft: 8,
    flex: 1,
    lineHeight: 18,
  },
});
