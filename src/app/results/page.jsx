"use client"

import SortOptions from '@/components/SortOptions';
import VideoList from '@/components/VideoList';
import { useSearchStore } from '@/store/useSearchStore'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'


const page = () => {
    const router = useRouter();
    const { results } = useSearchStore()

    useEffect(() => {
        if (results.length === 0) {
            router.push("/"); // redirect back to home
        }
    }, [results, router]);

    return (
        <div className="lg:px-28 py-2 mobile2 mx-auto">
            <SortOptions />
            <VideoList videos={results} />
        </div>
    )
}

export default page