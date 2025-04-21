import React from "react";
import { useForm, Controller, DefaultValues } from "react-hook-form";

import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { useCreateFlightMutation } from "@/app/services/flightsApi";

interface FormComponentProps {
  questions:any;
  questionsAmharic: any;
  handleedit: (data: any) => void;
 handlethepop: (data: any) => void;
  popup: boolean;
  flightName: string;
  setFlightName: (value: string) => void;
  flightFrom: string;
  setFlightFrom: (value: string) => void;
  flightTo: string;
  setFlightTo: (value: string) => void;
  time: string;
  setTime: (value: string) => void;
  lanaguage: string;
  setPopup: (value: boolean) => void;
}
const FormComponent: React.FC<FormComponentProps> = ({
  lanaguage,
  questions,
  questionsAmharic,
  popup,
setPopup,
  handleedit,
  handlethepop,
  flightName,
  setFlightName,
  flightFrom,
  setFlightFrom,
  flightTo,
  setFlightTo,
  time,
  setTime,
  
  
}) => {
 const {data: session, status } = useSession()
interface FormDefaultValues {
  flightName: string;
  flightOrigin: string;
  flightDestination: string;
  flightDate: null;
  [key: string]: string | null; // For dynamic question fields
}

const { control, handleSubmit, reset } = useForm<FormDefaultValues>({
  shouldUnregister: true,
  defaultValues: {
    flightName: "",
    flightOrigin: "",
    flightDestination: "",
    flightDate: null,
    ...(lanaguage === "en"
      ? Object.keys(questions).reduce<Record<string, string>>((acc, key) => {
          const questionKey = questions[parseInt(key)];
          acc[questionKey] = "";
          return acc;
        }, {})
      : Object.keys(questionsAmharic).reduce<Record<string, string>>((acc, key) => {
          const questionKey = questionsAmharic[parseInt(key)];
          acc[questionKey] = "";
          return acc;
        }, {}))
  }
});

const [createFlight, { isLoading: isCreating }] = useCreateFlightMutation();
const onSubmitForm = async (data: any) => {
  const {
    flightName,
    flightOrigin,
    flightDestination,
    flightDate,
    ...qaFields
  } = data;

  const qa = Object.entries(qaFields).map(([question, answer]) => ({
    question,
    answer: (answer as string)
  }));

  try {
    await createFlight({
      title:        flightName,
      from_country: flightOrigin,
      to_country:   flightDestination,
      date:         flightDate,
      // @ts-ignore
      user_id:      session?.user?.id ?? '',
      language:     lanaguage,
      qa,
    }
    ).unwrap();

    setPopup(false);
    reset();
  } catch (err) {
    console.error('Failed to create flight', err);
  }
};

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="mx-auto w-[85%] mt-10 mb-8">

<h1 className="text-white text-[25px] md:mb-6 sm:m-0">
        {lanaguage=== "en" ? "Flight Details" : "የበረራ ዝርዝሮች"}
      </h1>

<div className="relative py-4 my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none">
    <div className="relative px-2 py-4">
      <p className="text-white text-[19px] font-bold font-inter m-2">
        {lanaguage === "en" ? "Flight name" : "የበረራ  ስም"}
      </p>
      <Controller
        name="flightName"
        control={control}
        rules={{
          required: lanaguage === "en" ? "Flight name is required" : "የበረራ ስም አስፈላጊ ነው።",
          pattern: {
            value: lanaguage === "en" ? /^[a-zA-Z\s]+$/ : /^[\u1200-\u137F\s]+$/,
            message: lanaguage === "en" 
            ? "Please use English letters only" 
            : "እባኮትን የአማርኛ ፊደል ብቻ ያስገቡ።",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="relative px-2 py-4">
            <input
              placeholder={lanaguage === "en" ? "Your flight name" : "የበረራ ስም"}
              {...field}
              className="w-full h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none transition-all duration-200"
            />
            {error && <p className="text-red-500 mt-2">{error.message}</p>}
          </div>
        )}
      />
    </div>
  </div>

  {/* From/To Country */}
  <div className=" md:flex  md:gap-6">
    {/* From Country */}
    <div className=" w-full  min-w-[250px] mr-32 relative my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none">
      <p className="text-white text-[19px] font-bold font-inter m-2">
        {lanaguage === "en" ? "From Country" : "መነሻ አገር"}
      </p>
      <Controller
        name="flightOrigin"
        control={control}
        rules={{
          required: lanaguage === "en" ? "Flight origin is required" : "መነሻ አገር አስፈላጊ ነው።",
          pattern: {
            value: lanaguage === "en" ? /^[a-zA-Z\s]+$/ : /^[\u1200-\u137F\s]+$/,
            message: lanaguage === "en" 
              ? "Please use English letters only" 
              : "እባኮትን የአማርኛ ፊደል ብቻ ያስገቡ።",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className=" w-full relative px-2 py-4 ">
            <input
              {...field}
              placeholder={lanaguage === "en" ? "Your origin country" : "የመነሻ አገር"}
              className="w-full h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none transition-all duration-200"
            />
            {error && <p className="text-red-500 mt-2">{error.message}</p>}
          </div>
        )}
      />
    </div>

    {/* To Country */}
    <div className="w-full min-w-[250px]  mr-32 relative my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none">
      <p className="text-white text-[19px] font-bold font-inter m-2">
        {lanaguage === "en" ? "To Country" : "መድረሻ አገር"}
      </p>
      <Controller
        name="flightDestination"
        control={control}
        rules={{
          required: lanaguage === "en" ? "Flight destination is required" : "መድረሻ አገር አስፈላጊ ነው።",
          pattern: {
            value: lanaguage === "en" ? /^[a-zA-Z\s]+$/ : /^[\u1200-\u137F\s]+$/,
            message: lanaguage === "en" 
              ? "Please use English letters only" 
              : "እባኮትን የአማርኛ ፊደል ብቻ ያስገቡ።",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="w-full px-2 py-4">
            <input
              {...field}
              placeholder={lanaguage === "en" ? "Your destination country" : "የመድረሻ አገር"}
              className="w-full h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none transition-all duration-200"
            />
            {error && <p className="text-red-500 mt-2">{error.message}</p>}
          </div>
        )}
      />
    </div>
  </div>

  {/* Flight Date */}
  <div className="relative sm:w-70 md:w-full  py-4 my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none">
    <div className="relative px-2 py-4">
      <p className="text-white text-[19px] font-bold font-inter m-2">
        {lanaguage === "en" ? "Flight date" : "የበረራ ቀን"}
      </p>
      <Controller
        name="flightDate"
        control={control}
        rules={{
          required: lanaguage === "en" ? "Flight date is required" : "የበረራ ቀን አስፈላጊ ነው።"
        }}
        render={({ field }) => (
          <div className="relative px-2 py-4">
            <ReactDatePicker
              selected={field.value ? new Date(field.value) : null}
              onChange={(date) => field.onChange(date?.toISOString())}
              showTimeSelect
              dateFormat="Pp"
              placeholderText={
                lanaguage === "en" 
                  ? "Set your flight time and date" 
                  : "የበረራዎን ቀን እና ሰዓት ይመርጡ"
              }
              className="min-w-[300px] md:w-[976px] max-w-[976px]  h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none transition-all duration-200"
            />
          </div>
        )}
      />
    </div>
  </div>

       <h1 className="text-white text-[24px]">{(lanaguage==="en"?("common air port questions"):("በአየር ማረፊያ በተደጋጋሚ የሚጠየቁ ጥያቄዎች"))}</h1>
      
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
                    value={field.value || ''}
                    placeholder="enter your answer"
                    className=" w-full min-w-[240px] px-2 py-4 h-[67px] rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
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
                    value={field.value || ''}
                    placeholder="የአማርኛ ፊደል በመጠቀም ይሞሉ"
                    className="w-full min-w-[240px] px-2 py-4 h-[67px] rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
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
            <div className="absolute sm:bottom-[100px]:bottom-[300px]   top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[90vw] max-w-[550px] h-[300px] justify-center text-center bg-black bg-opacity-60 z-50">
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
            <div className="absolute md:w-[550px] sm:bottom-[100px]:bottom-[300px] md:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center text-center bg-black bg-opacity-60 w-[550px] h-[300px]">
              <div className=" flex  h-[40px]   w-[550px] justify-center align-middle mt-20 text-white font-inter font-normal md:text-[23px] text-[15px] sm:px-5 leading-[100%] tracking-[0] text-center">
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




