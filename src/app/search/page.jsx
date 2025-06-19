"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { routes } from "../../config/constant";
import Searchbar from "../../components/Searchbar";

export default function SearchPage() {
  const [history, setHistory] = useState([]);

  const onSearch = (q) => {
    if (!q) return;
    const dummy = {
      id: q,
      title: `Result for "${q}"`,
      thumbnail: "https://via.placeholder.com/320x180.png?text=Video",
    };
    const nh = [dummy, ...history.filter((v) => v.id !== q)];
    setHistory(nh);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <nav className="flex items-center justify-between px-4 py-4 bg-white shadow-sm">
        <Link href={routes.home} className="font-bold text-[#F15A29] text-xl">
          CuratED
        </Link>
        <div className="flex-1 mx-4 md:mx-8 max-w-xl">
          <Searchbar onSearch={onSearch} />
        </div>
        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-700" />
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center p-6">
        {history.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow max-w-md w-full text-center">
            <h2 className="font-bold text-xl mb-2">
              Try Searching to get started
            </h2>
            <p className="text-gray-600">
              Start searching to build your history
            </p>
          </div>
        ) : (
          <section className="container mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((v) => (
              <div key={v.id} className="bg-white rounded-lg shadow p-4">
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 font-medium">{v.title}</h3>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
