import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/lib/api';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: AdminUser | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setAuth: (token: string, user: AdminUser) => void;
  logout: () => void;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
      logout: () => set({ token: null, user: null, isAuthenticated: false }),
      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),
    {
      name: 'soloma-admin-auth',
      partialize: (state) => ({ token: state.token, user: state.user, isAuthenticated: state.isAuthenticated }),
      onRehydrateStorage: () => (state) => {
        // Réinjecter le token dans Axios après réhydratation depuis localStorage
        if (state?.token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
        }
        state?.setHasHydrated(true);
      },
    },
  ),
);
