import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Card } from './Card';
import { COLORS } from '../constants/theme';

interface QuickActionCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onPress: () => void;
  badge?: string;
  backgroundColor?: string;
}

export const QuickActionCard: React.FC<QuickActionCardProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  badge,
  backgroundColor = '#FFFFFF',
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85} style={styles.touchable}>
      <Card style={[styles.card, { backgroundColor }]}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>{icon}</View>
          {badge && (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '48%',
    marginVertical: 4,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    minHeight: 140,
    justify: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#E6F4ED',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: COLORS.secondaryGold,
  },
  title: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: COLORS.textSecondary,
    lineHeight: 16,
  },
});
