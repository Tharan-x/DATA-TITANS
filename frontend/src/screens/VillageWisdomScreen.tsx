import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { COLORS } from '../constants/theme';
import { Sparkles, ThumbsUp, Lightbulb, HeartHandshake } from 'lucide-react-native';

export const VillageWisdomScreen = ({ navigation }: any) => {
  const wisdomList = [
    {
      id: 'vw-1',
      topic: 'Natural Pest Control',
      title: 'Neem-Karanja Oil Dual Emulsion for Leaf Folder',
      traditional: 'Mix 50ml Neem oil + 50ml Karanja oil with 10g soap powder in 10L water. Spray during full moon evening.',
      scientific: 'Azadirachtin (Neem) disrupts insect molting while Karanjin acts as a feeding deterrent. Evening spraying preserves active compounds from UV degradation.',
      region: 'Cauvery Delta, Tamil Nadu',
      likes: 142
    },
    {
      id: 'vw-2',
      topic: 'Soil Fertility',
      title: 'Green Manuring with Sunnhemp (சணப்பை)',
      traditional: 'Sow Sunnhemp seeds after paddy harvest. Plow back into the soil after 45 days during early flowering.',
      scientific: 'Incorporating leguminous green manure fixes 60-80 kg/ha atmospheric Nitrogen and adds 15-20 Tons of fresh organic matter per acre.',
      region: 'Kongu Region',
      likes: 218
    }
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Village Wisdom AI"
        subtitle="Traditional wisdom backed by modern agricultural science"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {wisdomList.map((item) => (
          <Card key={item.id} style={styles.wisdomCard}>
            <View style={styles.cardHeader}>
              <Badge label={item.topic} variant="success" />
              <View style={styles.likesBadge}>
                <ThumbsUp color={COLORS.primaryEmerald} size={14} />
                <Text style={styles.likesCount}>{item.likes}</Text>
              </View>
            </View>

            <Text style={styles.wisdomTitle}>{item.title}</Text>
            <Text style={styles.regionText}>📍 {item.region}</Text>

            <View style={styles.boxTraditional}>
              <View style={styles.boxHeader}>
                <HeartHandshake color="#D97706" size={16} />
                <Text style={styles.boxTitleTraditional}>Traditional Practice (கிராமத்து முறை)</Text>
              </View>
              <Text style={styles.boxText}>{item.traditional}</Text>
            </View>

            <View style={styles.boxScientific}>
              <View style={styles.boxHeader}>
                <Lightbulb color={COLORS.primaryEmerald} size={16} />
                <Text style={styles.boxTitleScientific}>Scientific Basis (அறிவியல் சான்று)</Text>
              </View>
              <Text style={styles.boxText}>{item.scientific}</Text>
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
  wisdomCard: {
    marginVertical: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  likesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F4ED',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  likesCount: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginLeft: 4,
  },
  wisdomTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  regionText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 2,
    marginBottom: 12,
  },
  boxTraditional: {
    backgroundColor: '#FEF3C7',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  boxScientific: {
    backgroundColor: '#E6F4ED',
    borderRadius: 14,
    padding: 12,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  boxTitleTraditional: {
    fontSize: 13,
    fontWeight: '800',
    color: '#D97706',
    marginLeft: 6,
  },
  boxTitleScientific: {
    fontSize: 13,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginLeft: 6,
  },
  boxText: {
    fontSize: 13,
    color: COLORS.textDark,
    lineHeight: 18,
  },
});
