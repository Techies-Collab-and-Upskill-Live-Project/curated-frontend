const propositions = [
    {
        title: "Only What You Want to Watch",
        description: "We believe in purposeful viewing. Our platform delivers a tailored list of videos based solely on your request—no distractions, no surprises."
    },
    {
        title: "No Clutter. Just Content",
        description: "Our platform is built to respect your attention. You get exactly what you ask for—nothing more, nothing less."
    },
    {
        title: "A Smarter Way to Watch",
        description: "We offer a video experience designed for clarity and relevance. Our curated results ensure users engage only with the content they seek."
    },
];

export default function ValueProposition() {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">What We Offer</h2>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-3 gap-8">
                    {propositions.map((item, index) => (
                        <div key={index} className="bg-[#FFF5F5] p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
