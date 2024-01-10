import { StateCreator, create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware';
import type { Task, TaskStatus } from '../../interfaces';
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  tasks: Record<string, Task>; // {[key: string]: Task}
  draggingTaskId?: string;

  totalTasks: () => number;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (taskId: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus: (taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/immer", never]]> = (set, get) => ({
  draggingTaskId: undefined,
  tasks: {},

  totalTasks: () => {
    return Object.values(get().tasks).length;
  },

  getTaskByStatus: (status: TaskStatus) => {
    return Object.values(get().tasks).filter(task => task.status === status);
  },

  addTask: (title: string, status: TaskStatus) => {

    const newTask = { id: uuidv4(), title, status };

    //? Con Middleware Immer
    set(state => {
      state.tasks[newTask.id] = newTask;
    }, false, 'addTask');

    //? Forma nativa de Zustand
    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   }
    // }));
  },

  setDraggingTaskId: (taskId: string) => set({ draggingTaskId: taskId }, false, 'setDraggingTaskId'),

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDraggingTaskId'),

  changeTaskStatus: (taskId: string, status: TaskStatus) => {
    // //? Con Middleware Immer
    set(state => {
      state.tasks[taskId].status = status;
    }, false, 'changeTaskStatus');

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