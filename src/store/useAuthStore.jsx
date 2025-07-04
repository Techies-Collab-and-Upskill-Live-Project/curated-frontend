import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      // Profile-specific state (ADD THESE)
      profile: {
        name: "",
        username: "",
        email: "",
        image: "",
      },

      // Login method (already present, no change needed)
      login: (user, token) =>
        set({
          user,
          token,
          isLoggedIn: true,
          profile: {
            name: user.name || "",
            username: user.username || "",
            email: user.email || "",
            image: user.image || "",
          },
        }),

      // Logout method (already present)
      logout: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          profile: {
            name: "",
            username: "",
            email: "",
            image: "",
          },
        }),

      // New method: Update profile info
      updateProfile: (updatedProfile) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updatedProfile,
          },
        })),

      // New method: Update only the profile image
      updateProfileImage: (imageUrl) =>
        set((state) => ({
          profile: {
            ...state.profile,
            image: imageUrl,
          },
        })),
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    }
  )
);
