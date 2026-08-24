"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginHeader from "@/component/login/LoginHeader";
import OtpLoginModal from "@/component/login/OtpLoginModal";
import OtpVerifyModal from "@/component/login/OtpVerifyModal";
import LoadingScreen from "@/component/ui/LoadingScreen";
import { useRoom } from "@/component/providers/RoomProvider";

export default function AuthPage({ onLoginSuccess }) {
  const router = useRouter();
  const { setPhone, bookedRooms, setSelectedRoom } = useRoom();
  const [step, setStep] = useState("login");
  const [email, setEmail] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  const handleNext = (enteredEmail) => {
    setEmail(enteredEmail);
    setPhone(enteredEmail);
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
        if (bookedRooms.length > 1) {
          router.push("/room-selection");
        } else {
          setSelectedRoom(bookedRooms[0] || "302");
          setShowLoading(true);
        }
      }
    }
  };

  const handleLoadingComplete = () => {
    router.push("/home");
  };

  if (showLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} duration={2000} />;
  }

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
