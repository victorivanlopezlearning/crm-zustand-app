import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Task, TaskStatus } from '../../interfaces';

interface TaskState {
  tasks: Record<string, Task>; // {[key: string]: Task}
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'open' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'in-progress' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  },

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter(task => task.status === status);
  },

  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId]: task,
      }
    }))
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if (!taskId) return;

    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },
});

export const useTaksStore = create<TaskState>()(
  devtools(
    storeApi
  )
);