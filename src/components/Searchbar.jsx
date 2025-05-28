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
    <div className="w-full max-w-2xl relative">
      <form className="flex items-center text-white border rounded-[10px] gap-2 mb-2" onSubmit={handleSubmit}>
        {/* Input Container with Icon */}
        <div className="relative flex-1">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 " />
          <input
            type="text"
            placeholder="Search/Playlist Link..."
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
  );
}
