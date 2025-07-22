'use client';

import { useEffect } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';
import { IconArrowLeft, IconTrash } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import { useSavedVideos } from '@/store/useSavedVideos';

export default function SavedVideos() {
    const { videos, loading, fetchVideos, deleteVideo } = useSavedVideos();

    useEffect(() => {
        fetchVideos('user-123'); // Simulate fetching for a specific user
    }, [fetchVideos]);

    if (loading) {
        return (
        <div className="flex justify-center items-center h-screen bg-white">
            <div className="text-gray-500"><LoadingSpinner /></div>
        </div>
        );
    }

    return (
    <main className="min-h-screen bg-white px-4 pt-4 pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
        <IconArrowLeft className="text-gray-600" />
        <h1 className="text-xl font-semibold">Saved Videos</h1>
        </div>

        {/* Responsive List/Grid */}
        <ul className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
            <li
            key={video.id}
            className="flex gap-4 items-start md:flex-col md:items-start"
            >
            {/* Thumbnail */}
            <div className="relative w-[100px] h-[70px] md:w-full md:h-[140px] rounded-lg overflow-hidden bg-gray-200">
                <img
                src={video.image}
                alt={video.title}
                className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black text-white text-[10px] md:text-xs px-1.5 py-0.5 rounded">
                {video.duration}
                </span>
            </div>

            {/* Info */}
            <div className="flex-1 md:w-full md:mt-2">
                <div className="flex justify-between items-start gap-2">
                <div className="flex-1">
                    <h3 className="font-medium text-sm md:text-base truncate">
                    {video.title}
                    </h3>
                    <p className="text-xs text-gray-500 md:text-sm">
                    {video.source}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5 md:text-sm">
                    {formatDistanceToNow(new Date(video.timestamp), {
                        addSuffix: true,
                    })}
                    </p>
                </div>

                {/* Delete */}
                <button
                    onClick={() => deleteVideo(video.id)}
                    className="text-red-500 hover:text-red-700 shrink-0"
                    aria-label="Delete video"
                >
                    <IconTrash size={18} />
                </button>
                </div>
                </div>
                </li>
            ))}
        </ul>
    </main>
    );

}
