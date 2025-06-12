"use client"; 

import React, { useState, createContext } from "react";
import ToastContainer from "./ToastContainer";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", options = {}) => {
    const id = Date.now().toString() + Math.random().toString(36);
    const toast = {
      id,
      message,
      type,
      position: options.position || "top-right",
      duration: options.duration || 5000,
      ...options,
    };

    setToasts((prev) => [...prev, toast]);
    return id;
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  const value = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success: (message, options) => addToast(message, "success", options),
    error: (message, options) => addToast(message, "error", options),
    info: (message, options) => addToast(message, "info", options),
    warning: (message, options) => addToast(message, "warning", options),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
