"use client";

import toast from "react-hot-toast";
import React from "react";

export function showOtpErrorToast(
  title = "Invalid OTP",
  message = "Please enter a valid OTP and try again."
) {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } w-full max-w-[340px] sm:max-w-[540px] sm:w-[500px] md:w-[540px] bg-[#FFD8CB] border border-[#FF3333] rounded-2xl p-3.5 sm:p-4 shadow-lg flex items-start gap-3.5 relative z-[9999] mx-auto`}
      >
        <img
          src="/otp_icons/invalid_otp.svg"
          alt="Error"
          className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5"
        />
        <div className="flex flex-col text-left flex-1">
          <h4 className="font-bold text-[15px] sm:text-base leading-tight text-[#DC2807]">
            {title}
          </h4>
          <p className="text-xs sm:text-sm font-normal text-[#AD260B] mt-0.5 leading-snug">
            {message}
          </p>
        </div>
      </div>
    ),
    { position: "top-center", duration: 3000 }
  );
}

export function showOtpSuccessToast(
  title = "OTP Verified",
  message = "You have successfully signed in."
) {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } w-full max-w-[340px] sm:max-w-[540px] sm:w-[500px] md:w-[540px] bg-[#DCECD4] border border-[#479F29] rounded-2xl p-3.5 sm:p-4 shadow-lg flex items-start gap-3.5 relative z-[9999] mx-auto`}
      >
        <img
          src="/otp_icons/verified_otp.svg"
          alt="Success"
          className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 mt-0.5"
        />
        <div className="flex flex-col text-left flex-1">
          <h4 className="font-bold text-[15px] sm:text-base leading-tight text-[#3B7D24]">
            {title}
          </h4>
          <p className="text-xs sm:text-sm font-normal text-[#3B7D24] mt-0.5 leading-snug">
            {message}
          </p>
        </div>
      </div>
    ),
    { position: "top-center", duration: 2500 }
  );
}

export function showError(message) {
  showOtpErrorToast("Error", message);
}

export function showSuccess(title, message) {
  showOtpSuccessToast(title, message);
}