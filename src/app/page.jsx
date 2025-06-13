"use client";

import Image from 'next/image';
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import FeatureCards from "@/components/FeatureCards";
import FeaturedVideos from "@/components/FeaturedVideos";
import Valueproposition from "@/components/Valueproposition";
import Howitworks from "@/components/Howitworks";
import { fetchYouTubeVideos } from "../../utils/fetchYouTube";
import { useSearchStore } from '@/store/useSearchStore';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';
import Navbar from '@/components/Navbar';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter()
  const { results, setResults, loading, setLoading, clearResults } = useSearchStore();

  const { isLoggedIn, user } = useAuthStore()

  useEffect(() => {
    if (isLoggedIn || user) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);


  const handleSearch = async (query) => {
    setLoading(true);
    try {
      const results = await fetchYouTubeVideos(query);
      setResults(results);
      router.push('/results')
    } catch (error) {
      console.error("Error fetching videos:", error);
      clearResults();
    } finally {
      setLoading(false);
    }
  };

  console.log(results)

  if (loading) return <LoadingSpinner />

  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <header className="relative pb-40">
          <div className="absolute inset-0 -z-10 h-full w-full">
            <Image
              src="/icons/Landing-Image.svg"
              alt="Header Background"
              fill
              className="object-cover object-center brightness-50"
              priority
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <Herosection />
            <Searchbar onSearch={handleSearch} />

          </div>
        </header>
        <div className="relative -mt-32 mb-10 z-10">
          <FeatureCards />
        </div>
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