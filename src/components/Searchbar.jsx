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
      <div className="flex items-center gap-2 mb-2">
        {/* Input Container with Icon */}
        <div className="relative flex-1 border rounded-[10px]">
          <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          <input
            type="text"
            placeholder="Search/Playlist Link..."
            className="w-full pl-10 pr-4 py-2 text-white focus:outline-none bg-transparent"
            required
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <button onClick={handleSubmit} className="bg-primary text-white px-6 py-2 border border-primary rounded-md transition-colors">
          Search
        </button>
      </div>
    </div>
  );
}
