import Image from 'next/image';

export default function Herosection() {
    return (
        <div className="text-center relative">
            {/* Bulb Icon Image */}
            <div className="absolute 
                left-[5%] sm:left-[-4%] md:left-[8%] lg:left-[11%] xl:left-[14%] 
          -top-6 sm:-top-8 md:-top-10">
                <Image
                    src="/icons/Bulb.svg"
                    alt="Lightbulb icon"
                    width={81.34}
                    height={104.41}
                    className="w-[60px] h-[76px] sm:w-[70px] sm:h-[90px] md:w-[81.34px] md:h-[104.41px]"
                />
            </div>

            <div className="pt-12 sm:pt-14 md:pt-16 lg:pt-20">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    Discover Smarter Ways to Learn
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto">
                    CuratED helps you find insightful, educational videos tailored to your interests
                </p>
            </div>
        </div>
    );
}
