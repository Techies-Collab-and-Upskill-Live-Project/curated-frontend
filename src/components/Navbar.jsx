import Link from "next/link";
import { routes } from "../config/constant";
import { Bell } from "lucide-react";
import { useState } from "react";
import { IconSearch } from '@tabler/icons-react';

export default function Navbar() {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <nav className="flex items-center flex-column border-b border-gray-200 shadow-md justify-between p-6">
      <Link href={routes.home}>
        <h1 className="md:text-2xl font-bold text-primary md:ml-20">CuratED</h1>
      </Link>
      {/* <div className="flex items-center gap-2">
        <Link
          href={routes.login}
          className="px-4 py-2 border border-primary rounded-[10px] md:px-6 md:py-3 font-medium"
        >
          Login
        </Link>
        <Link
          href={routes.signUp}
          className="border px-4 py-2 bg-primary text-white font-bold rounded-[10px] md:mr-20 md:px-6 md:py-3"
        >
          Sign up
        </Link>
      </div> */}
      <div>
        <div className="w-full relative">
          <form className="flex items-center text-white border rounded-[10px] gap-2 mb-2" onSubmit={handleSubmit}>
            {/* Input Container with Icon */}
            <div className="relative flex-1">
              <IconSearch className="absolute text-black left-3 top-1/2 transform -translate-y-1/2 " />
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 focus:outline-none bg-transparent"
                required
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Search Button */}
            <button type='submit' className="bg-primary text-white px-6 py-2 rounded-md transition-colors">
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Bell />
        <img src="/prorfilr.png" />
      </div>
    </nav>
  );
}
