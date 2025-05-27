import Image from "next/image";

const testimonials = [
  {
    name: "John Doe",
    role: "Product Manager",
    image: "/avatars/avatar1.jpg",
    stars: 5,
    message:
      "This app just gets me. Everything is simple, clean, and works exactly how I expect it to.",
  },
  {
    name: "Sarah Benson",
    role: "Software Engineer",
    image: "/avatars/avatar2.jpg",
    stars: 5,
    message:
      "No distractions, no fluff—just what I need when I need it. Super refreshing!",
  },
  {
    name: "Michael Tan",
    role: "Small Business Owner",
    image: "/avatars/avatar3.jpg",
    stars: 5,
    message:
      "I didn’t know I needed this app until I started using it. Now I can’t imagine going back.",
  },
  {
    name: "Emily Chen",
    role: "UX Designer",
    image: "/avatars/avatar4.jpg",
    stars: 5,
    message:
      "Finally, an app that does what it’s meant to—and just does it well.",
  },
  {
    name: "Amanda Lee",
    role: "Financial Analyst",
    image: "/avatars/avatar5.jpg",
    stars: 5,
    message:
      "It’s rare to find an app that feels this lightweight and powerful at the same time.",
  },
  {
    name: "James Okafor",
    role: "Startup Founder",
    image: "/avatars/avatar6.jpg",
    stars: 5,
    message:
      "Setup was quick, and I was up and running in minutes. Love the simplicity.",
  },
  {
    name: "Sophia Martin",
    role: "Digital Marketer",
    image: "/avatars/avatar7.jpg",
    stars: 5,
    message:
      "I’ve tried a few alternatives, but this one is easily the most reliable and user-friendly.",
  },
  {
    name: "Ethan Park",
    role: "Accountant",
    image: "/avatars/avatar8.jpg",
    stars: 5,
    message:
      "I appreciate how it respects my time—no clutter, just results.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">Success Stories</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-left">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#FFF5F5] rounded-xl p-6 shadow-sm flex flex-col items-start"
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