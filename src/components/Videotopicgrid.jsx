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

export default function Videotopicgrid() {
  return (
    <div className="mt-12 w-full max-w-4xl mx-auto">

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-4 bg-white border rounded-lg">
        {topics.map((topic, index) => (
          <Link
            key={index}
            href={topic.href}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
          >
            <div className="flex justify-center mb-6 h-20">
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
};