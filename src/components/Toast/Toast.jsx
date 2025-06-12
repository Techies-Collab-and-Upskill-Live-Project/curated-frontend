"use client";

import React, { useEffect } from "react";
import {
  IconCircleDashedCheck,
  IconExclamationCircle,
  IconInfoHexagon,
  IconAlertSquareRounded,
  IconX,
} from "@tabler/icons-react";

function Toast({ id, message, type, duration = 5000, onRemove }) {
  useEffect(() => {
    if (id && duration > 0) {
      const timer = setTimeout(() => {
        onRemove(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [id, duration, onRemove]);

  const toastIcons = {
    success: <IconCircleDashedCheck className="text-green-500" size={25} />,
    error: <IconExclamationCircle className="text-red-500" size={25} />,
    info: <IconInfoHexagon className="text-blue-500" size={25} />,
    warning: <IconAlertSquareRounded className="text-yellow-500" size={25} />,
  };

  const typeClasses = {
    success: "border-l-4 border-green-500 bg-green-50",
    error: "border-l-4 border-red-500 bg-red-50",
    info: "border-l-4 border-blue-500 bg-blue-50",
    warning: "border-l-4 border-yellow-500 bg-yellow-50",
  };

  return (
    <div
      className={`pointer-events-auto relative w-fit max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 ${typeClasses[type]}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="relative p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 rounded-lg bg-white p-1.5 ring-1 ring-gray-200">
            {toastIcons[type]}
          </div>
          <div className="ml-3 mr-8 flex-grow">
            {typeof message === "string" ? (
              <p className="text-sm font-medium text-gray-900">{message}</p>
            ) : (
              message
            )}
          </div>
          <button
            className="absolute right-1.5 top-1.5 inline-flex  text-gray-500"
            onClick={() => onRemove(id)}
            aria-label="Close notification"
          >
            <span className="sr-only">Close</span>
            <IconX size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toast;
