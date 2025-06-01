"use client"

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
        <div>
            page
            {
                results.map((video, index) => <p key={index}>{video.snippet.title}</p>)
            }</div>
    )
}

export default page