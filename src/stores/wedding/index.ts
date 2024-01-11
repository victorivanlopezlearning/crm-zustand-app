import { create } from "zustand";
import { PersonSlice, createPersonSlice } from "./person.slice";

type BoundState = PersonSlice;

export const useWeddingBoundStore = create<BoundState>()(
  (...a) => ({
    ...createPersonSlice(...a)
  })
)