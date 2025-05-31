"use client";
import { useState } from "react";
import Link from "next/link";
import { routes } from "@/config/constant";
import Image from "next/image";
import Google from "../../../../public/assets/images/google.png";
import InputField from "@/components/InputField";
import validator from "validator";

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [validity, setValidity] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
    termsAccepted: null,
  });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    let isValid = true;

    if (type === "checkbox") {
      isValid = checked;
      setValidity((prev) => ({ ...prev, [name]: isValid }));
      return;
    }

    if (name === "email") {
      isValid = validateEmail(value);
    }

    if (name === "password") {
      const isStrong = validator.isStrongPassword(value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      });

      const passwordsMatch = value === formData.confirmPassword;

      setValidity((prev) => ({
        ...prev,
        password: isStrong,
        confirmPassword: passwordsMatch,
      }));
      return;
    }

    if (name === "confirmPassword") {
      const passwordsMatch = formData.password === value;
      setValidity((prev) => ({
        ...prev,
        confirmPassword: passwordsMatch,
      }));
      return;
    }

    if (name === "firstName" || name === "lastName") {
      isValid = value.trim() !== "";
    }

    setValidity((prev) => ({ ...prev, [name]: isValid }));
  };

  return (
    <div className="flex items-center flex-col justify-center md:mt-6 mt-10">
      <div className="md:shadow-custom-soft md:p-7 md:w-[773px] md:rounded-xl">
        <div className="flex flex-col items-center">
          <h6 className="font-[600] text-xl md:font-bold md:text-2xl">
            Sign Up
          </h6>
          <p className="">with</p>
        </div>
        <button className="flex items-center justify-center hover:text-white hover:bg-btn_colors-primary transition-colors gap-2 px-4 py-[.75rem] w-[351px] md:w-[631px] md:mx-auto bg-secondary text-[#262323] font-bold rounded-[10px] mt-4">
          <Image
            src={Google}
            alt="Google Logo"
            width={20}
            height={20}
            className="w-5 h-5 mr-2"
          />
          Google
        </button>
        <div className="flex items-center gap-4 mt-6 w-full max-w-xs md:w-[400px]  border mx-auto">
          <div className="w-[152.5px]  md:w-[500px] border-b-2 border-border_dark"></div>
          <span className="font-[700]">OR</span>
          <div className="w-[152.5px]  md:w-[500px] border-b-2 border-border_dark"></div>
        </div>
        <form className="flex flex-col items-center mt-6 w-full max-w-xs mx-auto">
          <div className="flex gap-4">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isValid={validity.firstName}
              required
              containerClass="w-[166px]"
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isValid={validity.lastName}
              required
              containerClass="w-[166px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isValid={validity.email}
              type="email"
              required
              containerClass="w-[350px] mt-8"
            />
            <p className="text-[12px] font-[400] italic">
              Please check your email address to make sure it's correct.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isValid={validity.password}
              type="password"
              required
              containerClass="w-[350px] mt-8"
            />
            {formData.password && !validity.password && (
              <p className="text-red-500 text-xs mt-1 italic">
                Password must be at least 8 characters long and include
                uppercase, lowercase, number, and special character.
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isValid={validity.confirmPassword}
              type="password"
              required
              containerClass="w-[350px] mt-8"
            />
            {formData.confirmPassword && !validity.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 italic">
                Passwords do not match.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 w-[350px] mt-4">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-6 h-6 accent-[#E2725B]"
            />
            <label htmlFor="termsAccepted" className="text-[12px]">
              I accept the{" "}
              <span className="font-semibold">Terms of Service</span>,{" "}
              <span className="font-semibold">Privacy Notice</span> and{" "}
              <span className="font-semibold">Cookie Policy</span>.
            </label>
          </div>
          {formData.termsAccepted === false &&
            validity.termsAccepted === false && (
              <p className="text-red-500 text-xs mt-2 ml-10 italic w-[350px]">
                You must accept the terms to continue.
              </p>
            )}
          <button
            className={`w-[350px] px-4 py-[.75rem] bg-btn_colors-primary text-white font-bold rounded-[10px] mt-6 transition-colors ${
              Object.values(validity).every((v) => v === true)
                ? "hover:bg-btn_colors-secondary"
                : "bg-btn_colors-disabled cursor-not-allowed"
            }`}
            disabled={!Object.values(validity).every((v) => v === true)}
          >
            Sign Up
          </button>
          <div className="text-[12px] font-[400] mt-6 ">
            Already on CuratED?
            <Link href={routes.login}>
              <span className="text-primary font-semibold ml-2 text-[1rem] hover:underline">
                Sign In
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
