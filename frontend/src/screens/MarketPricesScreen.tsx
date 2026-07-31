import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { farmApi } from '../services/farmApi';
import { CommodityPrice } from '../types';
import { COLORS } from '../constants/theme';
import { Search, TrendingUp, TrendingDown, Minus, Store } from 'lucide-react-native';

export const MarketPricesScreen = ({ navigation }: any) => {
  const [prices, setPrices] = useState<CommodityPrice[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    farmApi.getMarketPrices().then(setPrices);
  }, []);

  const filteredPrices = prices.filter((p) =>
    p.commodity.toLowerCase().includes(search.toLowerCase())
  );

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'UP': return <TrendingUp color={COLORS.primaryEmerald} size={18} />;
      case 'DOWN': return <TrendingDown color="#EF4444" size={18} />;
      default: return <Minus color={COLORS.secondaryGold} size={18} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Market Prices (மண்டி விலை)"
        subtitle="Live Mandi commodity prices & trends"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Search color={COLORS.primaryDarkGreen} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search crop (e.g. Paddy, Tomato, Onion)..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#94A3B8"
          />
        </View>

        {/* Commodity Prices List */}
        {filteredPrices.map((item) => (
          <Card key={item.id} variant="elevated" style={styles.priceCard}>
            <View style={styles.cardHeader}>
              <View>
                <Text style={styles.commodityName}>{item.commodity}</Text>
                <View style={styles.mandiRow}>
                  <Store color={COLORS.textSecondary} size={14} />
                  <Text style={styles.mandiName}>{item.mandi_name}, {item.district}</Text>
                </View>
              </View>
              <View style={styles.trendBadge}>
                {getTrendIcon(item.trend)}
                <Text style={styles.trendText}>{item.trend}</Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <View>
                <Text style={styles.modalLabel}>Modal Price (சராசரி)</Text>
                <Text style={styles.modalPrice}>₹{item.modal_price_per_quintal} <Text style={styles.unit}>/ Quintal</Text></Text>
              </View>
              <View style={styles.rangeBox}>
                <Text style={styles.rangeText}>Min: ₹{item.min_price}</Text>
                <Text style={styles.rangeText}>Max: ₹{item.max_price}</Text>
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    marginLeft: 10,
    color: COLORS.textDark,
  },
  priceCard: {
    marginVertical: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  commodityName: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  mandiRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  mandiName: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginLeft: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E6F4ED',
    borderRadius: 16,
    padding: 14,
  },
  modalLabel: {
    fontSize: 11,
    color: COLORS.primaryDarkGreen,
    fontWeight: '600',
  },
  modalPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.primaryDarkGreen,
    marginTop: 2,
  },
  unit: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  rangeBox: {
    alignItems: 'flex-end',
  },
  rangeText: {
    fontSize: 12,
    color: COLORS.textDark,
    fontWeight: '600',
  },
});
