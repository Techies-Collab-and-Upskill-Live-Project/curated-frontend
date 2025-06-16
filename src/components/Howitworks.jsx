import Image from 'next/image';

const steps = [
    {
        image: "/icons/Work1.png",
        title: "Sign up",
        description: "Register now with your email and experience seamless onboarding in minutes."
    },
    {
        image: "/icons/Work2.png", 
        title: "Search",
        description: "Type in your keywords, apply filters, and discover the most relevant results in seconds."
    },
    {
        image: "/icons/Work3.png",
        title: "Watch", 
        description: "Stream content effortlessly with just one click, no interruptions, just smooth and high-quality video."
    },
    {
        image: "/icons/Work4.png",
        title: "Save",
        description: "Easily save your favorite content so you can access them easily on your profile."
    }
];

export default function HowItWorks() {
    return (
        <section className="py-16 bg-[#FFF3F1]">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4 text-gray-900">How It Works</h2>
                    <p className="text-gray-600 text-lg">
                        A simple process to get you started and keep you going
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center bg-white pt-10">
                            <div className="mb-6 w-48 h-48 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={150}
                                    height={150}
                                    className="object-contain"
                                    />
                                </div>
                            </div>
                            
                            {/* Step content */}
                            <div className="text-center max-w-xs">
                                <h3 className="text-xl font-bold mb-3 text-gray-900">{step.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed pb-10">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}