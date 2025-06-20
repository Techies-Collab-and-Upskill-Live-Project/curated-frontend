import { useEffect, useState } from "react";
import { IconPlayerPlay, IconBookmark, IconBookmarkFilled } from "@tabler/icons-react";
import { videoIds } from "../../utils/featuredVideosData";

const VIDEO_COUNT = 6; 

const videoDetails = {
  default: {
    title: "Figma Wireframe Tutorial",
    channel: "FreeCodeCamp.org",
    timestamp: "3months ago",
    views: "10k views",
    profileImage: "/icons/Avatar3.svg" 
  }
};

function getRandomVideos(count = VIDEO_COUNT) {
  const shuffled = [...videoIds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const FeaturedVideosDash = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [playVideoIds, setPlayVideoIds] = useState([]);
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);

  useEffect(() => {
    const randomVideos = getRandomVideos();
    setSelectedVideos(randomVideos);
  }, []);

  const handleThumbnailClick = (id) => {
    setPlayVideoIds((prev) => [...prev, id]);
  };

  const handleBookmark = (id, e) => {
    e.stopPropagation(); // Prevent video play when clicking bookmark
    setBookmarkedVideos((prev) => 
      prev.includes(id) 
        ? prev.filter(videoId => videoId !== id)
        : [...prev, id]
    );
  };

  const isBookmarked = (id) => bookmarkedVideos.includes(id);

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Enjoy Your Learning Experience
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our most viewed and insightful content
          </p>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {selectedVideos.map((id) => {
            const details = videoDetails.default; // Use actual video data here
            
            return (
              <div
                key={id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video cursor-pointer group">
                  {playVideoIds.includes(id) ? (
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`}
                      title={`YouTube video ${id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  ) : (
                    <>
                      <img
                        onClick={() => handleThumbnailClick(id)}
                        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      />
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black bg-opacity-60 rounded-full p-4">
                          <IconPlayerPlay 
                            size={24} 
                            className="text-white ml-1" 
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {/* Video Info */}
                <div className="p-4">
                  <div className="flex items-start space-x-3">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={details.profileImage}
                        alt={`${details.channel} profile`}
                        className="w-10 h-10 rounded-full object-cover bg-gray-200"
                        onError={(e) => {
                          // Fallback to a default avatar if image fails to load
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(details.channel)}&background=6366f1&color=fff&size=40`;
                        }}
                      />
                    </div>

                    {/* Video Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
                        {details.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        {details.channel}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 space-x-2">
                        <span>{details.views}</span>
                        <span>•</span>
                        <span>{details.timestamp}</span>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => handleBookmark(id, e)}
                      className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-full transition-colors group"
                      aria-label="Bookmark video"
                    >
                      {isBookmarked(id) ? (
                        <IconBookmarkFilled 
                          size={16} 
                          className="text-blue-600" 
                        />
                      ) : (
                        <IconBookmark 
                          size={16} 
                          className="text-gray-400 group-hover:text-gray-600" 
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideosDash;