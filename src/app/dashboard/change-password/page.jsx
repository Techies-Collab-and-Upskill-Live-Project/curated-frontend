"use client";

import { useState } from "react";
import validator from "validator";
import { useToast } from "@/components/Toast";
import InputField from "@/components/InputField";
import { IconCircleDotted } from "@tabler/icons-react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {IconArrowLeftDashed} from "@tabler/icons-react";
import { changePassword } from "@/api/authApi";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {routes} from "@/config/constant";

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
  const [isTyping, setIsTyping] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

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
    if (!isTyping && value.trim() !== "") setIsTyping(true);

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

    const updatedValidity = { ...validity, [name]: isValid };
    setValidity(updatedValidity);

    const allValid = Object.values(updatedValidity).every(Boolean);
    setIsFormValid(allValid);
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
      const payload = {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };
      await changePassword(payload);

      addToast("Password changed successfully!", "success");
      router.push("/dashboard");
    } catch (error) {
      addToast(
        error?.response?.data?.message || "Password change failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getButtonStateClass = () => {
    if (isFormValid) return "bg-btn_colors-secondary text-white cursor-pointer";
    if (isTyping) return "bg-btn_colors-disabled text-white cursor-not-allowed";
    return "bg-btn_colors-primary text-white cursor-not-allowed";
  };

  return (
    <div className="flex flex-col items-center justify-center my-28">
      <Link
        href={routes.dashboard.profile}
        className="flex items-center sm:mr-[320px] base:mr-[300px] md:mr-[930px] hover:underline hover:text-primary"
      >
        <IconArrowLeftDashed size={24}/>
        <span className="">Back</span>
      </Link>
      <div className="md:shadow-custom-soft p-5 md:p-20 md:w-[773px] md:rounded-xl base:mt-5">
        <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 mx-10">
          {/* Current Password */}
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

          {/* New Password */}
          <div className="relative">
            <InputField
              label="New Password"
              name="newPassword"
              type={showPasswords.newPassword ? "text" : "password"}
              value={formData.newPassword}
              onChange={handleChange}
              isValid={validity.newPassword}
              required
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

          {/* Confirm Password */}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full px-4 py-[.75rem] font-bold rounded-[10px] transition-colors ${getButtonStateClass()}`}
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
