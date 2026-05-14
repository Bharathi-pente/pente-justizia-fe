import { create } from 'zustand';

interface Filter {
  key: string;
  value: any;
}

interface UIState {
  sidebarOpen: boolean;
  activeFilters: Filter[];
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  addFilter: (filter: Filter) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: true,
  activeFilters: [],
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  addFilter: (filter) => set((state) => ({
    activeFilters: [...state.activeFilters.filter(f => f.key !== filter.key), filter]
  })),
  removeFilter: (key) => set((state) => ({
    activeFilters: state.activeFilters.filter(f => f.key !== key)
  })),
  clearFilters: () => set({ activeFilters: [] }),
}));
