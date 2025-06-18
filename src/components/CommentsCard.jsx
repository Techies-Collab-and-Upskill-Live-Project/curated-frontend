import { Reply, ReplyAllIcon, ThumbsDown, ThumbsUp } from "lucide-react";

const CommentsCard = () => {
  return <div className="mb-10">
    <div className="flex gap-4 items-start">
      <img src="/prorfilr.png" className="rounded w-12 h-12" />
      <div>
        <div className="flex gap-4 mb-4">
          <p className="text-[13px] text-[#262323] font-bold">@thebrandrefiner</p>
          <p className="text-[13px] text-[#000000BF]">10hours ago</p>
        </div>
        <div>
          <p className="text-[#262323] text-[11px] mb-6">Very informative. I've been looking into UI/UX over the last couple of months, and your video has giving me the best understanding of what goes into UI/UX. I'm absolutely certain I will do well in this field. Granted I'm sure there is more to it than what this video shows. You have been subbed and belled.</p>
          <div className="flex text-[11px] text-[#000000BF] gap-4">
            <ThumbsUp /> 4.8k | <ThumbsDown /> <p>Reply</p>
          </div>
        </div>
      </div>
    </div>
    <div className="flex text-[13px] items-center py-4 gap-4">
      <ReplyAllIcon />
      <p className=" text-[#000000BF]">Show replies</p>
    </div>
  </div>;
};

export default CommentsCard;  
