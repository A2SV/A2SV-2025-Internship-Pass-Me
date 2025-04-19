import Image from "next/image";

const Frame = () => {
  return (
    <div className="flex flex-col h-full w-full bg-[#1A1A1A] text-white">
      {/* Banner at the top, horizontally centered */}
      <div className="w-full flex justify-center py-4">
        <Image
          src="/banner.png"
          alt="A2SV Translator Banner"
          width={333}
          height={62}
          className="md:w-[400px] md:h-auto object-contain"
          priority
        />
      </div>

      {/* Center content vertically and horizontally in the remaining space */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Message Icon */}
        <div className="relative overflow-hidden w-[48px] h-[48px] rounded-[8px] mb-8">
          <Image
            src="/messages.png"
            alt="Messages icon"
            width={48}
            height={48}
            className="object-cover"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>

        {/* Text content */}
        <p className="font-normal text-white text-center max-w-[617px] text-[22px] leading-[30px]">
          Translate anything, anytime, with ease. A2SV Translator breaks
          language barriers, making communication smooth, fast, and accessible
          for everyone.
        </p>
      </div>
    </div>
  );
};

export default Frame;
