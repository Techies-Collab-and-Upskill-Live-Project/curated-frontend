import Image from 'next/image';

export default function Herosection() {
    return (
        <div className="text-center relative px-4 mt-24">
            {/* Bulb Icon - Centered on mobile, original position on larger screens */}
            <div className="flex justify-center sm:block sm:absolute sm:right-[89%] sm:mt-4 sm:-translate-x-1/2 sm:mt-12">
                <Image
                    src="/icons/Bulb.svg"
                    alt="Lightbulb icon"
                    width={81.34}
                    height={104.41}
                    className="w-[60px] h-[76px] sm:w-[70px] sm:h-[90px] md:w-[81.34px] md:h-[104.41px]"
                />
            </div>

            <div className="mt-6 sm:mt-10 sm:pt-7 md:pt-16 lg:pt-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                    Discover Smarter<br className="sm:hidden" /> Ways to Learn
                </h1>
                <p className="text-sm sm:text-md md:text-lg text-white mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl mx-auto mt-4">
                    CuratED helps you find insightful, educational videos tailored to your interests
                </p>
            </div>
        </div>
    );
}
