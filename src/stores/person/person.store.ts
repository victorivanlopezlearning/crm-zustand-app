import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { firebaseStorage } from '../storages/firebase.storage';
import { useWeddingBoundStore } from '..';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',
  setFirstName: (value: string) => set(({ firstName: value }), false, 'setFirstName'),
  setLastName: (value: string) => set(({ lastName: value }), false, 'setLastName'),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(
      storeAPI,
      {
        name: 'person-storage',
        storage: firebaseStorage
      }
    )
  )
);

usePersonStore.subscribe((nextState) => {

  const { firstName, lastName } = nextState;

  useWeddingBoundStore.getState().setFirstName(firstName);
  useWeddingBoundStore.getState().setLastName(lastName);
});