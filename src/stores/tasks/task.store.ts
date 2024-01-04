import { StateCreator, create } from 'zustand';
import { Task } from '../../interfaces';

interface TaskState {
  tasks: Record<string, Task> // {[key: string]: Task}
}

const storeApi: StateCreator<TaskState> = (set) => ({
  tasks: {
    'ABC-1': { id: 'ABC-1', title: 'Task 1', status: 'open' },
    'ABC-2': { id: 'ABC-2', title: 'Task 2', status: 'open' },
    'ABC-3': { id: 'ABC-3', title: 'Task 3', status: 'in-progress' },
    'ABC-4': { id: 'ABC-4', title: 'Task 4', status: 'open' },
  }
});

export const useTaksStore = create<TaskState>()(storeApi);