'use client'
import React from 'react'
// import Image from "next/image";
// import { useState } from "react";
import { useForm } from "react-hook-form";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
interface FormValues {
    fullName: string;
    email: string;
    password: string;

}

const LoginForm = () => {


  const form = useForm<FormValues>();
    // const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState,  } = form;
    const { errors,  } = formState;

    const onSubmit = () =>{
        console.log("done");
    }
  return (

    <div className='mt-5 ml-5'>
    <div className='mt-4 ml-4 mb-8'>
        <p className='text-xl mb-3'>welcome to login page</p>
         <p className='font-normal font-["Zen Kaku Gothic Antique"] text-3xl'>
          login to you account
         </p>
    </div>

      <div className='ml-4 mt-2'>

       

<form className="flex flex-col w-full max-w-md" onSubmit={handleSubmit(onSubmit)} noValidate>

  {/* Email */}
  <div className="mb-4 relative">
    <input
      type="email"
      id="email"
      {...register("email", { required: true, pattern: /.../ })}
      placeholder="Enter your email"
      className="w-full h-14 px-3 py-2 border border-violet-200 rounded-md opacity-70 placeholder:text-sm focus:outline-none"
    />
    <label htmlFor="email" className="absolute -top-3 left-3 bg-white px-2 text-gray-600 text-sm">
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
  continue
  </button>
</form>
        </div>
      </div>

    
  )
}

export default LoginForm