'use client';

import { useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useProgressStore } from '@/store/useProgressStore';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';

export default function WatchHistory() {
  const { watched, loading, setWatched } = useProgressStore();

  // Simulate fetching watch history (replace with real API if available)
  useEffect(() => {
    // Example: setWatched([{ id: 'abc', title: 'Sample Video', thumbnail: '/icons/Landing-Image.svg', watchedAt: new Date() }]);
    // For now, do nothing if already loaded
  }, [setWatched]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 pt-4 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard">
          <IconArrowLeft className="text-gray-600 cursor-pointer" />
        </Link>
        <h1 className="text-xl font-semibold">Watch History</h1>
      </div>

      {watched.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
            <path d="M10 8v8l6-4-6-4zm-8 4c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z" fill="currentColor" />
          </svg>
          <p className="mt-4 text-lg">You have not watched any videos yet.</p>
        </div>
      ) : (
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {watched.map((video) => (
            <li key={video.id} className="bg-gray-50 rounded-lg shadow p-3 flex flex-col">
              <Link href={`/dashboard/player/${video.id}`}>
                <img
                  src={video.thumbnail || '/icons/Landing-Image.svg'}
                  alt={video.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-medium text-base truncate">{video.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Watched {video.watchedAt ? new Date(video.watchedAt).toLocaleDateString() : ''}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}