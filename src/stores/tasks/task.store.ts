import { StateCreator, create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware';
import type { Task, TaskStatus } from '../../interfaces';
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  tasks: Record<string, Task>; // {[key: string]: Task}
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {},

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter(task => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {

    const newTask = { id: uuidv4(), title, status };

    //? Con Middleware Immer
    set(state => {
      state.tasks[newTask.id] = newTask;
    });

    //? Forma nativa de Zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   }
    // }));
  },

  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }),

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // //? Con Middleware Immer
    set(state => {
      state.tasks[taskId].status = status;
    })

    // //? Forma nativa de Zustand
    // const task = get().tasks[taskId];
    // task.status = status;

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskId]: task,
    //   }
    // }));
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
    persist(
      immer(storeApi),
      { name: 'task-store' }
    )
  )
);