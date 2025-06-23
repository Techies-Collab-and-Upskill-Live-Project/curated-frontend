export const routes = {
  home: "/",
  login: "/auth/login",
  signUp: "/auth/signup",
  verifyEmail: "/auth/verify-email",
  resetPassword: "/auth/reset-password",
  dashboard: {
    base: "/dashboard",
    profile: "/dashboard/profile",
    changePassword: "/dashboard/change-password",
    notifications: "/dashboard/notifications",
    search: "/dashboard/search",
    saved: "/dashboard/saved-videos",
    watchHistory: "/dashboard/watch-history",
    video: {
      base: "/dashboard/video",
      player: (id) => `/dashboard/video/${id}`,
    },

  },
};
