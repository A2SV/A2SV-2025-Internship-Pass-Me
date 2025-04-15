"use client";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
}

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<FormValues>();
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  // const handleShowPassword = () => {
  //   setShowPassword(!showPassword);
  // };

  const onSubmit = () => {
    console.log("done");
  };
  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-[13px]">WELCOME BACK</p>
        <p className="font-bold text-[25px]">Log in to your Account</p>
      </div>
      <div>
        <form
          className="flex flex-col w-full max-w-md"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {/* Email */}
          <div className="mb-5 relative group">
            <input
              type="email"
              id="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "email required",
                },
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
              })}
              placeholder="Enter your email"
              className="group w-full h-12 px-3 py-2 border border-[#BDBDBD]  hover:border-[#424242] text-[#424242] rounded-md opacity-70 placeholder:text-sm focus:outline-none"
            />
            <label
              htmlFor="email"
              className="absolute -top-3 left-3 bg-white px-2  text-sm text-[#BDBDBD] group-hover:text-[#424242] "
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
          <div className="mb-5 relative w-full group">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "password required",
                },
              })}
              placeholder="123"
              className="w-full relative h-12 px-3 py-2 border  border-violet-200 hover:border-[#424242] rounded-md opacity-70 placeholder:text-sm focus:outline-none"
            />
            <label
              htmlFor="password"
              className="absolute -top-3 px-2 left-3 text-[#BDBDBD] group-hover:text-[#424242] bg-white  text-sm"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#BDBDBD] group-hover:text-[#424242]"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              )}
            </button>

            {errors.password && (
              <p className="text-red-500 text-xs absolute top-full right-0 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="mb-8 text-[13px] flex justify-between">
            <div className="flex gap-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="text-4xl" />
                <span>Remember me</span>
              </label>
            </div>
            <div>
              <p>Forgot Password?</p>
            </div>
          </div>
          <button
            type="submit"
            className="text-[13px] h-12 shadow-[0px_4px_12px_0px_#3972FF] w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 transition self-center"
          >
            CONTINUE
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
