"use client";

import { useState } from "react";
import validator from "validator";
import { useToast } from "@/components/Toast";
import InputField from "@/components/InputField";
import { IconCircleDotted } from "@tabler/icons-react";
import { FaRegEye, FaRegEyeSlash} from "react-icons/fa";
import { changePassword } from "@/api/authApi"; // You’ll create this API function
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [validity, setValidity] = useState({
    currentPassword: null,
    newPassword: null,
    confirmPassword: null,
  });
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToast();
  const router = useRouter();

  const validatePassword = (password) => {
    return validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate passwords
    let isValid = true;
    switch (name) {
      case "currentPassword":
        isValid = value.length >= 8;
        break;
      case "newPassword":
        isValid = validatePassword(value);
        break;
      case "confirmPassword":
        isValid = value === formData.newPassword;
        break;
    }

    setValidity((prev) => ({ ...prev, [name]: isValid }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      addToast("Password changed successfully!", "success");
      router.push("/dashboard"); // or routes.home
    } catch (error) {
      addToast(
        error?.response?.data?.message || "Password change failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-28">
      <div className="md:shadow-custom-soft p-5 md:p-20 md:w-[773px] md:rounded-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 mx-10">
          <div className="relative">
            <InputField
              label="Current Password"
              name="currentPassword"
              type={showPasswords.currentPassword ? "text" : "password"}
              value={formData.currentPassword}
              onChange={handleChange}
              isValid={validity.currentPassword}
              required
              containerClass="w-[330px] sm:w-[350px] md:w-full"
            />
            <div
              className="absolute right-4 top-[15px] cursor-pointer"
              onClick={() => togglePasswordVisibility("currentPassword")}
            >
              {showPasswords.currentPassword ? (
                <FaRegEye size={21} />
              ) : (
                <FaRegEyeSlash size={21} />
              )}
            </div>
          </div>

          <div className="relative">
            <InputField
              label="New Password"
              name="newPassword"
              type={showPasswords.newPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              isValid={validity.newPassword}
              required
              containerClass=""
            />
            <div
              className="absolute right-4 top-[15px] cursor-pointer"
              onClick={() => togglePasswordVisibility("newPassword")}
            >
              {showPasswords.newPassword ? (
                <FaRegEye size={21} />
              ) : (
                <FaRegEyeSlash size={21} />
              )}
            </div>
            {formData.newPassword && !validity.newPassword && (
              <p className="text-red-500 text-xs mt-2 italic">
                Password must be at least 8 characters long and include
                uppercase, lowercase, number, and special character.
              </p>
            )}
          </div>

          <div className="relative">
            <InputField
              label="Confirm New Password"
              name="confirmPassword"
              type={showPasswords.confirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              isValid={validity.confirmPassword}
              required
              containerClass="w-full"
            />
            <div
              className="absolute right-4 top-[15px] cursor-pointer"
              onClick={() => togglePasswordVisibility("confirmPassword")}
            >
              {showPasswords.confirmPassword ? (
                <FaRegEye size={21} />
              ) : (
                <FaRegEyeSlash size={21} />
              )}
            </div>
            {formData.confirmPassword && !validity.confirmPassword && (
              <p className="text-red-500 text-xs mt-2 italic">
                Passwords do not match.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!Object.values(validity).every(Boolean) || isLoading}
            className={`w-full px-4 py-[.75rem] font-bold rounded-[10px] transition-colors ${
              Object.values(validity).every(Boolean)
                ? "bg-btn_colors-secondary text-white cursor-pointer"
                : "bg-btn_colors-disabled text-white cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <IconCircleDotted className="animate-spin mx-auto" size={24} />
            ) : (
              "Change Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
