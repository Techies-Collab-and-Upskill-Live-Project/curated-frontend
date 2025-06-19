import { create } from "zustand";

export const usePlaylistStore = create((set) => ({
  playlist: [],
  currentPlaylist: null,

  setPlaylists: (data) => set({ playlist: data }),
  setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
  resetPlaylist: () => set({ currentPlaylist: null }),
}));
