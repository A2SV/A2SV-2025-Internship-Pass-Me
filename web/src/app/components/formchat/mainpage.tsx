'use client'
import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Image from 'next/image'
import questions from '../../../../question'
import questionsAmharic from '../../../../amharic'
import Link from 'next/link'

const Mainpage = () => {
  const { control, handleSubmit } = useForm({shouldUnregister: true})
  const [lanaguage, setLanaguage] = useState("en")
  const [toLanguage, setToLanguage] = useState('am'); 
  const [time, setTime] = useState('')
  const[popup, setPopup] = useState(false)

  
  const onSubmit = (data: any) => {
    setPopup(false)
    console.log(data)
  }
  const handleLangaugechange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = event.target.value;
    setLanaguage(selectedLanguage);
    setToLanguage(selectedLanguage === 'en' ? 'am' : 'en'); // Toggle the toLanguage based on the selected language
    
  }
  const handleedit = () => {
   setPopup(false)
  }
  const handlethepopup = () => {
    setPopup(!popup)
  }

  return (
    <div className='w-full h-[100vh] bg-[#1C1C1C] overflow-scroll'>
      <div className='flex'>
        <div>
          <Image
            src="/banner.png"
            alt="A2SV Translator Banner"
            width={200}
            height={100}
            className="md:w-152 md:h-25 object-cover"
            priority
          />
        </div>

        <div className='flex gap-[36px] ml-auto mt-4'>
        
          <button className='bg-[#1c1c1c] hover:bg-[#4d4d4d] text-white w-40 h-10 px-4 rounded-[12px] border border-solid border-[rgba(255,255,255,0.1)] font-bold text-[20px] leading-[24px] text-center align-middle'>
            {lanaguage === "en" ? "Sign Up" : "ይመዝገቡ"}
          </button>
        
      
          <button className='bg-[#3972FF] border-[#3972FF] hover:bg-[#5C8BFF] text-white w-40 h-10 px-4 rounded-[12px] border border-solid mr-4 font-bold text-[20px] leading-[24px] text-center align-middle'>
            {lanaguage=== "en" ? "Login" : "ግባ"}
          </button>
      
        </div>
      </div>

      <div className='flex mx-20 justify-between mt-10'>
        <div>
          <p className='text-white text-[14px]'>From:</p>
          <div className="w-[280px] h-[56px] bg-[#676470] rounded-lg px-4 flex items-center gap-4">
            <select
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
          <p className='text-white text-[14px]'>To:</p>
          <div className="w-[280px] h-[56px] bg-[#676470] rounded-lg px-4 flex items-center gap-4">
            <select
              className="w-full h-full bg-transparent text-white text-base outline-none"
              value={toLanguage}
              onChange={() => {handlethepopup()}}

            >
              <option value="am">Amharic</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>
      </div>

      <div className='mt-10 ml-35'>
        <div className="w-[280px] h-[56px] bg-[#676470] rounded-lg px-4 flex items-center gap-4 relative">
          <input
            type="datetime-local"
            onChange={(e) => setTime(e.target.value)}
            value={time}
            placeholder='set you flight time and date'
            className="appearance-none w-full h-full bg-transparent text-white font-normal text-base leading-6 align-middle font-inter outline-none"
          />
          <svg
            className="w-4 h-4 text-white absolute right-4 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-10 m-40">
        {lanaguage === "en" && (
          Object.keys(questions).map((key) => (
            <div key={key} className="relative z-10 overflow-visible
    px-6 py-3
     rounded-2xl
    transition-transform duration-200 ease-in-out hover:-translate-y-[2px]
    before:content-[''] before:absolute before:-inset-[2px]
    before:rounded-2xl
    before:bg-[radial-gradient(circle_at_center,_#6B7DF3_0%,_#3150E0_100%)]
    before:opacity-0 before:transition-opacity before:duration-200
    hover:before:opacity-100
    before:-z-10 before:pointer-events-none">
              <p>
                <span className="inline-block font-bold text-[19px] text-white font-inter mb-5">
                  <span className="text-[#3972FF] mr-2">{parseInt(key)}</span>
                  {questions[parseInt(key)]}
                </span>
              </p>
              <Controller
                name={`question${questions[parseInt(key)]}`}
                control={control}
                rules={{ required: 'This field is required',
                  pattern: {
                    value: /^[a-zA-Z0-9\s.,!?]+$/,  
                    message: 'Please use English letters and numbers only.'
                  }
                 }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <input
                      {...field}
                      className="w-[952px] h-[46px] rounded-[16px] px-[9px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
                    />
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                  </>
                )}
              />
            </div>
          ))
        )}

        {lanaguage === "am" && (
          Object.keys(questionsAmharic).map((key) => (
            <div key={key} className="my-10 hover:border-4 border-transparent hover:border-[#3972FF] hover:rounded-2xl hover:bg-blue-500/10 transition-all duration-300">
              <p>
                <span className="inline-block font-bold text-[19px] text-white font-inter mb-5">
                  <span className="text-[#3972FF] mr-2">{parseInt(key)}</span>
                  {questionsAmharic[parseInt(key)]}
                </span>
              </p>
              <Controller
                name={`question${questionsAmharic[parseInt(key)]}`}
                control={control}
                rules={{ required: 'ይህን መሞላት አስፈላጊ ነው።' ,

      
                  pattern: {
                      value: /^[\u1200-\u137F]+$/,
                      message: 'ይቅርታ፣ እባኮትን የአማርኛ ፊደል በመጠቀም ይሞሉ።',
          
                    }
                }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <input
                      {...field}
                      className="w-[767px] h-[67px] rounded-[16px] px-[9px] bg-[#FFFFFF0D] border border-[#FFFFFF33] text-white focus:outline-none"
                    />
                    {error && <p className="text-red-500 mt-2">{error.message}</p>}
                  </>
                )}
              />
            </div>
          ))
        )}

        <div
          
          className="ml-70 w-[141px] h-[40px] rounded-[10px] px-[39px] bg-[#FFFFFF] hover:bg-[#F0F0F0] text-[#3972FF] border border-[#FFFFFF]"
          onClick={
           handlethepopup
          } >
        {(lanaguage==="am"?("አስገባው"):("Submit"))}
        </div>
     {popup && (lanaguage==="am" ? (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center text-center bg-black bg-opacity-60 w-[550px] h-[300px]">
     <div className=" flex  h-[40px]  w-[550px] justify-center align-middle mt-20 text-white font-inter font-normal text-[23px] leading-[100%] tracking-[0] text-center">
      <p>
      እርግጠኛ ነህ/ነሽ ይህን መረጃ ማስቀመጥ ይፈልጋሉ?
</p>
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
)
:(

<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 justify-center text-center bg-black bg-opacity-60 w-[550px] h-[300px]">
     <div className=" flex  h-[40px]  w-[550px] justify-center align-middle mt-20 text-white font-inter font-normal text-[23px] leading-[100%] tracking-[0] text-center">
      <p>
      are  you sure you want to continue with this information?
</p>
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

)
     )
  }
  </form>

    </div>
  )
}

export default Mainpage

