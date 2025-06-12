"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { IconCircleDotted, IconEye, IconEyeClosed } from "@tabler/icons-react";
import InputField from "@/components/InputField";
import Google from "../../../../public/assets/images/google.png";
import { routes } from "@/config/constant";
// import { login } from "@/lib/api/auth"; // Uncomment when ready
import validator from "validator";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [validity, setValidity] = useState({
    email: null,
    password: null,
    rememberMe: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe") === "true";
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (remembered && storedEmail && storedPassword) {
      setFormData({
        email: storedEmail,
        password: storedPassword,
        rememberMe: true,
      });
      setValidity({ email: true, password: true, rememberMe: true });
    }
  }, []);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setIsTyping(true);

    let isValid = true;

    if (type === "checkbox") {
      isValid = checked;
    } else if (name === "email") {
      isValid = validateEmail(value);
    } else if (name === "password") {
      isValid = value.trim().length >= 8;
    }

    setValidity((prev) => ({ ...prev, [name]: isValid }));

    const allValid =
      (name === "rememberMe"
        ? validity.email && validity.password
        : name === "email"
        ? isValid && validity.password
        : name === "password"
        ? isValid && validity.email
        : validity.email && validity.password) &&
      formData.email &&
      formData.password;

    setIsFormValid(allValid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // const { token, user } = await login(formData);

      if (formData.rememberMe) {
        localStorage.setItem("rememberMe", "true");
        localStorage.setItem("email", formData.email);
        localStorage.setItem("password", formData.password);
        // localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("rememberMe");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        // localStorage.removeItem("token");
      }
      // Redirect after successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center flex-col justify-center my-28">
      <div className="md:shadow-custom-soft md:p-7 md:w-[773px] md:rounded-xl">
        <div className="flex flex-col items-center">
          <h6 className="font-[600] text-xl md:font-bold md:text-2xl">Login</h6>
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

        <div className="flex items-center gap-4 mt-6 mx-auto w-full md:w-[628px]">
          <div className="flex-1 border-b-2 border-border_dark"></div>
          <span className="font-[700] px-2">OR</span>
          <div className="flex-1 border-b-2 border-border_dark"></div>
        </div>

        <form
          className="flex flex-col items-center mt-6 w-full max-w-xs mx-auto"
          onSubmit={handleSubmit}
        >
          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isValid={validity.email}
            type="email"
            required
            containerClass="w-[350px] md:w-[631px] mt-4"
          />
          <div className="relative flex flex-col gap-2">
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
                Password must be at least 8 characters.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between  gap-3 w-[350px] md:w-[631px] mt-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-6 h-6 accent-[#B94D3A]"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </label>
            </div>
            <Link href={routes.resetPassword}>
              <span className="text-sm text-dark hover:underline">
                Forgot Password?
              </span>
            </Link>
          </div>

          {error && <p className="text-red-500 text-xs mt-2 italic">{error}</p>}

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-[350px] md:w-[631px] px-4 py-[.75rem] text-white font-bold rounded-[10px] mt-6 transition-colors ${
              !formData.email && !formData.password
                ? "bg-btn_colors-primary cursor-not-allowed"
                : isTyping && !isFormValid
                ? "bg-btn_colors-disabled cursor-not-allowed"
                : isFormValid
                ? "bg-btn_colors-secondary cursor-pointer"
                : "bg-btn_colors-disabled cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <span>
                <IconCircleDotted
                  className="animate-spin text-white mx-auto"
                  size={30}
                />
              </span>
            ) : (
              "Login"
            )}
          </button>

          <div className="text-[12px] font-[400] mt-6">
            Don’t have an account on CuratED?
            <Link href={routes.signUp}>
              <span className="text-black font-semibold ml-2 text-[1rem] hover:underline">
                Signup
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
