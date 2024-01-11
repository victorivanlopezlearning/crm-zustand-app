import { StateCreator } from 'zustand';

export interface PersonSlice {
  firstName: string;
  lastName: string;

  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
}

export const createPersonSlice: StateCreator<PersonSlice, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (firstName: string) => set({ firstName }, false, 'setFirstName'),
  setLastName: (lastName: string) => set({ lastName }, false, 'setLastName'),
});