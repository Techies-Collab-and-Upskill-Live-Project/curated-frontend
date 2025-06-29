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
    player: {
      base: "/dashboard/player",
      player: (id) => `/dashboard/video/${id}`,
    },

  },
};
