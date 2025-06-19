import { Search } from "lucide-react";

export const routes = {
  home: "/",
  login: "/auth/login",
  signUp: "/auth/signup",
  verifyEmail: "/auth/verify-email",
  resetPassword: "/auth/reset-password",
  dashboard: {
    base: "/dashboard",
    profile: "/dashboard/profile",
    settings: "/dashboard/settings",
    notifications: "/dashboard/notifications",
    search: "/search",
  },
};
