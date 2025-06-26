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
mock.onPost('/auth/verify-email').reply((config) => {
    const { code } = JSON.parse(config.data);
  
    if (code === '1234') {
      return [200, { message: 'Email verified successfully!' }];
    }
  
    return [400, { message: 'Invalid verification code.' }];
  });
  
  // 🔁 Mock resend verification
  mock.onPost('/auth/resend-verification').reply((config) => {
    const { email } = JSON.parse(config.data);
  
    if (email) {
      return [200, { message: 'Verification code resent.' }];
    }
  
    return [400, { message: 'Email is required.' }];
  });
  
export default mock;

// mock notifications
export const getuserNotifications = async (userId) => {
    await new Promise((resolve)=> setTimeout(resolve, 1000)); 
    const now = new Date();
    const todayISO = now.toISOString();
    const yesterdayISO = new Date(now.setDate(now.getDate() - 1)).toISOString();
    return[
        {
            id:1,
            type:"new video",
            message:"new video from React hooks crash course",
            source:"Freecodecamp.org",
            image:"/assets/images/video1.jpg",
            duration:"2:30",
            timestamp:todayISO,   
        },
        {
            id:2,
            type:"new comment",
            message:"new comment on your post",
            source:"Freecodecamp.org",
            image:"/assets/images/video2.jpg",
            duration:"1:15",
            timestamp:yesterdayISO,   
        },
        {
            id:3,
            type:"new follower",
            message:"John Doe started following you",
            source:"Freecodecamp.org",
            duration:"0:45",
            image:"/assets/images/video2.jpg",
            timestamp:todayISO,   
        },
        {
            id:4,
            type:"like",
            message:"Jane Smith liked your post",
            source:"Freecodecamp.org",
            duration:"0:30",
            image:"/assets/images/video1.jpg",
            timestamp:"2025-10-04T16:45:00Z",
        }
      ]
}
