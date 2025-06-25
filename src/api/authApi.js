import api from "./axios";

export const login = (email, password) =>
  api.post("/auth/login", { email, password });

export const signup = (userData) => api.post("/auth/signup", userData);

export const resetPassword = (email) =>
  api.post("/auth/reset-password", { email });

export const verifyEmailCode = (code) =>
  api.post("/auth/verify-email", { code });

export const resendVerificationCode = (email) =>
  api.post("/auth/resend-verification", { email });

export const changePassword = (currentPassword, newPassword) =>
  api.post("/auth/change-password", { currentPassword, newPassword }); // Or actual backend route
