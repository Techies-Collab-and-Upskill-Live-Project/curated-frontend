'use client'

import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Videotopicgrid from "@/components/Videotopicgrid";
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
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <Herosection />

          <Searchbar onSearch={handleSearch} />

          <Videotopicgrid />
        </div>
      </main>
    </>
  );
}