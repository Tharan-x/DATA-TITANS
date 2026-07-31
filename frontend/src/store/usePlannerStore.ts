import { create } from 'zustand';
import { PlannerTask } from '../types';
import { farmApi } from '../services/farmApi';

interface PlannerState {
  tasks: PlannerTask[];
  loading: boolean;
  fetchTasks: () => Promise<void>;
  toggleTaskStatus: (taskId: string) => void;
}

export const usePlannerStore = create<PlannerState>((set) => ({
  tasks: [],
  loading: false,
  fetchTasks: async () => {
    set({ loading: true });
    const data = await farmApi.getPlannerTasks();
    set({ tasks: data, loading: false });
  },
  toggleTaskStatus: (taskId) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' }
          : task
      ),
    }));
  },
}));
