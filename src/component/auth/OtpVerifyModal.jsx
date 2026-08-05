"use client";

import { useState, useRef } from "react";
import Icon from "@/component/ui/Icon";
import { showOtpErrorToast, showOtpSuccessToast } from "@/component/ui/Toast";
import Image from "next/image";

export default function OtpVerifyModal({ email, onBack, onVerify, onResend }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const isDisabled = otp.join("").length !== 4;

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) return;

    if (otpString === "1234") {
      showOtpSuccessToast("OTP Verified", "You have successfully signed in.");
      setTimeout(() => {
        if (onVerify) {
          onVerify(otpString);
        }
      }, 600);
    } else {
      showOtpErrorToast(
        "Invalid OTP",
        "Please enter a valid OTP and try again.",
      );
    }
  };

  return (
    <div className="w-full flex-1 bg-white rounded-t-xl -mt-5 z-30 px-6 pt-5 pb-6 flex flex-col justify-between items-center shadow-lg overflow-y-auto">
      <div className="w-full flex flex-col items-center">
        {/* Hotel Logo */}
        <div className="mb-3 flex justify-center h-10 relative w-[170px]">
          <Image
            src="/hyatt_logo.png"
            alt="Hyatt Regency"
            fill
            className="object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--color-neutral-primary)] mb-1 text-center">
          OTP Verification
        </h2>

        <p className="text-[var(--color-neutral-secondary)] text-sm text-center mb-6 italic">
          Enter the OTP sent to{" "}
          <span className="font-semibold text-slate-800">
            {email
              ? /^\d+$/.test(email)
                ? `+91 ${email}`
                : email
              : "+91 9012029209"}
          </span>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-3 mb-6 w-full justify-center">
          {otp.map((digit, idx) => (
            <div
              key={idx}
              className="relative flex-1 max-w-[70px] h-[54px] rounded-xl border border-[var(--color-box-border)] focus-within:border-2 focus-within:border-[#FF480B] bg-white flex items-center justify-center transition-all"
            >
              <input
                ref={otpRefs[idx]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                placeholder="0"
                className="w-full h-full rounded-xl text-center text-sm text-[var(--color-neutral-primary)] outline-none bg-transparent"
                value={digit}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9]/g, "");
                  const newOtp = [...otp];
                  newOtp[idx] = val;
                  setOtp(newOtp);
                  if (val && idx < 3) otpRefs[idx + 1].current?.focus();
                }}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                    otpRefs[idx - 1].current?.focus();
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* VERIFY Button */}
        <button
          type="button"
          disabled={isDisabled}
          onClick={handleVerify}
          className={`w-full h-12 font-semibold text-base rounded-xl transition-all flex items-center justify-center gap-2 mb-4 ${
            !isDisabled
              ? "bg-[#FF480B] border-[#FF480B] text-white active:bg-[#e03d06] cursor-pointer"
              : "bg-[#eff1f0] border-[#e0e3e1] text-[#c1c7c4] cursor-not-allowed"
          }`}
        >
          <span className="uppercase">verify</span>
          <Icon name="arrow_right" className="w-5 h-5" />
        </button>

        {/* BACK Button */}
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-[var(--color-neutral-secondary)] hover:text-slate-900 transition-colors uppercase tracking-wider py-1 mb-5 cursor-pointer"
        >
          back
        </button>

        {/* Resend */}
        <div className="text-xs text-[var(--color-neutral-tertiary)] font-medium text-center mb-2">
          <span>Don’t receive the OTP? </span>
          <button
            type="button"
            onClick={() => {
              setOtp(["", "", "", ""]);
              if (onResend) onResend();
            }}
            className="text-[#FF3333] font-semibold hover:underline cursor-pointer uppercase ml-1"
          >
            resend
          </button>
        </div>
      </div>
    </div>
  );
}
