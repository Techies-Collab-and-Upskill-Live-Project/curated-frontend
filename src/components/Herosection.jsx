import Image from 'next/image';

export default function Herosection() {
    return (
        <div className="text-center relative">
            {/* Bulb Icon Image */}
            <div className="absolute left-[13%] -top-10">
                <Image
                    src="/icons/Bulb.svg"
                    alt="Lightbulb icon"
                    width={81.34}
                    height={104.41}
                />
            </div>

            <div className="pt-16">
                <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                    Discover Smarter Ways to Learn
                </h1>
                <p className="text-l text-gray-600 mb-10 max-w-2xl mx-auto">
                    CuratED helps you find insightful, educational videos tailored to your interests
                </p>
            </div>
        </div>
    );
}
