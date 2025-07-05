import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // existing fields...
      user: null,
      token: null,
      isLoggedIn: false,
      justLoggedOut: false,

      // Profile
      profile: {
        name: "",
        username: "",
        email: "",
        image: "",
      },

      // NEW: Verification email for OTP flow
      verificationEmail: "",

      // AUTH METHODS
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

      logout: () =>
        set({
          user: null,
          token: null,
          isLoggedIn: false,
          justLoggedOut: true,
          profile: {
            name: "",
            username: "",
            email: "",
            image: "",
          },
          verificationEmail: "", // Clear on logout
        }),

      clearLogoutFlag: () =>
        set({
          justLoggedOut: false,
          shouldRedirectAfterLogout: false,
        }),

      updateProfile: (updatedProfile) =>
        set((state) => ({
          profile: {
            ...state.profile,
            ...updatedProfile,
          },
        })),

      updateProfileImage: (imageUrl) =>
        set((state) => ({
          profile: {
            ...state.profile,
            image: imageUrl,
          },
        })),

      // NEW: Set verification email
      setVerificationEmail: (email) => set({ verificationEmail: email }),

      // NEW: Clear verification email
      clearVerificationEmail: () => set({ verificationEmail: "" }),
    }),
    {
      name: "auth-storage",
      skipHydration: true,
    }
  )
);
