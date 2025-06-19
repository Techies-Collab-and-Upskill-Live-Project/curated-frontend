'use client'

import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

export default function Searchbar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full px-4 sm:px-0 max-w-2xl relative">
      <form
        data-testid="search-form"
        className="flex items-center text-white border rounded-[10px] gap-1 sm:gap-2 mb-2"
        onSubmit={handleSubmit}
      >
        {/* Input Container with Icon */}
        <div className="relative flex-1">
          {/* <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-900" /> */}
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" />
          <input
            type="text"
            placeholder="Search/Playlist Link..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-primary"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-primary text-white px-3 sm:px-6 py-2 text-sm sm:text-base rounded-md transition-colors"
        >
          Search
        </button>
      </form>
    </div>
  );
}