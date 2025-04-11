// src/app/pages/login.tsx

import FormContainer from "../components/auth/FormContainer";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <FormContainer initialType="login" />
    </div>
  );
}
