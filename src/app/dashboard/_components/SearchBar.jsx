'use client'

import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const pathname = usePathname(); // Get current route
  const isProfilePage = pathname === "/dashboard/profile";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    (isProfilePage) ? null :
    <div className="w-full px-4 sm:px-0 sm:mx-auto max-w-2xl relative md:hidden">
      <form 
      data-testid="search-form"
      className="flex items-center text-white border rounded-[10px] gap-1 sm:gap-2 mb-2" onSubmit={handleSubmit}>
        {/* Input Container with Icon */}
        <div className="relative flex-1">

          {/* <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" /> */}
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search/Playlist Link..."
            className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 text-sm sm:text-base focus:outline-none bg-transparent text-black"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button type='submit' className="bg-primary text-white px-3 sm:px-6 py-2 text-sm sm:text-base rounded-md transition-colors">
          Search
        </button>
      </form>
    </div>
  );
}