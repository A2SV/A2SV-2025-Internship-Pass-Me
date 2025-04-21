import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import React, { useState } from "react";
interface FlightDetailsProps {
    flightName: string;
    setFlightName: (value: string) => void;
    flightFrom: string;
    setFlightFrom: (value: string) => void;
    flightTo: string;
    setFlightTo: (value: string) => void;
    time: string;
    setTime: (value: string) => void;
    langauage: string;
  }

const FlightDetails: React.FC<FlightDetailsProps> = ({
  flightName,
  setFlightName,
  flightFrom,
  setFlightFrom,
  flightTo,
  setFlightTo,
  time,
  setTime,
  langauage,
}) => {
  // State to track validation errors
  const [errors, setErrors] = useState({
    flightName: "",
    flightFrom: "",
    flightTo: "",
  });

  // Define regex patterns
  const amharicRegex = /^[\u1200-\u137F\s]+$/; // Amharic characters and spaces
  const englishRegex = /^[a-zA-Z\s]+$/; // English letters and spaces

  // Validation function
  const validateInput = (value: string, field: string) => {
    const regex = langauage === "am" ? amharicRegex : englishRegex;
    const errorMessage =
      langauage === "am"
        ? "እባኮትን የአማርኛ ፊደል ብቻ ያስገቡ።"
        : "Please enter English letters only.";

    if (!regex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: errorMessage,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "",
      }));
    }
  };

  return (
    <div className="mt-4 ml-35">
      <h1 className="text-white text-[25px]">
        {langauage === "en" ? "Flight Details" : "የበረራ ዝርዝሮች"}
      </h1>
      

      {/* Flight Name */}
    
      <div className="relative overflow-visible my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none ">
        <p className="text-white text-[19px] font-bold font-inter m-2">
          {langauage === "en" ? "Flight Name" : "የበረራ ስም"}
        </p>
        <div className="px-2 py-4">
          <input
            onChange={(e) => {
              setFlightName(e.target.value);
              validateInput(e.target.value, "flightName");
            }}
            value={flightName}
            placeholder={
              langauage === "en"
                ? "Set your flight name"
                : "የበረራዎን ስም ይመርጡ"
            }
            className="w-full h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
          />
          {errors.flightName && (
            <p className="text-red-500 mt-2">{errors.flightName}</p>
          )}
        </div>
      </div>

      {/* From Country */}
      <div className="flex  gap-10">
        <div className="relative  overflow-visible my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none">
          <p className="text-white text-[19px] font-bold font-inter m-2">
            {langauage === "en" ? "From Country" : "መነሻ አገር"}
          </p>
          <div className="px-2 py-4">
            <input
              onChange={(e) => {
                setFlightFrom(e.target.value);
                validateInput(e.target.value, "flightFrom");
              }}
              value={flightFrom}
              placeholder={
                langauage === "en"
                  ? "Your origin country"
                  : "የመነሻ አገር"
              }
              className="w-full h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
            />
            {errors.flightFrom && (
              <p className="text-red-500 mt-2">{errors.flightFrom}</p>
            )}
          </div>
        </div>

        {/* To Country */}
        <div className="relative  overflow-visible my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none">
          <p className="text-white text-[19px] font-bold font-inter m-2">
            {langauage === "en" ? "To Country" : "መድረሻ አገር"}
          </p>
          <div className="px-2 py-4">
            <input
              onChange={(e) => {
                setFlightTo(e.target.value);
                validateInput(e.target.value, "flightTo");
              }}
              value={flightTo}
              placeholder={
                langauage === "en"
                  ? "Your destination country"
                  : "የመድረሻ አገር"
              }
              className="w-full h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
            />
            {errors.flightTo && (
              <p className="text-red-500 mt-2">{errors.flightTo}</p>
            )}
          </div>
        </div>
      </div>

      {/* Date and Time */}
      <div className="relative  overflow-visible my-8 before:rounded-[10px] transition-transform duration-200 ease-in-out before:border-[2px] before:border-[#3927FF] hover:-translate-y-[2px] before:content-[''] before:absolute before:-inset-[2px] before:bg-[radial-gradient(circle_at_center,_#386BF62E_0%,_#386BF62E_100%)] before:opacity-0 before:transition-opacity before:duration-200 hover:before:opacity-100 before:-z-10 before:pointer-events-none">
        <p className="text-white text-[19px] font-bold font-inter m-2">
          {langauage === "en" ? "Date and Time" : "ቀን እና ሰዓት"}
        </p>
         <div className="px-2 py-4">
        <ReactDatePicker
    selected={time ? new Date(time) : null}
    onChange={(date) => setTime(date?.toISOString() || "")}
    showTimeSelect
    dateFormat="Pp"
    placeholderText={
      langauage === "en"
        ? "Set your flight time and date"
        : "የበረራዎን ቀን እና ሰዓት ይመርጡ"
    }
    className="w-full h-[67px] px-2 py-4 rounded-[16px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
  />
  </div>
      </div>
    </div>
  );
};

export default FlightDetails;




