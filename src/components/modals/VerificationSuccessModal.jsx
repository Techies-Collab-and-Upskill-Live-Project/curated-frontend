"use client";
import { useState, useEffect } from "react";
import {
  IconRosetteDiscountCheck,
  IconX,
  IconSparkles,
} from "@tabler/icons-react";

const VerificationSuccessModal = ({ isOpen, onClose, onContinue }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setShowSparkles(false);
      // Small delay to trigger enter animation
      setTimeout(() => setIsAnimating(true), 10);
      // Show sparkles after icon animation
      setTimeout(() => setShowSparkles(true), 700);
    } else {
      setIsAnimating(false);
      setShowSparkles(false);
      // Wait for exit animation to complete before hiding
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isAnimating
          ? "bg-black bg-opacity-50 backdrop-blur-sm"
          : "bg-black bg-opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden transition-all duration-400 ease-out transform ${
          isAnimating
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-90 opacity-0 translate-y-6"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 z-10 ${
            isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
          style={{
            transitionDelay: isAnimating ? "500ms" : "0ms",
          }}
        >
          <IconX className="w-5 h-5 text-gray-500" />
        </button>

        {/* Modal Content */}
        <div className="p-8 text-center">
          {/* Animated Success Icon Container */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            {/* Main Icon Background with Gradient */}
            <div
              className={`w-20 h-20 bg-gradient-to-br from-green-100 via-green-200 to-emerald-200 rounded-full flex items-center justify-center transition-all duration-600 ease-out shadow-lg ${
                isAnimating ? "scale-100 rotate-0" : "scale-0 rotate-45"
              }`}
            >
              <IconRosetteDiscountCheck
                className={`w-10 h-10 text-green-600 transition-all duration-700 ease-out ${
                  isAnimating
                    ? "scale-100 opacity-100 rotate-0"
                    : "scale-0 opacity-0 rotate-180"
                }`}
                style={{
                  transitionDelay: isAnimating ? "300ms" : "0ms",
                }}
              />
            </div>

            {/* Animated Success Sparkles */}
            {showSparkles && (
              <>
                <IconSparkles
                  className="absolute -top-1 -right-1 w-6 h-6 text-yellow-400 animate-pulse"
                  style={{ animationDuration: "1.5s" }}
                />
                <IconSparkles
                  className="absolute -bottom-1 -left-1 w-4 h-4 text-yellow-400 animate-pulse"
                  style={{ animationDuration: "2s", animationDelay: "0.5s" }}
                />
                <IconSparkles
                  className="absolute top-2 -left-2 w-3 h-3 text-yellow-400 animate-pulse"
                  style={{ animationDuration: "1.8s", animationDelay: "1s" }}
                />
              </>
            )}

            {/* Triple Pulse Ring Animation */}
            <div
              className={`absolute inset-0 w-20 h-20 bg-green-200 rounded-full transition-all duration-1000 ease-out ${
                isAnimating ? "scale-150 opacity-0" : "scale-100 opacity-50"
              }`}
              style={{
                transitionDelay: isAnimating ? "400ms" : "0ms",
              }}
            />

            <div
              className={`absolute inset-0 w-20 h-20 bg-green-300 rounded-full transition-all duration-1200 ease-out ${
                isAnimating ? "scale-200 opacity-0" : "scale-100 opacity-30"
              }`}
              style={{
                transitionDelay: isAnimating ? "600ms" : "0ms",
              }}
            />

            <div
              className={`absolute inset-0 w-20 h-20 bg-emerald-400 rounded-full transition-all duration-1400 ease-out ${
                isAnimating ? "scale-250 opacity-0" : "scale-100 opacity-20"
              }`}
              style={{
                transitionDelay: isAnimating ? "800ms" : "0ms",
              }}
            />
          </div>

          {/* Success Message with staggered animation */}
          <h2
            className={`text-2xl font-bold text-gray-900 mb-3 transition-all duration-500 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isAnimating ? "500ms" : "0ms",
            }}
          >
            Email Verified Successfully! 🎉
          </h2>

          <p
            className={`text-gray-600 mb-8 leading-relaxed transition-all duration-500 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isAnimating ? "600ms" : "0ms",
            }}
          >
            Your email has been verified successfully. You can now access all
            features of{" "}
            <span className="font-semibold text-primary">CuratED</span>
          </p>

          {/* Action Buttons with staggered animation */}
          <div
            className={`space-y-4 transition-all duration-500 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: isAnimating ? "700ms" : "0ms",
            }}
          >
            {/* Continue Button */}
            <button
              onClick={onContinue}
              className="w-full bg-gradient-to-r from-outline_colors-100 to-outline_colors-300 hover:from-btn_colors-accent hover:to-btn_colors-secondary text-white py-3 px-4 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Continue to Dashboard
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-full text-gray-600 hover:text-gray-800 font-medium transition-all duration-200 hover:bg-gray-50 py-2 px-4 rounded-lg"
            >
              Close
            </button>
          </div>

          {/* Success Badge */}
          <div
            className={`mt-6 inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 transition-all duration-500 ease-out ${
              isAnimating
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-4 scale-75"
            }`}
            style={{
              transitionDelay: isAnimating ? "800ms" : "0ms",
            }}
          >
            ✓ Verification Complete
          </div>
        </div>

        {/* Animated Success Border */}
        <div
          className={`h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 transition-all duration-1000 ease-out ${
            isAnimating ? "scale-x-100" : "scale-x-0"
          }`}
          style={{
            transitionDelay: isAnimating ? "900ms" : "0ms",
            transformOrigin: "center",
          }}
        />

        {/* Celebration Confetti Effect */}
        {showSparkles && (
          <>
            <div
              className="absolute top-8 left-12 w-2 h-2 bg-yellow-400 rounded-full animate-bounce opacity-70"
              style={{ animationDelay: "0.5s", animationDuration: "2s" }}
            />
            <div
              className="absolute top-12 right-16 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "1s", animationDuration: "2.5s" }}
            />
            <div
              className="absolute top-20 left-8 w-1 h-1 bg-emerald-400 rounded-full animate-bounce opacity-50"
              style={{ animationDelay: "1.5s", animationDuration: "3s" }}
            />
            <div
              className="absolute bottom-24 right-8 w-2 h-2 bg-yellow-300 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "2s", animationDuration: "2s" }}
            />
            <div
              className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce opacity-40"
              style={{ animationDelay: "2.5s", animationDuration: "2.5s" }}
            />
          </>
        )}

        {/* Floating Success Particles */}
        {isAnimating && (
          <>
            <div
              className="absolute top-6 right-20 text-green-400 opacity-60 animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              ✨
            </div>
            <div
              className="absolute top-16 left-20 text-yellow-400 opacity-50 animate-pulse"
              style={{ animationDuration: "2.5s", animationDelay: "1s" }}
            >
              ⭐
            </div>
            <div
              className="absolute bottom-20 right-12 text-emerald-400 opacity-40 animate-pulse"
              style={{ animationDuration: "2s", animationDelay: "2s" }}
            >
              💫
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default VerificationSuccessModal;
