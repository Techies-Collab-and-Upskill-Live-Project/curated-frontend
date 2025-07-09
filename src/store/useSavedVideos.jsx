
import { create } from 'zustand';
import { fetchSavedVideos } from '@/api/mock';

export const useSavedVideos = create((set) => ({
    videos: [],
    loading: true,

    fetchVideos: async () => {
        set({ loading: true });
        try {
        const data = await fetchSavedVideos();
        set({ videos: data, loading: false });
        } catch (error) {
        console.error("Failed to fetch videos:", error);
        set({ loading: false });
        }
    },

    deleteVideo: (id) =>
        set((state) => ({
        videos: state.videos.filter((v) => v.id !== id),
    })),
}));
