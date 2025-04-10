// src/app/components/auth/FormContainer.tsx

import { useState } from "react";
import Image from "next/image";
import LoginForm from "./forms/LoginForm"; // Your teammate's login form
import SignupForm from "./forms/SignupForm"; // Your teammate's signup form

interface FormContainerProps {
  initialType?: "login" | "signup"; // Optional: Pass the initial form type (login/signup)
}

const FormContainer = ({ initialType = "login" }: FormContainerProps) => {
  const [formType, setFormType] = useState<"login" | "signup">(initialType);

  const toggleForm = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
  };

  return (
    <div className="max-w-md mx-auto p-8">
      {/* Display the login or signup form based on formType */}
      {formType === "login" ? <LoginForm /> : <SignupForm />}

      {/* Social Buttons and Links */}
      <div className="mt-6">
        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-sm text-gray-500">Or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Social Login Buttons */}
        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-full mb-3 hover:bg-gray-50">
          <Image
            src="/facebook-icon.png"
            alt="Facebook"
            width={20}
            height={20}
          />
          Continue with Facebook
        </button>

        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-full mb-3 hover:bg-gray-50">
          <Image src="/google-icon.png" alt="Google" width={20} height={20} />
          Continue with Google
        </button>

        <button className="w-full flex items-center justify-center gap-2 border py-2 rounded-full hover:bg-gray-50">
          <Image src="/apple-icon.png" alt="Apple" width={20} height={20} />
          Continue with Apple
        </button>

        {/* Navigation Links */}
        {formType === "login" ? (
          <p className="text-sm text-center mt-4">
            New User?{" "}
            <span
              onClick={toggleForm}
              className="text-orange-500 hover:underline cursor-pointer"
            >
              SIGNUP HERE
            </span>
          </p>
        ) : (
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              onClick={toggleForm}
              className="text-orange-500 hover:underline cursor-pointer"
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
