import Image from 'next/image';

const propositions = [
    {
        image: "/icons/Offerlogo1.svg",
        title: "Only What You Want to Watch",
        description: "We believe in purposeful viewing. Our platform delivers a tailored list of videos based solely on your request—no distractions, no surprises."
    },
    {
        image: "/icons/Offerlogo2.svg",
        title: "No Clutter. Just Content",
        description: "Our platform is built to respect your attention. You get exactly what you ask for—nothing more, nothing less."
    },
    {
        image: "/icons/Offerlogo3.svg",
        title: "A Smarter Way to Watch",
        description: "We offer a video experience designed for clarity and relevance. Our curated results ensure users engage only with the content they seek."
    },
];

export default function ValueProposition() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 text-center mb-12">
                <h2 className="text-4xl font-bold mb-2">What We Offer</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Tools That make learning easier
                </p>

                <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 text-left">
                    {propositions.map((item, index) => (
                        <><div
                            key={index}
                            className="flex flex-col bg-[#FFF3F1] items-center">
                            <div className="mt-6 h-24 flex items-center justify-center">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    width={60}
                                    height={60}
                                    className="object-contain" />
                            </div>
                            <div key={index} className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        </div></>
                    ))}
                </div>
            </div>
        </section>
    );
};
