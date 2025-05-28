"use client"

import SortOptions from '@/components/SortOptions';
import VideoList from '@/components/VideoList';
import { useSearchStore } from '@/store/useSearchStore'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const sampleVideos = [
    {
        id: "1",
        thumbnail: "/thumb1.jpg",
        duration: "12:34",
        profileImage: "/profile1.jpg",
        title: "Understanding JavaScript Closures",
        channelTitle: "CodeMaster",
        uploadedAt: "2 months ago",
        views: "14.2K views",
    },
    {
        id: "2",
        thumbnail: "/thumb2.jpg",
        duration: "8:45",
        profileImage: "/profile2.jpg",
        title: "React in 100 Seconds",
        channelTitle: "DevSimplified",
        uploadedAt: "1 month ago",
        views: "23.4K views",
    },
];

const page = () => {
    const router = useRouter();
    const { results } = useSearchStore()

    useEffect(() => {
        if (results.length === 0) {
            router.push("/"); // redirect back to home
        }
    }, [results, router]);

    return (
        <div className="max-w-6xl mx-auto">
            page
            <SortOptions />
            <VideoList videos={results} />
        </div>
    )
}

export default page