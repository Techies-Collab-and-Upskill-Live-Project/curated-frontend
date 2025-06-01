import Image from 'next/image';

export default function Herosection() {
    return (
        <div className="text-center relative">
            {/* Bulb Icon Image */}
            <div className="absolute 
                right-[89%] -translate-x-1/2 mt-12">
                <Image
                    src="/icons/Bulb.svg"
                    alt="Lightbulb icon"
                    width={81.34}
                    height={104.41}
                    className="w-[60px] h-[76px] sm:w-[70px] sm:h-[90px] md:w-[81.34px] md:h-[104.41px]"
                />
            </div>

            <div className="mt-20 sm:pt-14 md:pt-16 lg:pt-20">
                <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    Discover Smarter Ways to Learn
                </h1>
                <p className="sm:text-md md:text-lg text-white mb-8 sm:mb-10 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto">
                    CuratED helps you find insightful, educational videos tailored to your interests
                </p>
            </div>
        </div>
    );
}
