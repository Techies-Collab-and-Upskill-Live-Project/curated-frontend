
import { Bookmark } from "lucide-react";
import Link from "next/link";

const VideoCard = ({ video }) => {
    const videoId = video.id.videoId || video.id.videoId;

    return (
        <Link href={`/dashboard/player/${videoId}`} >
            <div className="w-[320px] lg:w-[340px] rounded-md">
                <div className="relative w-full h-[280px]  rounded-md overflow-hidden">
                    <img
                        src={video.snippet.thumbnails.high.url}
                        alt="thumbnail"
                        className="w-full h-full object-cover"
                    />
                    <span className="absolute bg-[#89888B] p-2 rounded-lg bottom-1 right-1 bg-opacity-75 text-white text-[14px] px-2">
                        30:20
                    </span>
                </div>

                {/* Bottom content */}
                <div className="flex py-2 px-1">
                    <div className="flex flex-col flex-grow min-w-0">
                        <div className="flex  gap-2">
                            <img
                                src="/prorfilr.png"
                                alt="profile"
                                className="w-[46px] h-[46px] rounded-full object-cover flex-shrink-0"
                            />
                            <div className="flex flex-col gap-2 max-w-full">
                                <h3 className="text-[19px] text-[#262323] font-semibold truncate">{video.snippet.title}</h3>
                                <p className="text-[16px] text-gray-600 truncate">{video.snippet.channelTitle}</p>
                                <p className="text-[14px] text-[#000000BF] truncate">3 months ago</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side: save icon + views justified */}
                    <div className="flex flex-col justify-between items-end ml-6 min-w-[6rem]">
                        <Bookmark className="text-[#000000] text-[24px] cursor-pointer hover:scale-110 transition-transform" />
                        <span className="text-sm text-[#000000BF] mt-2">100k views</span>
                    </div>
                </div>
            </div>
        </Link>
    );

};

export default VideoCard;
