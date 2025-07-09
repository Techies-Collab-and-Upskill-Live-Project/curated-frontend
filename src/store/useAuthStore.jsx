import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      // Auth fields
      user: null,
      accessToken: null,
      refreshToken: null,
      justLoggedOut: false,
      shouldRedirectAfterLogout: false,

      // Profile information
      profile: {
        name: "",
        username: "",
        email: "",
        image: "",
      },

      // For verification flows like OTP
      verificationEmail: "",

      // --- AUTH METHODS ---

      login: (loginResponse) => {
        const { access, refresh, user } = loginResponse;

        set({
          user,
          accessToken: access,
          refreshToken: refresh,
          justLoggedOut: false,
          shouldRedirectAfterLogout: false,
          profile: {
            name: user.full_name || user.first_name || "",
            username: user.username || "",
            email: user.email || "",
            image: user.image || "",
          },
          verificationEmail: user.email || "",
        });
      },

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          justLoggedOut: true,
          shouldRedirectAfterLogout: true,
          profile: {
            name: "",
            username: "",
            email: "",
            image: "",
          },
          verificationEmail: "",
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

      setVerificationEmail: (email) => set({ verificationEmail: email }),

      clearVerificationEmail: () => set({ verificationEmail: "" }),

      // Auth status getter
      checkAuth: () => !!get().accessToken,
    }),
    {
      name: "auth-storage", // LocalStorage key
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        profile: state.profile,
        verificationEmail: state.verificationEmail,
      }),
    }
  )
);
