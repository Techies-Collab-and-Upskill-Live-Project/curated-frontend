import MockAdapter from "axios-mock-adapter";
import api from "./axios";

// Setup mock
const mock = new MockAdapter(api, { delayResponse: 1000 }); // simulate network delay

// 🔐 Mock login
mock.onPost("/auth/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  if (email === "test@example.com" && password === "password123") {
    return [200, { token: "mocked-jwt-token", user: { name: "John Doe" } }];
  }

  return [401, { message: "Invalid credentials" }];
});

// 📝 Mock signup
mock.onPost("/auth/signup").reply((config) => {
  const data = JSON.parse(config.data);
  return [201, { message: "Signup successful", user: data }];
});

// 🔁 Mock password reset
mock.onPost("/auth/reset-password").reply(200, {
  message: "Password reset email sent",
});

// ✅ Mock email verification
mock.onPost("/auth/verify-email").reply((config) => {
  const { code } = JSON.parse(config.data);

  if (code === "1234") {
    return [200, { message: "Email verified successfully!" }];
  } else {
    return [400, { message: "Invalid verification code." }];
  }
});

// 🔁 Mock resend verification
mock.onPost("/auth/resend-verification").reply((config) => {
  const { email } = JSON.parse(config.data);

  if (email) {
    return [200, { message: "Verification code resent." }];
  }

  return [400, { message: "Email is required." }];
});

// 🔐 Mock change password
mock.onPost("/auth/change-password").reply((config) => {
  const { currentPassword, newPassword } = JSON.parse(config.data);

  if (currentPassword === "Password123@" && newPassword) {
    return [200, { message: "Password changed successfully" }];
  }

  return [400, { message: "Invalid old password or new password is missing" }];
});
export default mock;
