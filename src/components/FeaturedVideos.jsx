import { videoIds } from "../../utils/featuredVideosData";

function getRandomVideos(count = 3) {
  const shuffled = [...videoIds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const FeaturedVideos = () => {
  const selectedVideos = getRandomVideos();

  return (
    <section className="py-8 px-4 ">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedVideos.map((id) => (
          <div key={id} className="aspect-w-16 aspect-h-9">
            <iframe
              className="w-full h-full rounded-lg"
              src={`https://www.youtube.com/embed/${id}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedVideos;
