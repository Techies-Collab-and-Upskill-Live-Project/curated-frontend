"use client";

import Link from "next/link";

export default function SignUpPage() {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
        <div className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md">
        <Link href="/" className="text-sm text-black mb-4 inline-block">
            ← Back home
        </Link>

        <h1 className="text-2xl font-semibold text-black text-center mb-1">Sign Up</h1>
        <p className="text-center text-sm mb-6 text-black">with</p>

        <button className="w-full flex text-black items-center justify-center gap-2 bg-gray-400 py-2 rounded-md mb-6 mt-10">
            <span className="text-lg text-white">G</span> Google
        </button>

        <div className="flex items-center justify-between mb-6">
            <hr className="border-gray-300 w-1/3" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="border-gray-300 w-1/3" />
        </div>

        <form className="space-y-4">
            <div className="flex gap-2">
            <input
                type="text"
                placeholder="First name"
                className="w-1/2 border border-gray-400 p-2 rounded-md"
            />
            <input
                type="text"
                placeholder="Last name"
                className="w-1/2 border border-gray-400 p-2 rounded-md"
            />
            </div>

            <div>
            <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-400 p-2 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
                Please check your email address to make sure it’s correct.
            </p>
            </div>

            <div>
            <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-400 p-2 rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
                (min. 10 characters)
            </p>
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" className="text-sm text-gray-600">
                I accept the Terms of Service, Privacy Notice and Cookie Policy.
                </label>
            </div>

            <button className="w-full bg-gray-400 text-white py-2 rounded-md">
            Sign Up
            </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
            Already on CuratED?{" "}
            <Link href="/login" className="text-black font-medium">
            Login
            </Link>
        </p>
        </div>
    </div>
    );
}
