import { StateCreator, create } from 'zustand';
import type { User } from '../../interfaces';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
}

export type AuthStatus = 'authorized' | 'unauthorized' | 'pending';

const storeApi: StateCreator<AuthState> = () => ({
  status: 'unauthorized',
  token: undefined,
  user: undefined,
});

export const useAuthStore = create<AuthState>()(
  storeApi
)