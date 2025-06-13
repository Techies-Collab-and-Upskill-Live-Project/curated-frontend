"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Toast from "./Toast";

function ToastContainer({ toasts, removeToast }) {
  const groupedToasts = toasts.reduce((acc, toast) => {
    const position = toast.position || "top-right";
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {});

  const getPositionClasses = (position) => {
    switch (position) {
      case "top-left":
        return "top-0 left-0";
      case "top-center":
        return "top-0 left-1/2 transform -translate-x-1/2";
      case "top-right":
        return "top-0 right-0";
      case "bottom-left":
        return "bottom-0 left-0";
      case "bottom-center":
        return "bottom-0 left-1/2 transform -translate-x-1/2";
      case "bottom-right":
      default:
        return "bottom-0 right-0";
    }
  };

  return (
    <AnimatePresence mode="wait">
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <motion.div
          key={position}
          initial={{
            opacity: 0,
            y: position.includes("top") ? -20 : 20,
            scale: 0.9,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`fixed z-[9999] flex flex-col justify-start p-4 pointer-events-none ${getPositionClasses(
            position
          )}`}
        >
          {positionToasts.map((toast) => (
            <motion.div
              layout
              initial={{
                opacity: 0,
                y: position.includes("top") ? -20 : 20,
                scale: 0.9,
              }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              key={toast.id}
              className="mb-2 last:mb-0"
            >
              <Toast {...toast} onRemove={removeToast} />
            </motion.div>
          ))}
        </motion.div>
      ))}
    </AnimatePresence>
  );
}

export default ToastContainer;
