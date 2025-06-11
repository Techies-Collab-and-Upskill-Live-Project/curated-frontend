"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconCircleDotted, IconShield } from "@tabler/icons-react";
import VerificationSuccessModal from "@/components/modals/VerificationSuccessModal";
import ResetLinkSentModal from "@/components/modals/ResetLinkSentModal";
import { routes } from "@/config/constant";

export default function EmailVerification() {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  const [isTyping, setIsTyping] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const router = useRouter();
  // const email = "test@example.com"; // Replace this with actual email prop or state

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleCodeInput = (index, value) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    setError("");
    setIsTyping(true);

    const joinedCode = newCode.join("");
    setIsValid(joinedCode.length === 4 && /^\d{4}$/.test(joinedCode));

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const code = verificationCode.join("");
    if (code.length !== 4) {
      setError("Please enter the complete 4-digit code");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        setShowSuccessModal(true);
        setIsTyping(false);
        setIsValid(false);
      } else {
        const data = await response.json();
        setError(
          data.message || "Invalid verification code. Please try again."
        );
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimeLeft(60);
        setCanResend(false);
        setError("");
      } else {
        setError("Failed to resend code. Please try again.");
      }
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };

  const handleSuccessModalContinue = () => {
    setShowSuccessModal(false);
    router.push(routes.dashboard);
  };

  // const handleResetPasswordDemo = () => {
  //   setShowResetModal(true);
  // };

  // const handleSuccessModalDemo = () => {
  // setShowSuccessModal(true);
  // };

  return (
    <div className="flex items-center flex-col justify-center my-24 md:my-28">
      <div className="md:shadow-custom-soft md:p-20 md:w-[773px] md:rounded-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <IconShield className="w-10 h-10 text-secondary m-auto" />
          </div>
          <h2 className="font-bold text-2xl mb-2">Verify Your Email</h2>
          <p className="text-sm text-gray-600">
            Please check your email and enter the code.
          </p>
        </div>

        {/* Verification Section */}
        <div className="max-w-md mx-auto items-center flex flex-col gap-6">
          {/* Code Input Fields */}
          <div className="w-[350px] md:w-[630px]">
            <div className="flex space-x-3 justify-center">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleCodeInput(index, value);
                    }
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(index, e);
                    const allowedKeys = [
                      "Backspace",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ];
                    if (allowedKeys.includes(e.key)) return;
                    if (!/^\d$/.test(e.key)) {
                      e.preventDefault();
                    }
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  className="w-[53px] h-[55px] md:w-[99px] md:h-[55px] text-center text-lg font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#CC5C47] focus:border-transparent transition-all"
                />
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-xs italic">{error}</p>}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className={`font-bold py-3 rounded-lg transition-colors w-[350px] md:w-[480px] ${
              !verificationCode.join("")
                ? "bg-btn_colors-primary cursor-not-allowed text-white"
                : isTyping && !isValid
                ? "bg-btn_colors-disabled text-white cursor-not-allowed"
                : isValid
                ? "bg-btn_colors-secondary text-white cursor-pointer hover:opacity-90"
                : "bg-btn_colors-disabled cursor-not-allowed text-white"
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
              "Verify Email"
            )}
          </button>
        </div>

        {/* Resend Section */}
        <div className="text-center mt-6 flex items-center justify-between gap-2">
          <p className="text-gray-600 text-sm md:ml-[4.2rem] ml-2">
            Didn't receive the code?
          </p>
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-black font-semibold cursor-pointer hover:underline text-sm md:mr-[4.2rem] mr-2"
            >
              Resend code
            </button>
          ) : (
            <p className="text-gray-500 text-sm md:mr-[4.4rem] mr-2">
              Resend in {timeLeft}s
            </p>
          )}
        </div>

        {/* Demo Button */}
        {/* <div className="mt-8 text-center">
          <button
            onClick={handleSuccessModalDemo}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
          >
            Demo: Show Verification Success Modal
          </button>
        </div> */}
      </div>

      {/* Modals (uncomment and implement) */}
      {/* <VerificationSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        onContinue={handleSuccessModalContinue}
      />

      <ResetLinkSentModal
        isOpen={showResetModal}
        onClose={() => setShowResetModal(false)}
        email={email}
      /> */}
    </div>
  );
}
