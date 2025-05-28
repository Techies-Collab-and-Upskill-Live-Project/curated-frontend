"use client";

import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Videotopicgrid from "@/components/Videotopicgrid";
import FeaturedVideos from "@/components/FeaturedVideos";
import Valueproposition from "@/components/Valueproposition";
import Howitworks from "@/components/Howitworks";
import { fetchYouTubeVideos } from "../../utils/fetchYouTube";
import { useSearchStore } from '@/store/useSearchStore';

export default function Home() {

  const { results, setResults, setLoading, clearResults } = useSearchStore();

  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await fetchYouTubeVideos(query);
      setResults(results);
    } catch (error) {
      console.error("Error fetching videos:", error);
      clearResults();
    } finally {
      setLoading(false);
    }
  };

  console.log(results)

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
            <Videotopicgrid />
          </div>
        </header>
        <FeaturedVideos />
        <Valueproposition />
        <Howitworks />
        <Testimonials />
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}