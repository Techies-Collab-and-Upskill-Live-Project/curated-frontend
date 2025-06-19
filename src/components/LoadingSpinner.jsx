// components/LoadingSpinner.tsx
"use client";

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin border-t-transparent"></div>
                <p className="text-gray-600 text-lg font-medium animate-pulse">Loading, please wait...</p>
            </div>
        </div>
    );
}
