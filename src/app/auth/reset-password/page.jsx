"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import InputField from "@/components/InputField";
import { routes } from "@/config/constant";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const router = useRouter();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase());

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);

    if (!isTyping) setIsTyping(true); // Set isTyping to true only once on first input

    const valid = validateEmail(val);
    setIsValid(valid);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      // TODO: call your API to trigger forgot password email
      // await forgotPassword({ email });

      setMessage(
        "If this email is registered, you will receive password reset instructions shortly."
      );

      // Reset state to untouched
      setEmail("");
      setIsTyping(false);
      setIsValid(false);

      // Optional: redirect to login after delay
      // setTimeout(() => router.push(routes.login), 5000);
    } catch (err) {
      setError("Failed to send reset email. Please try again later.");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center my-36">
      <div className="md:shadow-custom-soft md:p-20 md:w-[773px] md:rounded-xl">
        <h2 className="font-bold text-2xl text-center mb-6">
          Forgot your password?
        </h2>
        <p className="mb-6 text-center text-sm text-gray-600">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto items-center flex flex-col gap-6"
        >
          <InputField
            label="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            type="email"
            required
            isValid={isTyping ? isValid : null} // Null prevents red border before typing
            containerClass="w-[350px] md:w-[630px]"
          />
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          {message && (
            <p className="text-green-600 text-xs italic">{message}</p>
          )}

          <button
            type="submit"
            disabled={!isValid}
            className={`font-bold py-3 rounded-lg transition-colors w-[350px] md:w-[630px]
              ${
                !email
                  ? "bg-btn_colors-primary cursor-not-allowed text-white"
                  : isTyping && !isValid
                  ? "bg-btn_colors-disabled text-white cursor-not-allowed"
                  : isValid
                  ? "bg-btn_colors-secondary text-white cursor-pointer"
                  : "bg-btn_colors-disabled cursor-not-allowed text-white"
              }`}
          >
            Send Reset Link
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          Remember your password?{" "}
          <Link href={routes.login}>
            <span className="text-black font-semibold cursor-pointer hover:underline">
              Login here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}
