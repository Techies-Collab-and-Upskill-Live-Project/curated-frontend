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
  }

  return [400, { message: "Invalid verification code." }];
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

export const getuserNotifications = async (userId) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return [
        {
            id: 1,
            type: "New Video",
            message: "React Hooks Crash Course is live!",
            timestamp: "2025-07-03T12:00:00Z",
            image: "https://placehold.co/100x70?text=Video", // Sample thumbnail
            source: "React Academy",
            duration: "10:30",
        },
        {
            id: 2,
            type: "New Comment",
            message: "Someone commented on your blog post",
            timestamp: "2025-07-02T14:30:00Z",
            source: "Blog Platform",
            image: null,
        },
        {
            id: 3,
            type: "New Follower",
            message: "John Doe started following you",
            timestamp: "2025-07-01T09:15:00Z",
            image: "https://placehold.co/100x70?text=Profile",
            source: "Community",
        },
        {
            id: 4,
            type: "Like",
            message: "Jane Smith liked your portfolio project",
            timestamp: "2025-06-29T16:45:00Z",
            source: "Dev Hub",
            image: null,
        }
    ];
};
