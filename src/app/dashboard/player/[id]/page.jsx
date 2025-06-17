"use client";

import CommentsCard from "@/components/CommentsCard";
import { useSearchStore } from "@/store/useSearchStore";
import { Bookmark, ThumbsDown, ThumbsUp } from "lucide-react";
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
            <h1 className="text-[18px] text-[#262323] font-bold mb-2">{video.snippet.title}</h1>
            <div className="md:flex items-center justify-between">
                <div className="flex items-center gap-4 justify-between">
                    <img src="/prorfilr.png" className="rounded w-14 h-14" />
                    <div className="flex flex-col  justify-between items-center">
                        <p className="text-[#000000BF] text-[18px]">{video.snippet.channelTitle}</p>
                        <p className="text-[#000000BF] text-[13px]">845k Subscribers</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 justify-between">
                    <div className="flex items-center md:m-0 mt-4 justify-between bg-[#F9E3DE] text-[#000000] text-[16px] py-3 md:px-6 p-2 rounded-md gap-2">
                        <ThumbsUp /> 4.8k | <ThumbsDown />
                    </div>
                    <div className="flex items-center justify-between bg-[#F9E3DE] text-[#000000] text-[16px] py-3 p-2 md:px-6 rounded-md gap-2">
                        <Bookmark />
                        Save Video</div>
                </div>
            </div>

            <div className="border my-8 rounded-md px-4 p-2">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-[#262323] text-[16px] font-bold">Video Description</p>
                    <div className="flex items-center gap-4 text-[#000000BF] text-[13px]">
                        <p>3month ago</p>
                        <p>10k views</p>
                    </div>
                </div>
                <p className="text-[#262323] text-[16px]">Learn the process of wireframing in UI / UX design.  In this tutorial you will learn how a professional designer builds a full wireframe; low fidelity and high fidelity from scratch following the process of user experience and user interface. </p>

                <p className="text-[16px] text-[#262323] font-bold mt-4">...more</p>
            </div>

            <div className="py-4">
                <p className="text-[16px] text-[#262323] font-bold">1,167 comments</p>
                {/* Comments section */}
                <div className="mt-6 w-full flex items-start gap-2">
                    <img src="/prorfilr.png" className="rounded w-8 h-8" />
                    <form className="flex-1 mb-4">
                        <textarea
                            placeholder="Add a comment..."
                            className="w-full placeholder:text-[12px] outline-none border-b resize-none"
                        />
                    </form>
                </div>

                <div>
                    <CommentsCard />
                    <CommentsCard />
                    <CommentsCard />
                </div>
            </div>
        </div>
    );
};

export default VideoPlayerPage;
