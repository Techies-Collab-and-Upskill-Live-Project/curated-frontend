import React, { useState, useEffect } from "react";
import { IconMailCheck } from "@tabler/icons-react";

const ResetLinkSentModal = ({ isOpen, onClose, email }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to ensure the modal is rendered before animation starts
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before hiding
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md bg-white rounded-2xl shadow-2xl transition-all duration-300 transform ${
          isAnimating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
            <IconMailCheck size={40} className="text-white" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Reset Link Sent!
          </h2>

          <p className="text-gray-600 mb-2">
            We've sent a password reset link to:
          </p>

          <p className="text-[#262323] font-semibold mb-6 break-all">{email}</p>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-blue-800">
              <strong>Didn't receive the email?</strong> Check your spam folder
              or contact support if the issue persists.
            </p>
          </div>

          {/* Action Button */}
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-outline_colors-100 to-outline_colors-300 hover:from-btn_colors-accent hover:to-btn_colors-secondary text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Got it, thanks!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetLinkSentModal;
