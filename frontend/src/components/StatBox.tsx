import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface StatBoxProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
  subtext?: string;
}

export const StatBox: React.FC<StatBoxProps> = ({ label, value, icon, subtext }) => {
  return (
    <View style={styles.box}>
      <View style={styles.headerRow}>
        {icon}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
      {subtext && <Text style={styles.subtext}>{subtext}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    flex: 1,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginLeft: 6,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
  },
  subtext: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
});
