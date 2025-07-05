"use client";

import Link from "next/link";
import { routes } from "../config/constant";
import { IconBell } from "@tabler/icons-react";
import { useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { useAuthStore } from "@/store/useAuthStore";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const profile = useAuthStore((state) => state.profile);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <nav className="flex items-center justify-between p-6">
      <Link href={isLoggedIn ? routes.dashboard.base : routes.home}>
        <h1 className="md:text-2xl font-bold text-primary md:ml-20">CuratED</h1>
      </Link>
      {!isLoggedIn && (
        <div className="flex items-center gap-2">
          <Link
            href={routes.login}
            className="relative px-4 py-2 border border-primary rounded-[10px] md:px-6 md:py-3 font-medium overflow-hidden group transition-colors duration-300"
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          </Link>
          <Link
            href={routes.signUp}
            className="relative border px-4 py-2 bg-primary text-white font-bold rounded-[10px] md:mr-20 md:px-6 md:py-3 overflow-hidden group"
          >
            <span className="relative z-10">Sign up</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div className="lg:w-[690px] relative hidden lg:block">
          <form
            className="flex items-center text-white border rounded-[10px] gap-2 mb-2"
            onSubmit={handleSubmit}
          >
            <div className="relative flex-1">
              <IconSearch className="absolute text-black left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 focus:outline-none bg-transparent text-black"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-md transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      )}
      {isLoggedIn && (
        <div className="flex items-center lg:mr-12 gap-12">
          <Link href={routes.dashboard.notifications}>
            <IconBell />
          </Link>
          <Link href={routes.dashboard.profile}>
            {profile?.image ? (
              <img
                src={profile.image}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full text-white text-base font-bold">
                {profile?.username?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </Link>
        </div>
      )}
    </nav>
  );
}