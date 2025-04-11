
'use client'
import React from 'react'
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface FormValues {
    fullName: string;
    email: string;
    password: string;

  }
  

const SignupForm = () => {
    const form = useForm<FormValues>();
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState, reset } = form;
    const { errors, isSubmitSuccessful } = formState;

    const onSubmit = () =>{
        console.log("done");
    }
  return (
    <>
    <div className='mt-5 ml-5'>
    <div className='mt-4 ml-4 mb-8'>
        <p className='text-xl mb-3'>let's get started</p>
         <p className='font-normal font-["Zen Kaku Gothic Antique"] text-3xl'>Createan account</p>
    </div>

      <div className='ml-4 mt-2'>

       

<form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit(onSubmit)} noValidate>
  {/* Full Name */}
  <div className="mb-4 relative">
    <input
      type="text"
      id="name"
      {...register("fullName", { required: true })}
      placeholder="Enter your full name"
      className="w-full   h-14 px-3 py-2 border border-violet-100 rounded-md opacity-70 placeholder:text-sm focus:outline-none"
    />
    <label htmlFor="name" className="absolute -top-3 left-3 bg-white px-2 text-gray-600 text-sm">
      Full name
    </label>
    {errors.fullName && (
      <p className="text-red-500 text-xs absolute top-full right-0 mt-1">
        {errors.fullName.message}
      </p>
    )}
  </div>

  {/* Email */}
  <div className="mb-4 relative">
    <input
      type="email"
      id="email"
      {...register("email", { required: true, pattern: /.../ })}
      placeholder="Enter your email"
      className="w-full h-14 px-3 py-2 border border-[#424242] rounded-md opacity-70 placeholder:text-sm focus:outline-none"
    />
    <label htmlFor="email" className="absolute -top-3 left-3 bg-white text-[#424242] px-2 text-gray-600 text-sm">
      Email
    </label>
    {errors.email && (
      <p className="text-red-500 text-xs absolute top-full right-0 mt-1">
        {errors.email.message}
      </p>
    )}
  </div>

  {/* Password */}
  <div className="mb-4 relative">
    <input
      type="password"
      id="password"
      {...register("password", { required: true })}
      placeholder="Enter your password"
      className="w-full h-14 px-3 py-2 border border-violet-200 rounded-md opacity-70 placeholder:text-sm focus:outline-none"
    />
    <label htmlFor="password" className="absolute -top-3 left-3 bg-white px-2 text-gray-600 text-sm">
      Password
    </label>
    {errors.password && (
      <p className="text-red-500 text-xs absolute top-full right-0 mt-1">
        {errors.password.message}
      </p>
    )}
  </div>

  <button
    type="submit"
    className="w-full h-14 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition"
  >
    Continue
  </button>
</form>
        </div>
      </div>

    
    </>
  )
}

export default SignupForm