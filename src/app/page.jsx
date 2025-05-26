"use client";
import Image from 'next/image';
import Navbar from "@/components/Navbar";
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Featuresgrid from "@/components/Featuresgrid";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
// import Videotopicgrid from "@/components/Videotopicgrid";

export default function Home() {
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
            <Searchbar />
            {/* <Videotopicgrid /> */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <Featuresgrid />
              </div>            
            </div>
          </div>        
        </header>
        <Testimonials />

        <main className="container mx-auto px-4 py-12">
          
          
        </main>

      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}
