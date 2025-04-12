"use client";
import React from "react";
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

const SignupForm = () => {
  const form = useForm<FormValues>();
//   const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = () => {
    console.log("done");
  };
  return (
    <>
      <div className="w-full">
        <div className="mb-8">
          <p className="text-[13px] mb-2">LET&apos;S GET STARTED</p>
          <p className='font-bold text-[25px]'>
            Create an Account
          </p>
        </div>

        <div className="mt-2">
          <form
            className="flex flex-col w-full max-w-md"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* Full Name */}
            <div className="mb-4 relative">
              <input
                type="text"
                id="name"
                {...register("fullName", { required: true })}
                placeholder="Enter your full name"
                className="w-full h-14 px-3 py-2 border border-violet-100 rounded-md opacity-70 placeholder:text-sm focus:outline-none"
              />
              <label
                htmlFor="name"
                className="absolute -top-3 left-3 bg-white px-2 text-gray-600 text-sm"
              >
                Your Name
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
                className="w-full h-12 px-3 py-2 border border-[#424242] rounded-md opacity-70 placeholder:text-sm focus:outline-none"
              />
              <label
                htmlFor="email"
                className="absolute -top-3 left-3 bg-white text-[#424242] px-2 text-sm"
              >
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
                className="w-full h-12 px-3 py-2 border border-violet-200 rounded-md opacity-70 placeholder:text-sm focus:outline-none"
              />
              <label
                htmlFor="password"
                className="absolute -top-3 left-3 bg-white px-2 text-gray-600 text-sm"
              >
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
              className="w-full text-[13px] h-12 shadow-[0px_4px_12px_0px_#3972FF] bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
            >
              GET STARTED
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
