import Link from 'next/link';

export default function Videotopicgrid() {
  const topics = [
    {
      title: "Video 1",
      subtitle: "in Web Design",
      href: "#"
    },
    {
      title: "Video 2",
      href: "#"
    },
    {
      title: "Video 3",
      href: "#"
    }
  ];

  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {topics.map((topic, index) => (
          <Link 
            key={index}
            href={topic.href}
            className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <h3 className="text-xl font-bold text-center">{topic.title}</h3>
            
            {topic.subtitle && (
              typeof topic.subtitle === 'string' ? (
                <p className="text-gray-600 text-center mt-2">{topic.subtitle}</p>
              ) : (
                topic.subtitle.map((line, i) => (
                  <p key={i} className="text-gray-600 text-center mt-2">{line}</p>
                ))
              )
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};