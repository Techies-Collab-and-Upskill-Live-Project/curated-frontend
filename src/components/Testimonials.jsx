import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "Product Manager",
    image: "/icons/Avatar1.svg",
    stars: 5,
    message:
      "This app just gets me. Everything is simple, clean, and works exactly how I expect it to.",
  },
  {
    name: "Sarah Benson",
    role: "Software Engineer",
    image: "/icons/Avatar2.svg",
    stars: 5,
    message:
      "No distractions, no fluff—just what I need when I need it. Super refreshing!",
  },
  {
    name: "Michael Tan",
    role: "Small Business Owner",
    image: "/icons/Avatar3.svg",
    stars: 5,
    message:
      "I didn’t know I needed this app until I started using it. Now I can’t imagine going back.",
  },
  {
    name: "Amanda Lee",
    role: "Financial Analyst",
    image: "/icons/Avatar4.svg",
    stars: 5,
    message:
      "It's rare to find an app that feels this lightweight and powerful at the same time.",
  },
  {
    name: "James Okafor",
    role: "Startup Founder",
    image: "/icons/Avatar5.svg",
    stars: 5,
    message:
      "Setup was quick, and I was up and running in minutes. Love the simplicity.",
  },
  {
    name: "Sophia Martin",
    role: "Digital Marketer",
    image: "/icons/Avatar6.svg",
    stars: 5,
    message:
      "I’ve tried a few alternatives, but this one is easily the most reliable and user-friendly.",
  },
];

export default function Testimonials() {
  return (
    <section className="mb-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-4xl font-bold mt-10 mb-2">Success Stories</h2>
         <p className="text-gray-600 max-w-2xl mx-auto mb-12">
                    See how CuratED is making impact
                </p>
        
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 text-left">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFF3F1] rounded-xl p-6 shadow-sm flex flex-col items-start"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={t.image}
                  alt={t.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="text-md font-semibold">{t.name}</h4>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
              <p className="text-sm text-gray-800 mb-4">{t.message}</p>
              <div className="flex space-x-1">
                {Array(t.stars)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}