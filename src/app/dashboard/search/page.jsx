"use client";

import { useSearchStore } from "@/store/useSearchStore";

const search = [
  // 'search history',
  // 'search history',
  // 'search history',
  // 'search history',
];

export default function SearchPage() {
  const { setResults, setLoading } = useSearchStore();

  const handleSearch = async (query) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        q: query,
        max_results: '25',
        educational_focus: 'true',
        content_filter: 'moderate',
        sort_by: 'viewCount',
      });

      const res = await fetch(`/api/v1/search/?${params.toString()}`);
      const data = await res.json();

      setResults(data);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex mx-auto flex-col">
      {!search.length ? (
        <div className="shadow-custom-soft max-w-2xl md:w-[820px] mx-auto my-28 md:my-40 flex flex-col items-center py-16 px-6 base:px-10 md:p-24 rounded-[12px]">
          <h1 className="text-[18px] md:text-2xl font-bold mb-4">
            Try Searching to get started
          </h1>
          <p className="text-[.99rem] md:text-base base:text-[.65rem]">
            Start watching videos to help us build your search history
          </p>
        </div>
      ) : (
        <div className="p-8 text-2xl">
          {search.map((item, idx) => (
            <p key={idx} className="p-4">
              {item}
            </p>
          ))}
        </div>
      )}
    </section>
  );
}
