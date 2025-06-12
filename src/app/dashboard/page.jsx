"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { routes } from "../../config/constant.js";
import Searchbar from "../../components/Searchbar"; // adjust path if needed

export default function Dashboard() {
  const router = useRouter();

  const handleSearch = (query) => {
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-gray-200 shadow-md p-6 bg-white z-10 relative">
        <Link href={routes.home}>
          <h1 className="md:text-2xl font-bold text-[#F15A29] md:ml-20">
            CuratED
          </h1>
        </Link>
        <div className="flex items-center gap-4 mr-6">
          <button
            type="button"
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover cursor-pointer"
          />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-screen">
        <Image
          src="/icons/Landing-Image.svg"
          alt="Header Background"
          fill
          className="object-cover object-center filter brightness-140"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="absolute left-10 top-28">
            <Image
              src="/icons/Bulb.svg"
              alt="Lightbulb icon"
              width={81.34}
              height={104.41}
              className="w-[60px] h-[76px] sm:w-[70px] sm:h-[90px] md:w-[81.34px] md:h-[104.41px]"
            />
          </div>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Discover Smarter Ways to Learn
          </h1>
          <p className="text-white mt-4 mb-6 max-w-2xl text-sm sm:text-base md:text-lg">
            CuratED helps you find insightful, educational videos tailored to
            your interests
          </p>
          <Searchbar onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
}
