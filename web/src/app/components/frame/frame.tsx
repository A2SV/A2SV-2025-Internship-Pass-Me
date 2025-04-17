import Image from "next/image";

const Frame = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#1A1A1A] text-white">
      <div className="flex items-center justify-center gap-2 mx-auto w-full">
        <div className="flex justify-center self items-center py-4">
          <div>
            <Image
              src="/banner.png"
              alt="A2SV Translator Banner"
              width={333}
              height={62}
              className="md:w-100 md:h-18 object-fit"
              priority
            />
          </div>
        </div>
      </div>

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
        Translate anything, anytime, with ease. A2SV Translator breaks language
        barriers, making communication smooth, fast, and accessible for
        everyone.
      </p>
    </div>
  );
};

export default Frame;
