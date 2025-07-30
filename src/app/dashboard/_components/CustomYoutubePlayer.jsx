"use client";

import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${mins}:${secs}`;
};

const CustomYouTubePlayer = ({ videoId }) => {
  const [player, setPlayer] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const opts = {
    width: "100%",
    height: "390",
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      controls: 0, // hide default controls
    },
  };

  const onPlayerReady = (event) => {
    setPlayer(event.target);
    setDuration(event.target.getDuration());
  };

  useEffect(() => {
    if (!player) return;

    const interval = setInterval(() => {
      const current = player.getCurrentTime();
      const total = player.getDuration();
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }, 1000);

    return () => clearInterval(interval);
  }, [player]);

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    player.seekTo(newTime, true);
  };

  return (
    <div className="w-full">
      <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} />

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex gap-3">
          <button
            onClick={() => player?.playVideo()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ▶️ Play
          </button>
          <button
            onClick={() => player?.pauseVideo()}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            ⏸️ Pause
          </button>
        </div>

        <div className="w-full mt-2">
          <input
            type="range"
            value={progress}
            onChange={handleSeek}
            className="w-full accent-green-500"
          />
          <div className="flex justify-between text-sm text-gray-700 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomYouTubePlayer;
