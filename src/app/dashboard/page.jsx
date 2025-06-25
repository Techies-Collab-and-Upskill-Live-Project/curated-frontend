"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Herosection from "../../components/Herosection"
import Searchbar from "../../components/Searchbar";
import FeaturedVideosDash from "../../components/FeaturedVideosDash";
import Footer from "../../components/Footer";

export default function Dashboard() {
  const router = useRouter();

  const handleSearch = (query) => {
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

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
        <FeaturedVideosDash />
      </main>

      <Footer />
    </div>
  );
}
