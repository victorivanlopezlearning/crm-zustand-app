import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { PersonSlice, createPersonSlice } from './person.slice';
import { GuestSlice, createGuestSlice } from './guest.slice';

type BoundState = PersonSlice & GuestSlice;

export const useWeddingBoundStore = create<BoundState>()(
  devtools(
    (...a) => ({
      ...createPersonSlice(...a),
      ...createGuestSlice(...a),
    })
  )
)