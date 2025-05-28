import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
    return (
        <div className="grid gap-4">
            {videos.map((video) => (
                <VideoCard key={video.id.videoId} video={video} />
            ))}
        </div>
    );
};

export default VideoList;
