import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSearchStore = create(
  persist(
    (set) => ({
      results: [],
      loading: false,

      setResults: (data) => set({ results: data }),
      setLoading: (value) => set({ loading: value }),
      clearResults: () => set({ results: [] }),
    }),
    {
      name: "search-storage", // name of item in localStorage
      // Optionally, choose which parts of state to persist
      partialize: (state) => ({ results: state.results }),
    }
  )
);
