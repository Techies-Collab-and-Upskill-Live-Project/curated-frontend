import api from "./axios";

export const login = (payload) =>
  api.post("/users/login/", payload).then((res) => res.data);

export const signup = (userData) => api.post("/users/register/", userData);

export const verifyEmailCode = (payload) =>
  api.post("/users/verify-otp/", payload);

export const resendVerificationCode = (email) =>
  api.post("/users/resend-verification/", { email });

export const resetPassword = (email) =>
  api.post("/users/password-reset/", { email });

export const resetPasswordConfirm = (payload) =>
  api.post("/users/password-reset/confirm/", payload);

export const changePassword = (currentPassword, newPassword) =>
  api.put("/users/password/change", currentPassword, newPassword); // Or actual backend route
