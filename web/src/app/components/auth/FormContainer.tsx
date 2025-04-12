// src/app/components/auth/FormContainer.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignupForm";

interface FormContainerProps {
  initialType?: "login" | "signup"; // Optional: Pass the initial form type (login/signup)
}

const FormContainer = ({ initialType = "login" }: FormContainerProps) => {
  const [formType, setFormType] = useState<"login" | "signup">(initialType);

  const toggleForm = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="max-w-md mx-auto p-8 w-full">
      {/* Display the login or signup form based on formType */}
      {formType === "login" ? <LoginForm /> : <SignupForm />}

      {/* Social Buttons and Links */}
      <div className="mt-6">
        {/* Divider */}
        <div className="flex items-center mt-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <button className="text-[13px] text-neutral-600 w-full flex items-center justify-center gap-2 border border-zinc-100 py-2 rounded-xl mb-3 hover:bg-gray-50">
          <div className="w-[20%] flex justify-end"><Image src="/google-icon.png" alt="Google" width={20} height={20}  className="w-4 h-4"/></div>
          <div className="w-[80%] flex pl-8">{formType === "login" ? "Log in with Google" : "Sign up with Google"}</div>
        </button>

        <button className="text-[13px] text-neutral-600 w-full flex items-center justify-center gap-2 border border-zinc-100 py-2 rounded-full mb-3 hover:bg-gray-50">
          <div className="w-[20%] flex justify-end"><Image src="/facebook-icon.png" alt="Google" width={20} height={20}  className="w-3 h-3"/></div>
          <div className="w-[80%] flex pl-8">{formType === "login" ? "Log in with Facebook" : "Sign up with Facebook"}</div>
        </button>

        <button className="text-[13px] text-neutral-600 w-full flex items-center justify-center gap-2 border border-zinc-100 py-2 rounded-full hover:bg-gray-50">
          <div className="w-[20%] flex justify-end"><Image src="/Shape.png" alt="Google" width={20} height={20} className="w-3 h-3"/></div>
          <div className="w-[80%] flex pl-8">{formType === "login" ? "Log in with Apple" : "Sign up with Apple"}</div>
        </button>

        {/* Navigation Links */}
        {formType === "login" ? (
          <p className="text-sm text-center mt-25">
            New User?{" "}
            <span
              onClick={toggleForm}
              className="text-blue-500 font-bold hover:underline cursor-pointer"
            >
              SIGNUP HERE
            </span>
          </p>
        ) : (
          <p className="text-[13px] text-center mt-15">
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              className="text-blue-500 font-bold hover:underline cursor-pointer"
            >
              LOGIN HERE
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default FormContainer;
