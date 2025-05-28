import { create } from "zustand";

export const useProgressStore = create((set) => ({
  watched: [],
  progress: {},

  setWatched: (videos) => set({ watched: videos }),
  addWatched: (video) =>
    set((state) => ({ watched: [...state.watched, video] })),

  setProgress: (playlistId, percentage) =>
    set((state) => ({
      progress: { ...state.progress, [playlistId]: percentage },
    })),
}));
