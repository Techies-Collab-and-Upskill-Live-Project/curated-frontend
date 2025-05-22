"use client";
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Footer from "@/components/Footer";
// import Videotopicgrid from "@/components/Videotopicgrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <header className="max-w-[100%] mx-auto  px-6 py-16 bg-black">
        
        <div className="flex flex-col items-center text-center">
          <Herosection />
          <Searchbar />

          {/* <Videotopicgrid /> */}
        </div>        
      </header>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
