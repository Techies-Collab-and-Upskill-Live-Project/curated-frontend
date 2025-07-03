import React, { useState, useEffect } from "react";
import { IconLogout2 } from "@tabler/icons-react";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsAnimating(true), 100);
    } else {
      setIsAnimating(false);
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

  const handleLogout = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onLogout(); // trigger actual logout
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
          {/* Icon */}
          <div className="mx-auto mb-6 w-20 h-20 bg-gradient-to-br from-primary to-btn_colors-secondary rounded-full flex items-center justify-center shadow-lg">
            <IconLogout2 size={40} className="text-white" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to Logout?
          </h2>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            You will be logged out of your session. Are you sure you want to
            proceed?
          </p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleLogout}
              className="w-full relative bg-white text-black font-bold py-3 px-6 rounded-lg overflow-hidden group transition-colors duration-300 border border-primary"
            >
              <span className="relative z-10">Confirm</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </button>
            <button
              onClick={handleClose}
              className="w-full relative bg-gradient-to-r from-primary to-btn_colors-secondary  text-white font-semibold py-3 px-6 rounded-lg overflow-hidden transition-colors group duration-300"
            >
              <span className="relative z-10">Cancel</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
