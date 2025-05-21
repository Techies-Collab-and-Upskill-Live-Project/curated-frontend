"use client";
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Videotopicgrid from "@/components/Videotopicgrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto  px-6 py-16">
        <Herosection />
        <div className="flex flex-col items-center text-center">
          <Searchbar />

          {/* <Videotopicgrid /> */}
        </div>
      </main>
    </>
  );
}
