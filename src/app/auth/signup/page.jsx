"use client";
import { useState } from "react";
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

  //function to validate any url
  // const validateUrl = (url) => {
  //   return validator.isURL(url);
  // };

  // Function to validate inputted password and password to be confirmed.
  // const validatePasswordMatch = (password, confirmPassword) => {
  //   return password === confirmPassword && password.length > 0;
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    let isValid = true;

    //Checkbox validation
    if (type === "checkbox") {
      isValid = checked;
    } else {
      throw new Error("please confirm with our terms and conditions");
    }

    if (name === "email") isValid = validateEmail(value);

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
    <div className="flex items-center flex-col justify-center mt-20">
      <div className="flex flex-col items-center">
        <h6 className="font-[600] text-xl">Sign Up</h6>
        <p className="">with</p>
      </div>
      <button className="flex items-center justify-center  hover:text-white hover:bg-btn_colors-primary transition-colors  gap-2  px-4 py-[.75rem] w-[351px] bg-secondary text-[#262323] font-bold rounded-[10px] mt-4">
        <Image
          src={Google}
          alt="Google Logo"
          width={20}
          height={20}
          className="w-5 h-5 mr-2"
        />
        Google
      </button>
      <div className="flex items-center gap-4 mt-6 w-full max-w-xs mx-auto">
        <div className="w-[152.5px] border-b-2 border-border_dark"></div>
        <span className="font-[700]">OR</span>
        <div className="w-[152.5px] border-b-2 border-border_dark"></div>
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
              Password must be at least 8 characters long and include uppercase,
              lowercase, number, and special character.
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
        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            name="termsAccepted"
            value={formData.termsAccepted}
          />
          <p className="text-[11px]">
            I accept the Terms of Service , Privacy Notice and Cookie Policy.
          </p>
        </div>
      </form>
    </div>
  );
}
