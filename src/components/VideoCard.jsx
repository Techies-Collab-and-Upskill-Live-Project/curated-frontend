const VideoCard = ({ video }) => {
    return (
        <div className="flex gap-4 p-4 border-b">
            <div className="relative w-60 h-36 flex-shrink-0">
                <img src={video.snippet.thumbnails.high.url} alt="thumbnail" className="w-full h-full object-cover rounded-md" />
                <span className="absolute bottom-1 right-1 bg-black text-white text-xs px-1 rounded">
                    30:20
                </span>
            </div>
            <div className="flex flex-col justify-between">
                <h3 className="text-lg font-semibold">{video.snippet.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <img src="/vercel.svg" alt="profile" className="w-6 h-6 rounded-full" />
                    <span className="text-sm text-gray-600">{video.channelTitle}</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                    3months Ago • 100k vies
                </div>
                <button className="mt-2 text-sm text-blue-500 hover:underline">Save to Playlist</button>
            </div>
        </div>
    );
};

export default VideoCard;
