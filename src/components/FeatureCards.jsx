import Link from 'next/link';
import Image from 'next/image';

const topics = [
  {
    image: "/icons/Search-icon.svg",
    title: "Smart Search",
    href: "#"
  },
  {
    image: "/icons/Arrow.svg",
    title: "Curated Paths",
    href: "#"
  },
  {
    image: "/icons/Save.svg",
    title: "Save and Watch later",
    href: "#"
  }
];

export default function FeatureCards() {
  return (
    <div className="mt-12 w-full max-w-4xl mx-auto px-4">
      {/* Mobile Layout */}
      <div 
        className="md:hidden flex justify-center"
        data-testid="mobile-container"
      >
        <div className="flex border border-gray-200 rounded-lg divide-x divide-gray-200 overflow-hidden">
          {topics.map((topic) => (
            <Link
              key={`mobile-${topic.title}`}
              href={topic.href}
              className="flex-1 p-4 bg-white hover:bg-gray-50 transition-colors"
              data-testid={`mobile-card-${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <Image
                    src={topic.image}
                    alt={topic.title}
                    width={20}
                    height={20}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-sm font-semibold text-center">{topic.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div 
        className="hidden md:grid grid-cols-3 gap-4 bg-white border rounded-lg"
        data-testid="desktop-container"
      >
        {topics.map((topic) => (
          <Link
            key={`desktop-${topic.title}`}
            href={topic.href}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            data-testid={`desktop-card-${topic.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex justify-center mb-6 h-15">
              <Image
                src={topic.image}
                alt={topic.title}
                width={38}
                height={38}
                className="object-contain"
              />
            </div>
            <h3 className="text-xl font-bold text-center">{topic.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}