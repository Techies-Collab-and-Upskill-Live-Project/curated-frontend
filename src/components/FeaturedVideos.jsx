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

  return (
    <section className="py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">🎥 Featured Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedVideos.map((id) => (
          <div key={id} className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${id}`}
              title={`YouTube video ${id}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideos;
