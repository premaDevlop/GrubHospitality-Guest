"use client";

import { useState, useRef } from "react";

export default function OtpVerifyModal({ email, onBack, onVerify, onResend }) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const isDisabled = otp.join("").length !== 4;

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) return;

    if (otpString === "1234") {
      setErrorMessage("");
      if (onVerify) {
        onVerify(otpString);
      }
    } else {
      setErrorMessage("Invalid OTP. Please enter 1234");
    }
  };

  return (
    <div className="w-full flex-1 bg-white rounded-t-3xl -mt-5 z-30 px-6 pt-5 pb-6 flex flex-col justify-between items-center shadow-lg overflow-y-auto">
      <div className="w-full flex flex-col items-center">
        {/* Hyatt Hotel Logo */}
        <div className="mb-3 flex justify-center h-10 relative w-[170px]">
          <img
            src="/hyatt_logo.png"
            alt="Hyatt Regency"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--color-neutral-primary)] mb-1 text-center">
          OTP Verification
        </h2>
        <p className="text-[var(--color-neutral-secondary)] text-sm text-center mb-6">
          Enter the OTP sent to <span className="font-semibold text-slate-800">{email || "+91 9012029209"}</span>
        </p>

        {/* 4-Digit Inputs */}
        <div className="flex gap-3 mb-4 w-full justify-center">
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
                className="w-full h-full rounded-xl text-center text-xl font-bold text-[var(--color-neutral-primary)] outline-none bg-transparent"
                value={digit}
                onChange={(e) => {
                  setErrorMessage("");
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

        {/* Error message */}
        {errorMessage && (
          <p className="text-xs text-red-600 font-medium mb-3 text-center">
            {errorMessage}
          </p>
        )}

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
          <span>VERIFY</span>
          <span className="text-lg">›</span>
        </button>

        {/* BACK Button */}
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-semibold text-[var(--color-neutral-secondary)] hover:text-slate-900 transition-colors uppercase tracking-wider py-1 mb-5 cursor-pointer"
        >
          BACK
        </button>

        {/* Don't receive OTP? RESEND */}
        <div className="text-xs text-[var(--color-neutral-tertiary)] font-medium text-center mb-2">
          <span>Don’t receive the OTP? </span>
          <button
            type="button"
            onClick={() => {
              setOtp(["", "", "", ""]);
              setErrorMessage("");
              if (onResend) onResend();
            }}
            className="text-[#FF3333] font-semibold hover:underline cursor-pointer uppercase ml-1"
          >
            RESEND
          </button>
        </div>
      </div>
    </div>
  );
}
