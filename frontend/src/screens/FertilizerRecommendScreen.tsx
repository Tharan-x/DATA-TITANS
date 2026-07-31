import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { farmApi } from '../services/farmApi';
import { FertilizerPlan } from '../types';
import { COLORS } from '../constants/theme';
import { FlaskConical, Calendar, AlertTriangle, Sprout } from 'lucide-react-native';

export const FertilizerRecommendScreen = ({ navigation }: any) => {
  const [crop, setCrop] = useState('Paddy (Rice)');
  const [acres, setAcres] = useState('2.0');
  const [nVal, setNVal] = useState('40');
  const [pVal, setPVal] = useState('20');
  const [kVal, setKVal] = useState('30');
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<FertilizerPlan | null>(null);

  const handleCalculate = async () => {
    setLoading(true);
    const res = await farmApi.getFertilizerRecommendation({
      crop_name: crop,
      soil_type: 'Clay Loam',
      nitrogen: parseFloat(nVal) || 40,
      phosphorus: parseFloat(pVal) || 20,
      potassium: parseFloat(kVal) || 30,
      land_area_acres: parseFloat(acres) || 1.0,
    });
    setPlan(res);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Fertilizer Calculator"
        subtitle="Soil NPK & Organic Fertilizer Recommendation"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.inputCard}>
          <Text style={styles.cardHeaderTitle}>Enter Field & Soil Test Details</Text>

          <View style={styles.formRow}>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Crop Name</Text>
              <TextInput style={styles.input} value={crop} onChangeText={setCrop} />
            </View>
            <View style={styles.halfInput}>
              <Text style={styles.label}>Land Area (Acres)</Text>
              <TextInput style={styles.input} value={acres} onChangeText={setAcres} keyboardType="numeric" />
            </View>
          </View>

          <Text style={styles.label}>Current N-P-K Soil Values (kg/acre)</Text>
          <View style={styles.npkRow}>
            <View style={styles.npkBox}>
              <Text style={styles.npkTag}>N (Nitrogen)</Text>
              <TextInput style={styles.npkInput} value={nVal} onChangeText={setNVal} keyboardType="numeric" />
            </View>
            <View style={styles.npkBox}>
              <Text style={styles.npkTag}>P (Phosphorus)</Text>
              <TextInput style={styles.npkInput} value={pVal} onChangeText={setPVal} keyboardType="numeric" />
            </View>
            <View style={styles.npkBox}>
              <Text style={styles.npkTag}>K (Potash)</Text>
              <TextInput style={styles.npkInput} value={kVal} onChangeText={setKVal} keyboardType="numeric" />
            </View>
          </View>

          <Button
            title="Calculate Dosage"
            onPress={handleCalculate}
            variant="primary"
            loading={loading}
            style={styles.calcBtn}
          />
        </Card>

        {plan && (
          <View style={styles.resultsContainer}>
            {/* Calculated Inorganic Fertilizers */}
            <Card style={styles.resultCard}>
              <Text style={styles.resultTitle}>🧪 Inorganic Fertilizer Dosage ({acres} Acres)</Text>
              {plan.recommended_fertilizers.map((fert, idx) => (
                <View key={idx} style={styles.fertItem}>
                  <View>
                    <Text style={styles.fertName}>{fert.fertilizer}</Text>
                    <Text style={styles.fertPurpose}>{fert.purpose}</Text>
                  </View>
                  <Text style={styles.fertQty}>{fert.quantity_kg} kg</Text>
                </View>
              ))}
            </Card>

            {/* Organic Alternatives */}
            <Card style={styles.organicCard}>
              <Text style={styles.resultTitle}>🌱 Organic Alternatives</Text>
              {plan.organic_alternatives.map((alt, idx) => (
                <Text key={idx} style={styles.bulletText}>• {alt}</Text>
              ))}
            </Card>

            {/* Schedule */}
            <Card style={styles.scheduleCard}>
              <Text style={styles.resultTitle}>📅 Application Schedule</Text>
              {plan.application_schedule.map((sch, idx) => (
                <View key={idx} style={styles.schRow}>
                  <Calendar color={COLORS.primaryEmerald} size={16} />
                  <Text style={styles.schText}>{sch}</Text>
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
  inputCard: {
    marginBottom: 16,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 14,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  halfInput: {
    width: '48%',
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    paddingHorizontal: 14,
    height: 48,
    fontSize: 15,
    color: COLORS.textDark,
  },
  npkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  npkBox: {
    width: '31%',
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  npkTag: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
    marginBottom: 4,
  },
  npkInput: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    textAlign: 'center',
    width: '100%',
  },
  calcBtn: {
    marginTop: 6,
  },
  resultsContainer: {
    marginTop: 8,
  },
  resultCard: {
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 12,
  },
  fertItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  fertName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
  },
  fertPurpose: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  fertQty: {
    fontSize: 18,
    fontWeight: '900',
    color: COLORS.primaryEmerald,
  },
  organicCard: {
    backgroundColor: '#E6F4ED',
    marginBottom: 12,
  },
  bulletText: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 22,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
  },
  schRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  schText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginLeft: 8,
    flex: 1,
  },
});
