"use client";
import { useState } from "react";
import Link from "next/link";
import InputField from "@/components/InputField";
import { routes } from "@/config/constant";
import ResetLinkSentModal from "@/components/modals/ResetLinkSentModal";
import { IconCircleDotted } from "@tabler/icons-react";
import { resetPassword } from "@/api/authApi"; // Adjust the import based on your API structure
import { useToast } from "@/components/Toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { addToast } = useToast();

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
      addToast("Please enter a valid email address", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: call your API to trigger forgot password email
      await resetPassword({ email });

      setSubmittedEmail(email); // Store submitted email for modal

      // Show the modal instead of inline message
      setShowResetModal(true);

      // Reset form state
      setEmail("");
      setIsTyping(false);
      setIsValid(false);
    } catch (error) {
      let errorMsg = "Signup failed, Please try again.";

      if (error.response?.data) {
        const errorData = error.response.data;

        // If error is an object (e.g., { email: ["This field is required."] })
        if (typeof errorData === "object" && !Array.isArray(errorData)) {
          errorMsg = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${messages.join(" ")}`)
            .join("\n");
        }
        // If backend returns a plain string (e.g., "User already exists")
        else if (typeof errorData === "string") {
          errorMsg = errorData;
        }
      } else if (error.message) {
        errorMsg = error.message;
      }

      addToast(errorMsg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setShowResetModal(false);
    // Optional: redirect to login page after modal closes
    // router.push(routes.login);
  };

  const handleResetPasswordDemo = () => {
    setShowResetModal(true);
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
            disabled={isSubmitting}
          />

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className={`font-bold py-3 rounded-lg transition-colors w-[350px] md:w-[630px] relative
              ${
                !email
                  ? "bg-btn_colors-primary cursor-not-allowed text-white"
                  : isTyping && !isValid
                  ? "bg-btn_colors-disabled text-white cursor-not-allowed"
                  : isValid && !isSubmitting
                  ? "bg-btn_colors-secondary text-white cursor-pointer hover:opacity-90"
                  : "bg-btn_colors-disabled cursor-not-allowed text-white"
              }`}
          >
            {isSubmitting ? (
              <span>
                <IconCircleDotted
                  className="animate-spin text-white mx-auto"
                  size={24}
                />
              </span>
            ) : (
              "Send Reset Link"
            )}
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

      <ResetLinkSentModal
        isOpen={showResetModal}
        onClose={handleModalClose}
        email={submittedEmail} // Use the actual email or fallback
      />
    </div>
  );
}
