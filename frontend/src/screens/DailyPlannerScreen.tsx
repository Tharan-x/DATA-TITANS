import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Header } from '../components/Header';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { usePlannerStore } from '../store/usePlannerStore';
import { COLORS } from '../constants/theme';
import { CheckCircle2, Circle, Calendar, Droplets, SprayCan, Sprout } from 'lucide-react-native';

export const DailyPlannerScreen = ({ navigation }: any) => {
  const { tasks, fetchTasks, toggleTaskStatus } = usePlannerStore();

  useEffect(() => {
    fetchTasks();
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'irrigation': return <Droplets color="#3B82F6" size={18} />;
      case 'pest control': return <SprayCan color={COLORS.danger} size={18} />;
      default: return <Sprout color={COLORS.primaryEmerald} size={18} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Daily Farm Planner"
        subtitle="Schedule & completed farm operations"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionHeader}>Today's Scheduled Tasks</Text>

        {tasks.map((task) => {
          const isDone = task.status === 'COMPLETED';
          return (
            <TouchableOpacity
              key={task.id}
              onPress={() => toggleTaskStatus(task.id)}
              activeOpacity={0.85}
            >
              <Card
                variant="bordered"
                style={[styles.taskCard, isDone && styles.doneCard]}
              >
                <View style={styles.taskRow}>
                  <TouchableOpacity onPress={() => toggleTaskStatus(task.id)}>
                    {isDone ? (
                      <CheckCircle2 color={COLORS.primaryEmerald} size={24} />
                    ) : (
                      <Circle color="#CBD5E1" size={24} />
                    )}
                  </TouchableOpacity>

                  <View style={styles.taskInfo}>
                    <View style={styles.categoryRow}>
                      {getCategoryIcon(task.category)}
                      <Text style={styles.categoryText}>{task.category}</Text>
                      <Text style={styles.cropTag}>• {task.crop_name}</Text>
                    </View>

                    <Text style={[styles.taskName, isDone && styles.strikethrough]}>
                      {task.task_name}
                    </Text>

                    {task.notes && (
                      <Text style={styles.notesText}>{task.notes}</Text>
                    )}
                  </View>

                  <Badge
                    label={task.task_date}
                    variant={isDone ? 'success' : 'warning'}
                  />
                </View>
              </Card>
            </TouchableOpacity>
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primaryDarkGreen,
    marginBottom: 12,
  },
  taskCard: {
    marginVertical: 6,
    padding: 16,
  },
  doneCard: {
    backgroundColor: '#F8FAFC',
    opacity: 0.8,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
    marginLeft: 14,
    marginRight: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primaryDarkGreen,
    marginLeft: 6,
  },
  cropTag: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginLeft: 4,
  },
  taskName: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  strikethrough: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  notesText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
});
