"use client";

import { useState } from "react";
import Input from "@/component/ui/Input";
import Icon from "@/component/ui/Icon";

export default function OtpLoginModal({ onNext }) {
  const [value, setValue] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  // Email format validation strictly allowing only allowed extensions (.com, .yahoo, .org, .net, .in, .co, .edu, .io)
  const isEmail = (val) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|yahoo|org|net|in|co|edu|io)$/i.test(
      val.trim()
    );
  const isMobile = (val) => /^\d{10}$/.test(val);

  const isValid = value && (isEmail(value.trim()) || isMobile(value.trim()));

  const handleGetOtp = (e) => {
    if (e) e.preventDefault();
    if (isValid && onNext) {
      onNext(value.trim());
    }
  };

  const handleInputChange = (e) => {
    let val = e.target.value;
    if (!val.includes("@") && /^\d+$/.test(val)) {
      if (val.length > 10) {
        val = val.slice(0, 10);
      }
    }
    setValue(val);
  };

  return (
    <form
      onSubmit={handleGetOtp}
      className="w-full flex-1 bg-white rounded-t-xl -mt-5 z-30 px-6 pt-4 pb-5 flex flex-col justify-between items-center shadow-lg overflow-y-auto"
    >
      <div className="w-full flex flex-col items-center">
        {/* Hotel Logo */}
        <div className="mb-2.5 flex justify-center h-10 relative w-[170px]">
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
        <p className="text-[var(--color-neutral-secondary)] text-sm text-center mb-4">
          Enter your mobile number or email to continue.
        </p>

        {/* Mobile / Email Input */}
        <div className="relative w-full mb-3.5">
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

        {/* get otp */}
        <button
          type="button"
          disabled={!isValid}
          onClick={handleGetOtp}
          className={`w-full h-12 text-base font-semibold rounded-xl border transition-all flex items-center justify-center gap-2 mb-3.5 ${
            isValid
              ? "bg-[#FF480B] border-[#FF480B] text-white active:bg-[#e03d06] cursor-pointer"
              : "bg-[#eff1f0] border-[#e0e3e1] text-[#c1c7c4] cursor-not-allowed"
          }`}
        >
          <span className="uppercase">get otp</span>
          <Icon name="arrow_right" className="w-5 h-5" />
        </button>

        {/*  Divider */}
        <div className="relative w-full flex items-center justify-center mb-3.5">
          <div className="border-t border-[var(--color-box-border)] w-full" />
          <span className="absolute bg-white px-1 text-xs text-[var(--color-neutral-tertiary)] uppercase tracking-wider font-medium">
            or
          </span>
        </div>

        <button
          type="button"
          onClick={() => {}}
          className=" text-[var(--color-neutral-tertiary)] my-3 uppercase font-medium text-sm flex items-center justify-center gap-3 cursor-pointer"
        >
          <Icon name="google" className="w-5 h-5" />
          continue with google
        </button>

        {/* Footer */}
        <div className="flex items-center gap-4 text-xs text-[var(--color-neutral-tertiary)] font-medium mt-1 mb-1">
          <a href="#" className="hover:underline uppercase">
            privacy policy
          </a>
          <span>|</span>
          <a href="#" className="hover:underline uppercase">
            terms of services
          </a>
        </div>
      </div>
    </form>
  );
}
