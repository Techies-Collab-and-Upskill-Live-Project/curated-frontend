import { useEffect, useState } from 'react';
import { videoIds } from '../../utils/featuredVideosData';

const STORAGE_KEY = 'featuredVideos';
const VIDEO_COUNT = 3;

function getRandomVideos(count = VIDEO_COUNT) {
  const shuffled = [...videoIds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const FeaturedVideos = () => {
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [playVideoIds, setPlayVideoIds] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelectedVideos(parsed);
          return;
        }
      }

      const randomVideos = getRandomVideos();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(randomVideos));
      setSelectedVideos(randomVideos);
    } catch (error) {
      console.error('Error loading featured videos:', error);
    }
  }, []);

  const handleThumbnailClick = (id) => {
    setPlayVideoIds((prev) => [...prev, id]);
  };

  return (
    <section className="py-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {selectedVideos.map((id) => (
          <div key={id} className="aspect-w-16 w-[370px] h-[180px] aspect-h-10 cursor-pointer rounded overflow-hidden shadow">
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
    </section>
  );
};

export default FeaturedVideos;
