const steps = [
    {
        title: "Sign up",
        description: "Register now with your email and experience seamless onboarding in minutes."
    },
    {
        title: "Watch",
        description: "Stream content effortlessly with just one click, no interruptions, just smooth and high-quality video."
    },
    {
        title: "Search",
        description: "Type in your keywords, apply filters, and discover the most relevant results in seconds."
    },
    {
        title: "Save",
        description: "Easily save your favorite content so you can access them easily on your profile."
    }
];

export default function HowItWorks() {

    return (
        <section className="py-16 mt-13 bg-[#FFF5F5]">
            <div className="max-w-7xl mx-auto text-center">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        A simple process to get you started and keep you going.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 text-center">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="bg-white p-6 rounded-lg border border-gray-200 h-full">
                                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                                    <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}