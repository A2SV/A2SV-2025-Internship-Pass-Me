"use client";
import React, { useState } from "react";
import Image from "next/image";
import questions from "../../../../question";
import questionsAmharic from "../../../../amharic";
import FormComponent from "./FormComponent"
import {inter} from "@/app/libs/font";
// import Link from 'next/link'

const Mainpage = () => {
  const [lanaguage, setLanaguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("am");
  const [time, setTime] = useState("");
  const [popup, setPopup] = useState(false);
  const[flightName, setFlightName] = useState("");
  const[flightFrom, setFlightFrom] = useState("");  
  const[flightTo, setFlightTo] = useState("");
  const[flightDate, setFlightDate] = useState("");

  interface FormData {
    [key: string]: string; // Adjust the types based on your form fields
  }

  const resetForm = () => {
    
    setTime("");
    setPopup(false);
    setFlightName("");
    setFlightFrom("");
    setFlightTo("");
    setFlightDate("");
  };

  const onSubmit = (data: FormData) => {
     const  flightDetails = {
      flightName: flightName, 
      flightFrom: flightFrom,
      flightTo: flightTo,
      time: time,
    };
    console.log("Flight Details:", flightDetails);
    console.log("Form Data:", data);

    setPopup(false);
    resetForm();

    console.log(data);
  };
  const handleLangaugechange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    setLanaguage(selectedLanguage);
    setToLanguage(selectedLanguage === "en" ? "am" : "en"); // Toggle the toLanguage based on the selected language
  };
  const handletoLangaugechange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const toLanguage = event.target.value;
    setToLanguage(toLanguage);
    setLanaguage(toLanguage=== "en" ? "am" : "en"); // Toggle the toLanguage based on the selected language
  };
  const handleedit = () => {
    setPopup(false);
  };
  const handlethepopup = () => {
    setPopup(!popup);
  };

  return (
    <div className={`w-full h-full bg-[#1C1C1C] overflow-scroll ${inter.className}`}>
      <div className="w-full ">
        <div>
                {/* Banner at the top, horizontally centered */}
                <div className=" flex justify-center items-center   py-4">
                  <div>
                  <Image
                    src="/banner.png"
                    alt="A2SV Translator Banner"
                    width={333}
                    height={62}
                    className="md:w-[400px] md:h-auto object-contain"
                    priority
                  />
                </div>
                </div>
          
        </div>
      </div>

      <div className="flex mx-20 justify-between mt-10">
        <div>
          <p className="text-white text-[14px]">From:</p>
          <div className="w-[280px] h-[56px] bg-[#676470] rounded-lg px-4 flex items-center gap-4">
            <select
              title="Select language"
              value={lanaguage}
              onChange={handleLangaugechange}
              className="w-full h-full bg-transparent text-white text-base outline-none"
            >
              <option value="en">English</option>
              <option value="am">Amharic</option>
            </select>
          </div>
        </div>

        <div>
          <p className="text-white text-[14px]">To:</p>
          <div className="w-[280px] h-[56px] bg-[#676470] rounded-lg px-4 flex items-center gap-4">
            <select
              className="w-full h-full bg-[#676470] text-white text-base outline-none"
              value={toLanguage}
              onChange={handletoLangaugechange} >
              <option value="am">Amharic</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      {/* <FlightDetails
        flightName={flightName}
        setFlightName={setFlightName}
        flightFrom={flightFrom}
        setFlightFrom={setFlightFrom}
        flightTo={flightTo}
        setFlightTo={setFlightTo}
        time={time}
        setTime={setTime}
        langauage={lanaguage}
        /> */}

      <h1 className="mt-10 text-white text-[24px] font-bold font-inter mx-20">
        {lanaguage === "en" ? "common airport questions " : "የአየር ማረፊያ የተደጋጉ ጥያቄዎች"}
        </h1>
<FormComponent
lanaguage={lanaguage}
flightName={flightName}
setFlightName={setFlightName}
flightFrom={flightFrom}
setFlightFrom={setFlightFrom}
flightTo={flightTo}
setFlightTo={setFlightTo}
time={time}
setTime={setTime}
questions={questions}
questionsAmharic={questionsAmharic}
 onSubmit={onSubmit}
popup={popup}
handlethepop={handlethepopup}
handleedit={handleedit}   
      />
    </div>
  );
};

export default Mainpage;
