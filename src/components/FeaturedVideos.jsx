import { useEffect, useState } from "react";
import { videoIds } from "../../utils/featuredVideosData";

const VIDEO_COUNT = 3;

function getRandomVideos(count = VIDEO_COUNT) {
  const shuffled = [...videoIds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const FeaturedVideos = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [playVideoIds, setPlayVideoIds] = useState([]);

  useEffect(() => {
    const randomVideos = getRandomVideos();
    setSelectedVideos(randomVideos);
  }, []);

  const handleThumbnailClick = (id) => {
    setPlayVideoIds((prev) => [...prev, id]);
  };

  return (
    <section className="py-6 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mt-10 mb-2">
          Enjoy Your Learning Experience
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our most viewed and insightful content
        </p>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 md:grid-cols-3">
          {selectedVideos.map((id) => (
            <div
              key={id}
              className="w-full aspect-video cursor-pointer rounded-[10px] overflow-hidden shadow-md"
            >
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
                <img
                  onClick={() => handleThumbnailClick(id)}
                  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedVideos;
