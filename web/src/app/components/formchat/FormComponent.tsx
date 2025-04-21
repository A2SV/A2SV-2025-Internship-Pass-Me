import React from "react";
import { useForm, Controller } from "react-hook-form";

interface FormComponentProps {
  lanaguage: string;
  questions: { [key: string]: string };
  questionsAmharic: { [key: string]: string };
  onSubmit: (data: any) => void;
  handleedit: (data: any) => void;
 handlethepop: (data: any) => void;
  popup: boolean;
}

const FormComponent: React.FC<FormComponentProps> = ({
  lanaguage,
  questions,
  questionsAmharic,
  popup,
  onSubmit,
  handleedit,
  handlethepop

}) => {
  const { control, handleSubmit } = useForm({ shouldUnregister: true });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-32 mt-10 mb-8">
      {lanaguage === "en" &&
        Object.keys(questions).map((key) => (
          <div
            key={key}
            className=" my-8 relative overflow-visible  before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none"
          >
            <p>
              <span className="inline-block font-bold text-[19px] text-white font-inter m-2">
                <span className="text-[#3972FF] mr-2">{`${parseInt(key)} ,`}</span>
                {`${questions[parseInt(key)]}`}
              </span>
            </p>
            <Controller
              name={`${questions[parseInt(key)]}`}
              control={control}
              rules={{
                required: "This field is required",
                pattern: {
                  value: /^[a-zA-Z0-9\s.,!?]+$/,
                  message: "Please use English letters and numbers only.",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div className="px-2 py-4">
                  <input
                    {...field}
                    placeholder="enter your answer"
                    className="w-full px-2 py-4 h-[67px] rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
                  />
                  {error && (
                    <p className="text-red-500 mt-2">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        ))}

      {lanaguage === "am" &&
        Object.keys(questionsAmharic).map((key) => (
          <div
            key={key}
            className="relative overflow-visible my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none"
          >
            <p>
              <span className="inline-block font-bold text-[19px] text-white font-inter m-2">
                <span className="text-[#3972FF] mx-2">{`${parseInt(key)},`}</span>
                {questionsAmharic[parseInt(key)]}
              </span>
            </p>
            <Controller
              name={`${questionsAmharic[parseInt(key)]}`}
              control={control}
              rules={{
                required: "ይህን መሞላት አስፈላጊ ነው።",
                pattern: {
                  value: /^[\u1200-\u137F]+$/,
                  message: "ይቅርታ፣ እባኮትን የአማርኛ ፊደል በመጠቀም ይሞሉ።",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div className="px-2 py-4">
                  <input
                    {...field}
                    placeholder="የአማርኛ ፊደል በመጠቀም ይሞሉ"
                    className="w-full  px-2 py-4 h-[67px] rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
                  />
                  {error && (
                    <p className="text-red-500 mt-2">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>
        ))}

      <div className="flex justify-center items-center mr-60 mt-5">
        <button
          type="button"
          onClick={handlethepop}

          className=" mt-10 w-[141px] h-[40px]
    pt-[4px] pr-[39px] pb-[4px] pl-[39px]
    gap-[8px]
    rounded-[10px]
    flex items-center justify-center
    cursor-pointe
    border-none
    font-sans text-[14px] bg-[#FFFFFF] hover:bg-[#F0F0F0] text-[#3972FF] border border-[#FFFFFF]"
        >
         <p className="font-inter font-bold text-[18px] leading-[32px]
  tracking-normal text-center align-middle
"> {lanaguage === "am" ? "አስገባው" : "Submit"} </p>
        </button>
      </div>
      {popup &&
          (lanaguage === "am" ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center text-center bg-black bg-opacity-60 w-[550px] h-[300px]">
              <div className=" flex  h-[40px]  w-[550px] justify-center align-middle mt-20 text-white font-inter font-normal text-[23px] leading-[100%] tracking-[0] text-center">
                <p>እርግጠኛ ነህ/ነሽ ይህን መረጃ ማስቀመጥ ይፈልጋሉ?</p>
              </div>
              <div className="flex justify-center gap-4  mt-15">
                <button
                  onClick={handleedit}
                  className="  bg-[#CCCCCC8C] hover:bg-[#4d4d4d] text-white w-40 h-10  rounded-[12px] border border-solid border-[rgba(255,255,255,0.1)] font-bold text-[15px] leading-[24px] text-center align-middle"
                >
                  ወደ ማረም ተመለስ
                </button>
                <button
                  type="submit"
                  className="bg-[#3972FF] border-[#3972FF] hover:bg-[#5C8BFF] text-white w-40 h-10 px-4 rounded-[12px] border border-solid mr-4 font-bold text-[20px] leading-[24px] text-center align-middle"
                >
                  አዎ
                </button>
              </div>
            </div>
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center text-center bg-black bg-opacity-60 w-[550px] h-[300px]">
              <div className=" flex  h-[40px]  w-[550px] justify-center align-middle mt-20 text-white font-inter font-normal text-[23px] leading-[100%] tracking-[0] text-center">
                <p>are you sure you want to continue with this information?</p>
              </div>
              <div className="flex justify-center gap-4  mt-15">
                <button
                  onClick={handleedit}
                  className="bg-[#CCCCCC8C] hover:bg-[#4d4d4d] text-white w-40 h-10 px-4 rounded-[12px] border border-solid border-[rgba(255,255,255,0.1)] font-bold text-[20px] leading-[24px] text-center align-middle"
                >
                  Back to Edit
                </button>
                <button
                  type="submit"
                  className="bg-[#3972FF] border-[#3972FF] hover:bg-[#5C8BFF] text-white w-40 h-10 px-4 rounded-[12px] border border-solid mr-4 font-bold text-[20px] leading-[24px] text-center align-middle"
                >
                  YES
                </button>
              </div>
            </div>
          ))}

    </form>
  );
};

export default FormComponent;


