import { create } from "zustand";

export const useSearchStore = create((set) => ({
  results: [],
  loading: false,

  setResults: (data) => set({ results: data }),
  setLoading: (value) => set({ loading: value }),
  clearResults: () => set({ results: [] }),
}));
