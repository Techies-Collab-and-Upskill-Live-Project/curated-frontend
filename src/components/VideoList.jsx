import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
    return (
        <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
                <VideoCard
                    key={video.id.videoId || video.id}
                    video={video}
                />
            ))}
        </div>
    );
};

export default VideoList;
