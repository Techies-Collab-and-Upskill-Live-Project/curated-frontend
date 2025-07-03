"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IconEdit, IconLogout, IconPhoto } from "@tabler/icons-react";
import Link from "next/link";
import { routes } from "@/config/constant.js";
import { useAuthStore } from "@/store/useAuthStore";
import LogoutModal from "@/components/modals/LogoutModal.jsx";
import { useToast } from "@/components/Toast"; // Adjust path if needed

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const { addToast } = useToast(); // Get the toast function

  // Get profile data and actions from Zustand store
  const profile = useAuthStore((state) => state.profile);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const updateProfileImage = useAuthStore((state) => state.updateProfileImage);

  // Local form state for editing
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });

  const [watchHistory, setWatchHistory] = useState([]);
  const [savedVideos, setSavedVideos] = useState([]);

  // Initialize form data and preview when component mounts or profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name,
        username: profile.username,
        email: profile.email,
      });
      setPreview(profile.image);
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      // Update the store immediately so it reflects in navbar
      updateProfileImage(url);
    }
  };

  const handleSave = () => {
    const { name, username, email } = formData;
    if (!name || !username || !email) {
      setError("All fields are required.");
      return;
    }

    // Update the profile in the store
    updateProfile({
      name,
      username,
      email,
      image: preview, // Make sure the image is also saved
    });

    setError("");
    setIsEditing(false);
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    addToast("You have successfully logged out.", "success");
    // Optionally redirect here
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6 md:px-12 relative">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Top Section - Hidden on mobile when editing */}
        <div
          className={`flex justify-between items-start md:items-center flex-col md:flex-row gap-4 ${
            isEditing ? "sm:flex hidden" : ""
          }`}
        >
          <div className="flex gap-4 items-center">
            <div className="relative">
              <Image
                src={preview || "/avatar.jpg"}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full object-cover border"
              />
              {isEditing && (
                <label className="absolute -bottom-1 -right-1 bg-white border rounded-full p-1 cursor-pointer">
                  <IconPhoto className="w-4 h-4 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                  <input
                    type="text"
                    name="username"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded px-2 py-1 w-full"
                    required
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
              ) : (
                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-semibold">Name:</span> {profile?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Username:</span>{" "}
                    {profile?.username}
                  </p>
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    {profile?.email}
                  </p>
                </div>
              )}
            </div>
          </div>
          {/* Edit/Save Button */}
          <button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            className="px-4 py-2 border rounded text-sm hover:bg-gray-50"
          >
            {isEditing ? (
              "Save"
            ) : (
              <div className="flex items-center gap-1">
                <IconEdit className="w-4 h-4" /> Edit
              </div>
            )}
          </button>
        </div>

        {/* Watch History */}
        <Section title="Watch History" videos={watchHistory} />

        {/* Saved Videos */}
        <Section title="Saved Videos" videos={savedVideos} />

        {/* Account Settings */}
        <div className="space-y-2">
          <h2 className="font-semibold text-sm">Account Settings</h2>
          <Link
            href={routes.dashboard.changePassword}
            className="text-sm text-blue-600 cursor-pointer hover:underline"
          >
            Change Password
          </Link>
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
          >
            <IconLogout className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {/* Mobile Modal Form */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-white p-6 sm:hidden overflow-y-auto">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-6">
              <Image
                src={preview || "/avatar.jpg"}
                alt="Profile"
                width={140}
                height={140}
                className="rounded-full object-cover"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full cursor-pointer">
                <IconPhoto className="w-6 h-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            <div className="w-full space-y-4">
              <div>
                <label className="block text-left font-semibold mb-1">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-left font-semibold mb-1">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="@username"
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-left font-semibold mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                  className="w-full border rounded px-4 py-2"
                />
              </div>

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                onClick={handleSave}
                className="w-full bg-red-400 hover:bg-red-500 text-white py-3 font-semibold rounded-lg mt-4"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={handleLogoutCancel}
        onLogout={handleLogoutConfirm}
      />
    </div>
  );
}

function Section({ title, videos }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        <button className="text-sm border px-3 py-1 rounded hover:bg-gray-50">
          View All
        </button>
      </div>
      {videos.length === 0 ? (
        <div className="flex items-center justify-center h-40 border rounded bg-gray-50">
          <div className="text-center text-gray-500 text-sm">
            <svg
              className="mx-auto mb-2"
              width="40"
              height="40"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M10 8v8l6-4-6-4zm-8 4c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z" />
            </svg>
            You do not have any {title.toLowerCase()} yet
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {videos.map((vid, i) => (
            <div key={i} className="border rounded p-2">
              <Image
                src={vid.thumbnail}
                alt="video"
                width={160}
                height={90}
                className="rounded"
              />
              <p className="text-sm mt-1">{vid.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
