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
        firstname: "",
        lastname: "",
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
            firstname: user.firstname || user.first_name || "",
            lastname: user.lastname || user.last_name || "",
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
            firstname: "",
            lastname: "",
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
