// src/app/pages/signup.tsx

import FormContainer from "@/components/auth/FormContainer";

export default function SignupPage() {
  return (
    <div className="max-w-md mx-auto">
      <FormContainer initialType="signup" />
    </div>
  );
}
