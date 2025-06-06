import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
    return (
        <div className="grid lg:gap-6 md:gap-2 mx-auto sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
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
