import Navbar from "@/components/Navbar"; 
import Herosection from "@/components/Herosection";
import Searchbar from "@/components/Searchbar";
import Videotopicgrid from "@/components/Videotopicgrid";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <Herosection />

          <Searchbar />

          <Videotopicgrid />
        </div>      
      </main>
    </>
  );
}