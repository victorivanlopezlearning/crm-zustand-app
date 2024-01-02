import { StateStorage, createJSONStorage } from 'zustand/middleware';

const firebaseUrl = 'https://zustand-storage-89a30-default-rtdb.firebaseio.com/person';

const storageAPI: StateStorage = {
  getItem: async function (name: string): Promise<string | null> {
    try {
      const res = await fetch(`${firebaseUrl}/${name}.json`);
      const data = await res.json();
      return JSON.stringify(data);
    } catch (error) {
      throw error;
    }
  },
  setItem: async function (name: string, value: string): Promise<void> {
    try {
      await fetch(`${firebaseUrl}/${name}.json`, {
        method: 'PUT',
        body: value,
      });
      return;
    } catch (error) {
      throw error;
    }
  },
  removeItem: function (name: string): void | Promise<void> {
    console.log('removeItem', name);
  }
}

export const firebaseStorage = createJSONStorage(() => storageAPI);