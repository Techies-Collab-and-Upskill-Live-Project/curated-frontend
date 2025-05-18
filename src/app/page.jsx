import Navbar from "@/components/Navbar"; 
import Searchbar from "@/components/Searchbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Discover Smarter Ways to Learn
          </h1>
          <p className="text-l text-gray-600 mb-10 max-w-2xl">
            CuratED helps you find insightful, educational videos tailored to your interests
          </p>
          <Searchbar />

        </div>      
      </main>
    </>
  );
}