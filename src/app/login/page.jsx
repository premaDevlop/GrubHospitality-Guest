"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleNext = (enteredEmail) => {
    const cleanEmail = enteredEmail.trim();
    if (!cleanEmail) {
      setShowToast(true);
      return;
    }
    setEmail(cleanEmail);
    setPhone(cleanEmail);
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
    <main className="w-full min-h-screen bg-white flex flex-col justify-between select-none relative">
      {/* Toast Alert */}
      {showToast && (
        <div className="absolute top-4 left-4 right-4 z-50 bg-[#ffcccc] border border-[#cc0101] rounded-xl p-4 flex gap-3 shadow-lg transition-all">
          <div className="shrink-0 mt-0.5">
            <Image
              src="/otp_icons/guest_not_found.svg"
              alt="Warning"
              width={22}
              height={21}
              className="w-[22px] h-[21px] object-contain"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-[14px] leading-[18px] font-bold text-[#cc0101] mb-1">
              Guest Details Not Found
            </h3>
            <p className="text-[12px] leading-[16px] font-normal text-[#cc0101]">
              We couldn't find your details in our system.
              <br />
              Please contact hotel staff for support.
            </p>
          </div>
        </div>
      )}
     
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
