"use client";

import React, {use, useEffect, useState } from "react";
import YouTube from "react-youtube";
import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import CommentsCard from "@/components/CommentsCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useSearchStore } from "@/store/useSearchStore";

const VideoPlayerPage = (props) => {
  const { id } = use(props.params);
  const { user, accessToken } = useAuthStore();
  const { results } = useSearchStore();

  const [video, setVideo] = useState(null);
  const [player, setPlayer] = useState(null);
  const [isLoading, setIsLoading] = useState (true);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const videoId = video?.id?.videoId || video?.id;

  useEffect(() => {
    if (!id || !results || results.length === 0) return;

    const found = results.find((v) => v.id === id || v.id.videoId === id);
    setVideo(found);
    setIsLoading(false);
  }, [id, results]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/feedback/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          video_id: videoId,
          rating: 5,
          comment: comment.trim(),
          helpful: true,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to post comment");
      }

      const data = await res.json();
      console.log("Feedback posted:", data);
      setComment("");
    } catch (err) {
      console.error("Error posting feedback:", err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    console.log("Player state changed:", event.data);
  };

  const handlePause = () => {
    if (player) player.pauseVideo();
  };

  const handlePlay = () => {
    if (player) player.playVideo();
  };

  const getProgress = () => {
    if (player) {
      const currentTime = player.getCurrentTime();
      const duration = player.getDuration();
      const percent = ((currentTime / duration) * 100).toFixed(2);
      console.log(`Progress: ${percent}%`);
    }
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  if (isLoading || !results) {
    return <div className="p-4 text-center">Loading video...</div>;
  }

  if (!video) {
    return <div className="p-4 text-center">Video not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Video player */}
      <div className="mb-6">
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onPlayerReady}
          onStateChange={onPlayerStateChange}
        />

        <div className="flex gap-4 mt-4">
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={handlePlay}
          >
            ▶️ Play
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={handlePause}
          >
            ⏸️ Pause
          </button>
          <button
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={getProgress}
          >
            📊 Get Progress
          </button>
        </div>
      </div>

      {/* Title & Channel Info */}
      <h1 className="text-[18px] text-[#262323] font-bold mb-2">
        {video.title}
      </h1>

      <div className="md:flex items-center justify-between">
        <div className="flex items-center gap-4 justify-between">
          <img
            src={video.channelProfileImageUrl}
            alt="channel"
            className="rounded-full w-14 h-14"
          />
          <div className="flex flex-col justify-between items-center">
            <p className="text-[#000000BF] text-[18px]">{video.channelTitle}</p>
            <p className="text-[#000000BF] text-[13px]">845k Subscribers</p>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center md:m-0 mt-4 bg-[#F9E3DE] text-[#000000] text-[16px] py-3 md:px-6 p-2 rounded-md gap-2">
            <ThumbsUp /> 4.8k | <ThumbsDown />
          </div>
          <div className="flex items-center bg-[#F9E3DE] text-[#000000] text-[16px] py-3 p-2 md:px-6 rounded-md gap-2">
            <Bookmark />
            Save Video
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border my-8 rounded-md px-4 p-2">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#262323] text-[16px] font-bold">
            Video Description
          </p>
          <div className="flex items-center gap-4 text-[#000000BF] text-[13px]">
            <p>3 months ago</p>
            <p>10k views</p>
          </div>
        </div>
        <p className="text-[#262323] text-[16px]">{video.description}</p>
        <p className="text-[16px] text-[#262323] font-bold mt-4">...more</p>
      </div>

      {/* Comments */}
      <div className="py-4">
        <p className="text-[16px] text-[#262323] font-bold">
          {video.comment_count || 0} comments
        </p>

        <div className="mt-6 w-full flex items-start gap-2">
          <img src={user.image} className="rounded-full w-8 h-8" alt="user" />
          <form onSubmit={handleSubmit} className="flex-1 mb-4">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
