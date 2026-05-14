import { create } from 'zustand';
import { AuthUser, UserRole } from '@/types/auth.types';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  token: string | null;
  setUser: (user: AuthUser | null) => void;
  setToken: (token: string | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  setUser: (user) => {
    console.log('AuthStore: Setting user:', user);
    set({ user });
  },
  setToken: (token) => {
    console.log('AuthStore: Setting token:', token ? 'exists' : 'null');
    set({ token });
  },
  setAuthenticated: (isAuthenticated) => {
    console.log('AuthStore: Setting authenticated:', isAuthenticated);
    set({ isAuthenticated });
  },
  logout: () => {
    console.log('AuthStore: Logging out');
    set({ user: null, isAuthenticated: false, token: null });
  },
}));
