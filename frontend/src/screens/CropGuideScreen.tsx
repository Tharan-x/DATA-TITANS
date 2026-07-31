import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { farmApi } from '../services/farmApi';
import { CropGuideItem } from '../types';
import { COLORS } from '../constants/theme';
import { Sprout, Calendar, Droplets, Thermometer } from 'lucide-react-native';

export const CropGuideScreen = ({ navigation }: any) => {
  const [crops, setCrops] = useState<CropGuideItem[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<CropGuideItem | null>(null);

  useEffect(() => {
    farmApi.getCropGuides().then((data) => {
      setCrops(data);
      if (data.length > 0) setSelectedCrop(data[0]);
    });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Crop Guide"
        subtitle="Stage-wise advisory & growth management"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Horizontal Crop Selection Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {crops.map((crop) => {
            const isSelected = selectedCrop?.id === crop.id;
            return (
              <TouchableOpacity
                key={crop.id}
                onPress={() => setSelectedCrop(crop)}
                style={[styles.tab, isSelected && styles.activeTab]}
              >
                <Sprout color={isSelected ? '#FFFFFF' : COLORS.primaryDarkGreen} size={18} />
                <Text style={[styles.tabText, isSelected && styles.activeTabText]}>
                  {crop.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {selectedCrop && (
          <View>
            {/* Overview Card */}
            <Card style={styles.overviewCard}>
              <View style={styles.titleRow}>
                <Text style={styles.cropTitle}>{selectedCrop.name}</Text>
                <Badge label={selectedCrop.ideal_season} variant="success" />
              </View>

              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Calendar color={COLORS.primaryEmerald} size={18} />
                  <Text style={styles.metricLabel}>Duration</Text>
                  <Text style={styles.metricValue}>{selectedCrop.duration_days} Days</Text>
                </View>
                <View style={styles.metricItem}>
                  <Droplets color="#3B82F6" size={18} />
                  <Text style={styles.metricLabel}>Water Need</Text>
                  <Text style={styles.metricValue}>{selectedCrop.water_requirement}</Text>
                </View>
                <View style={styles.metricItem}>
                  <Thermometer color={COLORS.secondaryGold} size={18} />
                  <Text style={styles.metricLabel}>Temp Range</Text>
                  <Text style={styles.metricValue}>{selectedCrop.optimal_temp}</Text>
                </View>
              </View>
            </Card>

            {/* Stages Section */}
            <Text style={styles.sectionHeader}>Growth Stages & Advisory</Text>
            {selectedCrop.stages.map((stage, idx) => (
              <Card key={idx} variant="bordered" style={styles.stageCard}>
                <View style={styles.stageHeader}>
                  <View style={styles.stepCircle}>
                    <Text style={styles.stepNum}>{idx + 1}</Text>
                  </View>
                  <View style={styles.stageTitleBox}>
                    <Text style={styles.stageName}>{stage.stage_name}</Text>
                    <Text style={styles.stageDays}>{stage.days}</Text>
                  </View>
                </View>
                <Text style={styles.stageAdvisory}>{stage.advisory}</Text>
              </Card>
            ))}
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
  tabScroll: {
    marginBottom: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  activeTab: {
    backgroundColor: COLORS.primaryDarkGreen,
    borderColor: COLORS.primaryDarkGreen,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
    marginLeft: 6,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cropTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginVertical: 12,
  },
  stageCard: {
    marginVertical: 6,
  },
  stageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primaryEmerald,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNum: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 14,
  },
  stageTitleBox: {
    marginLeft: 12,
  },
  stageName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  stageDays: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  stageAdvisory: {
    fontSize: 14,
    color: COLORS.textDark,
    lineHeight: 20,
  },
});
