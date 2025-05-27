"use client";

import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Videotopicgrid from "@/components/Videotopicgrid";
import FeaturedVideos from "@/components/FeaturedVideos";
import { useState } from "react";
import { fetchYouTubeVideos } from "../../utils/fetchYouTube";

export default function Home() {

  const [videos, setVideos] = useState([]);

  const handleSearch = async (query) => {
    const results = await fetchYouTubeVideos(query);
    setVideos(results);
  };

  console.log(videos)

  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <header className="relative">
          <div className="absolute inset-0 -z-10 h-full w-full">
            <Image
              src="/icons/Landing-Image.svg"
              alt="Header Background"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <Herosection />
            <Searchbar onSearch={handleSearch} />
            <FeaturedVideos />
            <Videotopicgrid />
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
              </div>
            </div>
          </div>
        </header>
        <Testimonials />
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}