import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { farmApi } from '../services/farmApi';
import { DiseaseReport } from '../types';
import { COLORS } from '../constants/theme';
import { Camera, UploadCloud, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react-native';

export const DiseaseDetectionScreen = ({ navigation }: any) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<DiseaseReport | null>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const res = await farmApi.getDiseaseDetection('Paddy');
    setReport(res);
    setAnalyzing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Disease Detection"
        subtitle="AI Leaf Diagnostic & Organic Remedies"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Upload Box */}
        <Card style={styles.uploadCard}>
          <View style={styles.uploadCircle}>
            <Camera color={COLORS.primaryEmerald} size={36} />
          </View>
          <Text style={styles.uploadTitle}>Scan Crop Leaf</Text>
          <Text style={styles.uploadSub}>Take a photo of diseased leaf or select from gallery</Text>
          <View style={styles.btnRow}>
            <Button
              title="Capture Photo"
              onPress={handleAnalyze}
              variant="primary"
              style={styles.actionBtn}
              loading={analyzing}
            />
          </View>
        </Card>

        {report && (
          <View style={styles.reportSection}>
            <Card style={styles.resultCard}>
              <View style={styles.resultHeader}>
                <View>
                  <Text style={styles.diseaseName}>{report.disease_detected}</Text>
                  <Text style={styles.confidence}>Confidence Score: {Math.round(report.confidence * 100)}%</Text>
                </View>
                <Badge label={report.severity} variant="warning" />
              </View>

              <Text style={styles.subtitleHeader}>Observed Symptoms</Text>
              {report.symptoms.map((symptom, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <AlertTriangle color={COLORS.warning} size={16} />
                  <Text style={styles.bulletText}>{symptom}</Text>
                </View>
              ))}
            </Card>

            {/* Organic Treatment Card */}
            <Card style={styles.organicCard}>
              <Text style={styles.remedyTitle}>🌿 Organic Remedies (Eco-friendly)</Text>
              {report.organic_treatment.map((treatment, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <CheckCircle2 color={COLORS.primaryEmerald} size={16} />
                  <Text style={styles.bulletText}>{treatment}</Text>
                </View>
              ))}
            </Card>

            {/* Chemical Treatment Card */}
            <Card style={styles.chemicalCard}>
              <Text style={styles.remedyTitle}>🧪 Recommended Chemical Treatment</Text>
              {report.chemical_treatment.map((chem, idx) => (
                <View key={idx} style={styles.bulletRow}>
                  <ShieldAlert color="#3B82F6" size={16} />
                  <Text style={styles.bulletText}>{chem}</Text>
                </View>
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
  uploadCard: {
    alignItems: 'center',
    paddingVertical: 24,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
  },
  uploadCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E6F4ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  uploadSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  btnRow: {
    width: '100%',
    paddingHorizontal: 20,
  },
  actionBtn: {
    width: '100%',
  },
  reportSection: {
    marginTop: 16,
  },
  resultCard: {
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  diseaseName: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primaryDarkGreen,
  },
  confidence: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  subtitleHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
    marginTop: 8,
    marginBottom: 6,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  bulletText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 8,
    flex: 1,
  },
  organicCard: {
    backgroundColor: '#E6F4ED',
    marginTop: 12,
  },
  chemicalCard: {
    backgroundColor: '#EFF6FF',
    marginTop: 12,
  },
  remedyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 10,
  },
});
