"use client";

import { forwardRef } from "react";

const Input = forwardRef(({ className = "", isFocused, type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`outline-none border bg-white ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
export default Input;
