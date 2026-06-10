import { create } from 'zustand';
import type { CraneFilters, CraneStatus } from '@/types';

interface FilterState {
  filters: CraneFilters;
  setFilter: (key: keyof CraneFilters, value: any) => void;
  resetFilters: () => void;
}

const defaultFilters: CraneFilters = {
  page: 1,
  limit: 12,
};

export const useFilterStore = create<FilterState>((set) => ({
  filters: defaultFilters,

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value, page: 1 },
    })),

  resetFilters: () => set({ filters: defaultFilters }),
}));
