import { create } from 'zustand';

interface Bear {
  id: number;
  name: string;
}

interface BearState {
  blackBears: number;
  polarBears: number;
  pandaBears: number;

  bears: Bear[];

  increaseBlackBears: (by: number) => void;
  increasePolarBears: (by: number) => void;
  increasePandaBears: (by: number) => void;

  doNothing: () => void;
}

export const useBearStore = create<BearState>()((set) => ({
  blackBears: 0,
  polarBears: 0,
  pandaBears: 0,

  bears: [
    { id: 1, name: 'Oso #1' }
  ],

  increaseBlackBears: (by: number) => set((state) => ({ blackBears: state.blackBears + by })),
  increasePolarBears: (by: number) => set((state) => ({ polarBears: state.polarBears + by })),
  increasePandaBears: (by: number) => set((state) => ({ pandaBears: state.pandaBears + by })),

  doNothing: () => set(state => ({ bears: [...state.bears] })),
}));