"use client";

import { useState } from "react";
import Input from "@/component/ui/Input";
import Icon from "@/component/ui/Icon";

export default function OtpLoginModal({ onNext }) {
  const [value, setValue] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const handleInputChange = (e) => {
    let val = e.target.value;

    // If input is purely numeric (not an email), cap at max 10 digits
    if (!val.includes("@") && /^\d+$/.test(val)) {
      if (val.length > 10) {
        val = val.slice(0, 10);
      }
    }
    setValue(val);
  };

  // Valid email check
  const isEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  // Valid exactly 10-digit mobile number check
  const isMobile = (val) => /^\d{10}$/.test(val);

  const isValid = value && (isEmail(value.trim()) || isMobile(value.trim()));

  const handleGetOtp = (e) => {
    if (e) e.preventDefault();
    if (isValid && onNext) {
      onNext(value.trim());
    }
  };

  return (
    <form
      onSubmit={handleGetOtp}
      className="w-full flex-1 bg-white rounded-t-3xl -mt-5 z-30 px-6 pt-5 pb-6 flex flex-col justify-between items-center shadow-lg overflow-y-auto"
    >
      <div className="w-full flex flex-col items-center">
        {/* Hyatt Hotel Logo */}
        <div className="mb-3 flex justify-center h-10 relative w-[170px]">
          <img
            src="/hyatt_logo.png"
            alt="Hyatt Regency"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Title & Subtitle */}
        <h2 className="text-xl font-bold text-[var(--color-neutral-primary)] mb-1 text-center">
          Welcome to Hyatt Regency
        </h2>
        <p className="text-[var(--color-neutral-secondary)] text-sm text-center mb-5">
          Enter your mobile number or email to continue.
        </p>

        {/* Mobile / Email Input */}
        <div className="relative w-full mb-4">
          <Input
            type="text"
            placeholder="Mobile number or email"
            value={value}
            onChange={handleInputChange}
            maxLength={value.includes("@") ? 100 : 10}
            className="w-full pl-12 pr-4 h-12 text-base rounded-xl text-[var(--color-neutral-secondary)] placeholder:text-[var(--color-neutral-light)] transition-all duration-200 border border-[var(--color-box-border)] focus:border-[var(--color-brand-default)]"
            isFocused={focusedInput === "email"}
            onFocus={() => setFocusedInput("email")}
            onBlur={() => setFocusedInput(null)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-neutral-light)] pointer-events-none">
            <Icon name="login_user" className="h-5 w-5" />
          </span>
        </div>

        {/* GET OTP Button */}
        <button
          type="button"
          disabled={!isValid}
          onClick={handleGetOtp}
          className={`w-full h-12 text-base font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 mb-4 ${
            isValid
              ? "bg-[#FF480B] border-[#FF480B] text-white active:bg-[#e03d06] cursor-pointer"
              : "bg-[#eff1f0] border-[#e0e3e1] text-[#c1c7c4] cursor-not-allowed"
          }`}
        >
          <span>GET OTP</span>
          <span className="text-lg">›</span>
        </button>

        {/* OR Divider */}
        <div className="relative w-full flex items-center justify-center mb-4">
          <div className="border-t border-[var(--color-box-border)] w-full" />
          <span className="absolute bg-white px-3 text-xs text-[var(--color-neutral-tertiary)] uppercase tracking-wider font-medium">
            OR
          </span>
        </div>

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={() => {}}
          className="w-full h-12 rounded-xl border border-[var(--color-box-border)] bg-white text-[var(--color-neutral-secondary)] font-medium text-sm flex items-center justify-center gap-3 active:bg-slate-50 transition-all cursor-pointer mb-4"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          CONTINUE WITH GOOGLE
        </button>
      </div>

      {/* Footer Links */}
      <div className="flex items-center gap-4 text-xs text-[var(--color-neutral-tertiary)] font-medium mt-2 mb-2">
        <a href="#" className="hover:underline">
          PRIVACY POLICY
        </a>
        <span>|</span>
        <a href="#" className="hover:underline">
          TERMS OF SERVICE
        </a>
      </div>
    </form>
  );
}
