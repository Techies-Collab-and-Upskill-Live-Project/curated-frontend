"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bell, Bookmark } from "lucide-react";
import { routes } from "../../config/constant.js";
import Herosection from "../../components/Herosection"
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
      <main className="flex-grow">
        <header className="relative pb-32 sm:pb-40">
          <div className="absolute inset-0 -z-10 h-full w-full">
            <Image
              src="/icons/Landing-Image.svg"
              alt="Header Background"
              fill
              className="object-cover object-center brightness-50"
              priority
            />
          </div>

          <div className="flex flex-col items-center text-center px-4">
            <Herosection />
            <Searchbar onSearch={handleSearch} />
          </div>
        </header>

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
