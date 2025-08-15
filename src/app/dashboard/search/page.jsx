"use client";

import { useSearchStore } from "@/store/useSearchStore";
import { useState, useRef, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function SearchPage() {
  const { setResults, setLoading, loading } = useSearchStore();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const [searchHistory, setSearchHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const handleSearch = async (query, pageNum = 1) => {
    try {
      setLoading(true);

      // Reset state when starting a fresh search
      if (pageNum === 1) {
        setSearchHistory([]);
        setPage(1);
        setHasMore(true);
      }

      const params = new URLSearchParams({
        q: query,
        max_results: "10",
        page: pageNum.toString(),
        educational_focus: "true",
        content_filter: "moderate",
        sort_by: "viewCount",
      });

      const res = await fetch(`/api/v1/search/?${params.toString()}`);
      const data = await res.json();

      if (pageNum === 1) {
        setSearchHistory(data.results || []);
      } else {
        setSearchHistory((prev) => [...prev, ...(data.results || [])]);
      }

      setHasMore(data.results?.length > 0);
      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Fetch more results on page change
  useEffect(() => {
    if (page > 1 && searchQuery) {
      handleSearch(searchQuery, page);
    }
  }, [page, searchQuery]);

  // Run whenever the search term changes
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, 1);
    } else {
      setSearchHistory([]);
    }
  }, [searchQuery]);

  const NotFound = () => (
    <div className="flex flex-col items-center justify-center mt-20 text-center">
      <img
        src="/images/not-found.svg"
        alt="No results"
        className="w-40 h-40 sm:w-48 sm:h-48 mb-6"
      />
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
        No results found
      </h2>
      <p className="text-gray-500 mt-2 text-sm sm:text-base">
        We couldn’t find anything for "{searchQuery}". Try a different search.
      </p>
    </div>
  );

  return (
    <section className="flex mx-auto flex-col w-full max-w-screen-xl px-4 sm:px-6 md:px-8 pb-10">
      {loading && page === 1 && (
        <div className="mt-16 flex justify-center">
          <LoadingSpinner />
        </div>
      )}

      {!loading && searchHistory.length === 0 && searchQuery && <NotFound />}

      {searchHistory.length > 0 && (
        <div
          className="
            grid gap-6 sm:gap-8 lg:gap-10
            grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            mt-8 sm:mt-10 lg:mt-12
          "
        >
          {searchHistory.map((item, idx) => {
            const isLast = idx === searchHistory.length - 1;

            return (
              <div
                key={idx}
                ref={isLast ? lastElementRef : null}
                className="
                  bg-white rounded-xl shadow hover:shadow-lg
                  transition-shadow duration-300 p-4 sm:p-5 lg:p-6
                  flex flex-col justify-between space-y-2 sm:space-y-3
                "
              >
                <p className="text-gray-800 text-base sm:text-lg font-semibold">
                  {item.title || item}
                </p>
                <p className="text-gray-500 text-sm sm:text-base line-clamp-3">
                  {item.description || "No description available."}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {loading && page > 1 && (
        <div className="my-6 flex justify-center">
          <LoadingSpinner />
        </div>
      )}
    </section>
  );
}
