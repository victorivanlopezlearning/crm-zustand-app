import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;

  checkAuthStatus: () => Promise<void>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
}

export type AuthStatus = 'authorized' | 'unauthorized' | 'pending';

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,

  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw new Error('UnAuthorized');
    }
  },

  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw new Error('UnAuthorized');
    }
  },

  logoutUser: () => set({ status: 'unauthorized', token: undefined, user: undefined })
});

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      storeApi,
      { name: 'user-store' }
    )
  )
);