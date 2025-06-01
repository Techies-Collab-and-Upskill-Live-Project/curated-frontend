import Image from 'next/image';

const steps = [
    {
        image: "/icons/Work1.png",
        title: "Sign up",
        description: "Register now with your email and experience seamless onboarding in minutes."
    },
    {
        image: "/icons/Work2.png",
        title: "Watch",
        description: "Stream effortlessly with just one click, no interruptions, just smooth high-quality video."
    },
    {
        image: "/icons/Work3.png",
        title: "Search",
        description: "Type in your keywords, apply filters, and discover the most relevant results in seconds."
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
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-2">How It Works</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A simple process to get you started and keep you going.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            {/* Image container */}
                            <div className="mb-6 w-80 h-80 bg-white flex items-center justify-center shadow-sm">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    width={200}
                                    height={200}
                                    className="object-contain"
                                />
                            </div>
                            
                            {/* Step content */}
                            <div className="relative w-full">
                                <div className="bg-white p-6 rounded-lg shadow-sm h-full">
                                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                                
                                {/* Arrow separator - only between steps on desktop */}
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}