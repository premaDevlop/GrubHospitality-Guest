"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/component/login/LoginHeader";
import OtpLoginModal from "@/component/login/OtpLoginModal";
import OtpVerifyModal from "@/component/login/OtpVerifyModal";

export default function AuthPage({ onLoginSuccess }) {
  const router = useRouter();
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");

  const handleNext = (enteredEmail) => {
    setEmail(enteredEmail);
    setStep("verify");
  };

  const handleBack = () => {
    setStep("login");
  };

  const handleVerify = (otpValue) => {
    if (otpValue === "1234") {
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        router.push("/home");
      }
    }
  };

  return (
    <main className="w-full min-h-screen bg-white flex flex-col justify-between select-none">
     
      <LoginHeader />

    
      {step === "login" ? (
        <OtpLoginModal onNext={handleNext} />
      ) : (
        <OtpVerifyModal
          email={email}
          onBack={handleBack}
          onVerify={handleVerify}
        />
      )}
    </main>
  );
}
