"use client";

import { useSearchStore } from "@/store/useSearchStore";
import { use, useEffect, useState } from "react";

const VideoPlayerPage = (props) => {
    const { id } = use(props.params); // ✅ unwrapped using use()
    const { results } = useSearchStore();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        if (!id || results.length === 0) return;

        const found = results.find(
            (v) => v.id === id || v.id.videoId === id
        );
        setVideo(found);
    }, [id, results]);

    // 🟡 Handle loading state BEFORE the "video not found" check
    if (!results.length) {
        return <div className="p-4 text-center">Loading results...</div>;
    }

    if (!video) {
        return <div className="p-4 text-center">Loading video...</div>;
    }

    const videoId = video.id.videoId || video.id;

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Video player */}
            <div className="mb-6">
                <iframe
                    className="w-full aspect-video rounded-lg shadow-md"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.snippet.title}
                    allowFullScreen
                />
            </div>

            {/* Title & Channel */}
            <h1 className="text-2xl font-bold mb-2">{video.snippet.title}</h1>
            <h1 className="text-2xl font-bold mb-2">{video.snippet.description}</h1>
            <p className="text-gray-600 mb-4">{video.snippet.channelTitle}</p>

            {/* Comments section */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Comments</h2>
                <form className="mb-4">
                    <textarea
                        placeholder="Write a comment..."
                        className="w-full p-2 border rounded"
                    />
                    {/* <button
                        type="submit"
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Post Comment
                    </button> */}
                </form>
                {/* <div className="space-y-3">
                        <p className="bg-gray-100 p-2 rounded">User A: Nice video!</p>
                        <p className="bg-gray-100 p-2 rounded">User B: Loved this content.</p>
                    </div> */}
            </div>
        </div>
    );
};

export default VideoPlayerPage;
