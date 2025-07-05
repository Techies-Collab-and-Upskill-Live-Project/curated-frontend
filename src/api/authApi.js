import api from "./axios";

export const login = (payload) => api.post("/login/", payload);

export const signup = (userData) => api.post("/users/register/", userData);

export const resetPassword = (email) =>
  api.post("/auth/reset-password", { email });

export const verifyEmailCode = (payload) =>
  api.post("/users/verify-otp/", payload);

export const resendVerificationCode = (email) =>
  api.post("/users/resend-verification/", { email });

export const changePassword = (currentPassword, newPassword) =>
  api.put("/users/password/change", currentPassword, newPassword); // Or actual backend route
