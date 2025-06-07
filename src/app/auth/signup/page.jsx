"use client";
import { useState } from "react";
import Link from "next/link";
import { routes } from "@/config/constant";
import Image from "next/image";
import Google from "../../../../public/assets/images/google.png";
import InputField from "@/components/InputField";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import validator from "validator";
import { useRouter } from "next/navigation";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

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
      setIsTyping(true);
      // Check if all fields are valid including checkbox
      const allValid = Object.values({ ...validity, [name]: isValid }).every(
        Boolean
      );
      setIsFormValid(allValid);
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

      setIsTyping(true);
      // Combine current validity with new password & confirmPassword validity for form check
      const allValid = Object.values({
        ...validity,
        password: isStrong,
        confirmPassword: passwordsMatch,
      }).every(Boolean);
      setIsFormValid(allValid);
      return;
    }

    if (name === "confirmPassword") {
      const passwordsMatch = formData.password === value;
      setValidity((prev) => ({
        ...prev,
        confirmPassword: passwordsMatch,
      }));
      setIsTyping(true);
      const allValid = Object.values({
        ...validity,
        confirmPassword: passwordsMatch,
      }).every(Boolean);
      setIsFormValid(allValid);
      return;
    }

    if (name === "firstName" || name === "lastName") {
      isValid = value.trim() !== "";
    }

    setValidity((prev) => ({ ...prev, [name]: isValid }));

    setIsTyping(true);

    // Check if all validity fields are true after this change
    const allValid = Object.values({ ...validity, [name]: isValid }).every(
      Boolean
    );
    setIsFormValid(allValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle API call for sign up here

    // Optionally reset typing and validity states on successful submission or redirect
    setIsTyping(false);
    setIsFormValid(false);

    router.push(routes.verifyEmail);
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
        <div className="flex items-center gap-4 mt-6 mx-auto w-full md:w-[627.9991455078125px]">
          <div className="flex-1 border-b-2 border-border_dark"></div>
          <span className="font-[700] px-2">OR</span>
          <div className="flex-1 border-b-2 border-border_dark"></div>
        </div>
        <form
          className="flex flex-col items-center mt-6 w-full max-w-xs mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="flex gap-4">
            <InputField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isValid={validity.firstName}
              required
              containerClass="w-[166px] md:w-[305px]"
            />
            <InputField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isValid={validity.lastName}
              required
              containerClass="w-[166px] md:w-[305px]"
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
              containerClass="w-[350px] md:w-[631px] mt-8"
            />
            <p className="text-[12px] font-[400] italic">
              Please check your email address to make sure it's correct.
            </p>
          </div>
          <div className=" relative flex flex-col gap-2">
            <InputField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isValid={validity.password}
              type={showPassword ? "text" : "password"}
              required
              containerClass="w-[350px] md:w-[631px] mt-8"
            />
            <div
              className="absolute right-4 top-[46px] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IconEye /> : <IconEyeClosed />}
            </div>
            {formData.password && !validity.password && (
              <p className="text-red-500 text-xs mt-1 italic">
                Password must be at least 8 characters long and include
                uppercase, lowercase, number, and special character.
              </p>
            )}
          </div>
          <div className="relative flex flex-col gap-2">
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isValid={validity.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              required
              containerClass="w-[350px] md:w-[631px] mt-8"
            />
            <div
              className="absolute right-4 top-[46px] cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <IconEye /> : <IconEyeClosed />}
            </div>
            {formData.confirmPassword && !validity.confirmPassword && (
              <p className="text-red-500 text-xs mt-1 italic">
                Passwords do not match.
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 w-[350px]  md:w-[631px] mt-4">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              className="w-6 h-6 accent-[#B94D3A]"
            />
            <label htmlFor="termsAccepted" className="text-[12px] md:text-sm">
              I accept the{" "}
              <span className="font-semibold">Terms of Service</span>,{" "}
              <span className="font-semibold">Privacy Notice</span> and{" "}
              <span className="font-semibold">Cookie Policy</span>.
            </label>
          </div>
          {formData.termsAccepted === false &&
            validity.termsAccepted === false && (
              <p className="text-red-500 text-xs mt-2 ml-16 md:mr-[17rem] italic w-[350px]">
                You must accept the terms to continue.
              </p>
            )}

          {/* Submit Button with states */}
          <button
            className={`w-[350px] md:w-[631px] px-4 py-[.75rem] font-bold rounded-[10px] mt-6 transition-colors
              ${
                !Object.values(formData).some((val) => val) // Idle: all fields empty
                  ? "bg-btn_colors-primary cursor-not-allowed text-white"
                  : isTyping && !isFormValid // Typing but invalid
                  ? "bg-btn_colors-disabled cursor-not-allowed text-white"
                  : isFormValid // All valid
                  ? "bg-btn_colors-secondary text-white cursor-pointer"
                  : "bg-btn_colors-disabled cursor-not-allowed text-white"
              }
            `}
            disabled={!isFormValid}
            type="submit"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center mt-4 text-[12px]">
          Already have an account?{" "}
          <Link href={routes.login}>
            <span className="font-semibold text-[1rem] cursor-pointer hover:underline">
              Login
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
