import { Bookmark } from "lucide-react";

const VideoCard = ({ video }) => {
    return (
        <div className="w-[320px] border rounded-md  hover:shadow-md transition-shadow duration-300">
            {/* Thumbnail with duration */}
            <div className="relative w-full h-[280px]  rounded-md overflow-hidden">
                <img
                    src={video.snippet.thumbnails.high.url}
                    alt="thumbnail"
                    className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-opacity-75 text-white text-xs px-2 rounded">
                    30:20
                </span>
            </div>

            {/* Bottom content */}
            <div className="flex h-[100px] py-2 px-0.5">
                {/* Left side: profile pic + title + channel name + month */}
                <div className="flex flex-col flex-grow min-w-0">
                    <div className="flex  gap-4">
                        <img
                            src="/prorfilr.png"
                            alt="profile"
                            className="w-[50px] h-[50px] rounded-full object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                            <h3 className="text-[18px] font-semibold truncate">{video.snippet.title}</h3>
                            <p className="text-[16px] text-gray-600 truncate">{video.snippet.channelTitle}</p>
                            <p className="text-[13px] text-gray-500 truncate">3 months ago</p>
                        </div>
                    </div>
                </div>

                {/* Right side: save icon + views justified */}
                <div className="flex flex-col justify-between items-end ml-6 min-w-[6rem]">
                    <Bookmark className="text-[#E2725B] text-3xl cursor-pointer hover:scale-110 transition-transform" />
                    <span className="text-sm text-gray-500 mt-2">100k views</span>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
