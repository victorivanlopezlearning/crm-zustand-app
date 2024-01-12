import { StateCreator } from 'zustand';

export interface GuestSlice {
  guestCount: number;

  setGuestCount: (value: number) => void;
}

export const createGuestSlice: StateCreator<GuestSlice, [["zustand/devtools", never]]> = (set) => ({
  guestCount: 0,

  setGuestCount: (value: number) => {
    set({ guestCount: value > 0 ? value : 0 }, false, 'setGuestCount');
  },
});