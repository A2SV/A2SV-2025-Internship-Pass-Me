import Image from "next/image";

const Frame = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-[#1A1A1A] text-white">
      {/* A2SV Translator Header */}
      {/* A2SV Translator Header */}
      <div className="absolute top-[10px] left-0 right-0 flex items-center justify-center gap-2 mx-auto w-full">
        <span className="text-2xl font-bold text-white">A2SV</span>
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 12H22"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-2xl font-bold text-white">TRANSLATOR</span>
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
