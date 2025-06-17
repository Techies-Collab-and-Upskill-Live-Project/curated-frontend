"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Bookmark } from "lucide-react";
import { routes } from "../../config/constant.js";
import Searchbar from "../../components/Searchbar";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const router = useRouter();

  const handleSearch = (query) => {
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const tutorials = [
    {
      id: 1,
      title: "Figma Wireframe Tutorial",
      image: "icons/Image-one.svg?height=200&width=400",
      source: "FreeCodeCamp.org",
      timeAgo: "3months ago",
      views: "10k views",
    },
    {
      id: 2,
      title: "Figma Wireframe Tutorial",
      image: "icons/Image-two.svg?height=200&width=400",
      source: "FreeCodeCamp.org",
      timeAgo: "3months ago",
      views: "10k views",
    },
    {
      id: 3,
      title: "Figma Wireframe Tutorial",
      image: "icons/Image-three.svg?height=200&width=400",
      source: "FreeCodeCamp.org",
      timeAgo: "3months ago",
      views: "10k views",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <nav className="flex justify-between items-center p-4 md:p-6 bg-white shadow-md">
        <Link href={routes.home}>
          <h1 className="font-bold text-[#F15A29] text-xl md:text-2xl">
            CuratED
          </h1>
        </Link>
        <div className="flex items-center gap-2 md:gap-4">
          <button className="relative p-2 hover:bg-gray-100 rounded-full">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </nav>

      <main className="flex-grow">
        <div className="relative w-full h-dvh lg:h-screen">
          <Image
            src="/icons/Landing-Image.svg"
            alt="Header Background"
            fill
            className="object-cover object-center filter brightness-140"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <Image
              src="/icons/Bulb.svg"
              alt="Lightbulb icon"
              width={81.34}
              height={104.41}
              className="mb-4 w-[60px] h-[76px] sm:w-[70px] sm:h-[90px] md:w-[81px] md:h-[104px]"
            />
            <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold leading-tight">
              Discover Smarter Ways to Learn
            </h1>
            <p className="text-white mt-4 mb-6 max-w-xl text-sm sm:text-base md:text-lg">
              CuratED helps you find insightful, educational videos tailored to
              your interests
            </p>
            <div className="w-full max-w-md">
              <Searchbar onSearch={handleSearch} />
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-400 mt-2 mb-6 px-4">
          Use the search bar to find videos
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Enjoy Your Learning Experience
            </h2>
            <p className="text-gray-600">
              Explore our most viewed and insightful content
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutorials.map((t) => (
              <div key={t.id}>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={t.image || "/placeholder.svg"}
                    alt={t.title}
                    className="w-full h-[200px] sm:h-[240px] object-cover"
                  />
                </div>
                <div className="flex mt-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1760"
                    alt="Author"
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-base">{t.title}</h3>
                      <Bookmark className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-gray-600 text-sm">{t.source}</p>
                    <div className="flex text-gray-500 text-xs">
                      <span>{t.timeAgo}</span>
                      <span className="mx-2">•</span>
                      <span>{t.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {tutorials.map((t) => (
              <div key={`${t.id}-2`}>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <img
                    src={t.image || "/placeholder.svg"}
                    alt={t.title}
                    className="w-full h-[200px] sm:h-[240px] object-cover"
                  />
                </div>
                <div className="flex mt-3">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1760"
                    alt="Author"
                    className="w-8 h-8 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-base">{t.title}</h3>
                      <Bookmark className="h-5 w-5 text-gray-500" />
                    </div>
                    <p className="text-gray-600 text-sm">{t.source}</p>
                    <div className="flex text-gray-500 text-xs">
                      <span>{t.timeAgo}</span>
                      <span className="mx-2">•</span>
                      <span>{t.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
