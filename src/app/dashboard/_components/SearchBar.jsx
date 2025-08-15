'use client'

import { IconSearch } from '@tabler/icons-react';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fetchingSuggestions, setFetchingSuggestions] = useState(false);

  const pathname = usePathname();
  const isProfilePage = pathname === "/dashboard/profile";

  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSearch(query);
      setShowSuggestions(false);
    } catch (err) {
      console.log("search error", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch suggestions when typing (debounced)
  // useEffect(() => {
  //   if (!query.trim()) {
  //     setSuggestions([]);
  //     setShowSuggestions(false);
  //     return;
  //   }

  //   clearTimeout(timeoutRef.current);
  //   timeoutRef.current = setTimeout(async () => {
  //     setFetchingSuggestions(true);
  //     try {
  //       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/search/suggestions?q=${encodeURIComponent(query)}`);
  //       const data = await res.json();
  //       setSuggestions(data.results || []);
  //       setShowSuggestions(true);
  //     } catch (error) {
  //       console.error("Suggestion fetch error:", error);
  //     } finally {
  //       setFetchingSuggestions(false);
  //     }
  //   }, 300); // 300ms debounce

  //   return () => clearTimeout(timeoutRef.current);
  // }, [query]);

  // Hide suggestions if clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (containerRef.current && !containerRef.current.contains(event.target)) {
  //       setShowSuggestions(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  if (loading) {
    return (
      <div>
        <LoadingSpinner className="w-full h-full bg-transparent" />
      </div>
    );
  }

  return (
    isProfilePage ? null : (
      <div ref={containerRef} className="w-full px-4 sm:px-0 sm:mx-auto max-w-2xl relative md:hidden">
        <form
          data-testid="search-form"
          className="flex items-center text-white border rounded-[10px] gap-1 sm:gap-2 mb-2"
          onSubmit={handleSubmit}
        >
          <div className="relative flex-1">
            <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search/Playlist Link..."
              className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-2 text-sm sm:text-base focus:outline-none bg-transparent text-black"
              required
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => query && setShowSuggestions(true)}
            />
          </div>

          <button type='submit' className="bg-primary text-white px-3 sm:px-6 py-2 text-sm sm:text-base rounded-md transition-colors">
            Search
          </button>
        </form>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute w-full bg-white border rounded-lg shadow-lg mt-1 z-50 max-h-60 overflow-y-auto">
            {fetchingSuggestions ? (
              <div className="p-3 text-sm text-gray-500">Loading...</div>
            ) : (
              suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                  onClick={() => {
                    setQuery(item.title || item);
                    setShowSuggestions(false);
                    onSearch(item.title || item);
                  }}
                >
                  {item.title || item}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    )
  );
}
