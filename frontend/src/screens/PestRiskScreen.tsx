import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { farmApi } from '../services/farmApi';
import { PestRiskReport } from '../types';
import { COLORS } from '../constants/theme';
import { Bug, AlertOctagon, ShieldAlert, CloudRain } from 'lucide-react-native';

export const PestRiskScreen = ({ navigation }: any) => {
  const [report, setReport] = useState<PestRiskReport | null>(null);

  useEffect(() => {
    farmApi.getPestRisk('Paddy').then(setReport);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Pest Risk Prediction"
        subtitle="Weather-based pest outbreak warning"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {report && (
          <View>
            {/* Risk Gauge Card */}
            <Card style={styles.gaugeCard}>
              <View style={styles.gaugeHeader}>
                <View style={styles.iconCircle}>
                  <Bug color="#FFFFFF" size={32} />
                </View>
                <View>
                  <Text style={styles.cropTitle}>Paddy Field Pest Risk</Text>
                  <Text style={styles.districtText}>Coimbatore District • High Humidity Alert</Text>
                </View>
              </View>

              <View style={styles.scoreRow}>
                <Text style={styles.scoreValue}>{report.risk_score}%</Text>
                <Badge label={`${report.risk_level} RISK`} variant="danger" />
              </View>

              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${report.risk_score}%` }]} />
              </View>
            </Card>

            {/* Target Pests */}
            <Text style={styles.sectionTitle}>High Vulnerability Pests</Text>
            {report.potential_pests.map((pest, idx) => (
              <Card key={idx} variant="bordered" style={styles.pestCard}>
                <View style={styles.pestHeader}>
                  <AlertOctagon color={COLORS.danger} size={20} />
                  <Text style={styles.pestName}>{pest.pest_name}</Text>
                </View>
                <Text style={styles.pestSymptom}>Symptom: {pest.symptoms}</Text>
              </Card>
            ))}

            {/* Preventive Action Plan */}
            <Card style={styles.actionCard}>
              <Text style={styles.actionTitle}>🛡️ Recommended Preventive Actions</Text>
              {report.recommended_preventive_sprays.map((spray, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <ShieldAlert color={COLORS.primaryEmerald} size={16} />
                  <Text style={styles.bulletText}>{spray}</Text>
                </View>
              ))}
            </Card>

            {/* Weather Trigger Factors */}
            <Card style={styles.triggerCard}>
              <Text style={styles.triggerTitle}>⛈️ Weather Trigger Factors</Text>
              {report.weather_trigger_factors.map((factor, idx) => (
                <Text key={idx} style={styles.triggerText}>• {factor}</Text>
              ))}
            </Card>
          </View>
        )}
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
  gaugeCard: {
    backgroundColor: COLORS.primaryDarkGreen,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  gaugeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: COLORS.danger,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  cropTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  districtText: {
    fontSize: 12,
    color: '#E6F4ED',
    marginTop: 2,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.danger,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginVertical: 10,
  },
  pestCard: {
    marginVertical: 4,
  },
  pestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  pestName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginLeft: 8,
  },
  pestSymptom: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  actionCard: {
    backgroundColor: '#E6F4ED',
    marginTop: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 10,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  bulletText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 8,
    flex: 1,
  },
  triggerCard: {
    backgroundColor: '#FEF3C7',
    marginTop: 12,
  },
  triggerTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 8,
  },
  triggerText: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 20,
  },
});
