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
            image: "https://placehold.co/100x70?text=Comment", // Sample thumbnail
            source: "Blog Platform",
            // image: null,
        },
        {
            id: 3,
            type: "New Follower",
            message: "John Doe started following you",
            timestamp: "2025-07-01T09:15:00Z",
            image: "https://placehold.co/100x70?text=Profile",
            source: "Community",
            duration: "10:20",
        },
        {
            id: 4,
            type: "Like",
            message: "Jane Smith liked your portfolio project",
            timestamp: "2025-06-29T16:45:00Z",
            source: "Dev Hub",
            duration: "5:15",
            image: "https://placehold.co/100x70?text=Like", // Sample thumbnail
            // image: null,
        }
    ];
};

// src/api/mock.js

export const fetchSavedVideos = async () => {
  await new Promise((res) => setTimeout(res, 1000)); // simulate network delay

  return [
    {
      id: 1,
      title: "Figma UI/UX tutorial",
      source: "FreeCodeCamp.org",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
      image: "https://unsplash.com/photos/a-woman-is-looking-at-a-computer-screen-xPjsMamUBK4",
      duration: "30:52",
    },
    {
      id: 2,
      title: "Figma UI/UX tutorial",
      source: "FreeCodeCamp.org",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
      image: "https://unsplash.com/photos/a-black-cell-phone-uT7l-Ds81YM",
      duration: "42:10",
    },
  ];
};
export const deleteSavedVideo = async (id) => {
  await new Promise((res) => setTimeout(res, 500)); // simulate network delay
  return { success: true, id };
};
