"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ProfileEditView({ user, avatarUrl, onSaveAvatar, onCancel }) {
  const [previewUrl, setPreviewUrl] = useState(avatarUrl || null);
  const fileInputRef = useRef(null);

  const name = user?.name || user?.guestName || "John Doe";
  const mobile = user?.mobile || "+91 95604 34587";
  const email = user?.email || "johndoe@gmail.com";
  const initials = user?.avatarInitials || "RK";

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (onSaveAvatar) {
      onSaveAvatar(previewUrl);
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col justify-between pt-2 pb-6 px-1">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col gap-6 w-full items-center">
        <div className="flex flex-col items-center gap-2 pt-2">
          <div className="w-[107px] h-[107px] rounded-full bg-[#FF4848] border border-white flex items-center justify-center text-white text-[28px] font-semibold leading-[36px] relative overflow-hidden shadow-xs">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-white font-semibold text-[28px] leading-[36px]">
                {initials}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center justify-center gap-1 h-[20px] text-xs font-medium text-[#FF3333] uppercase cursor-pointer pt-1"
          >
            <Image
              src="/profile/upload.svg"
              alt="Upload"
              width={16}
              height={16}
              className="w-4 h-4 object-contain"
            />
            <span className="text-[14px] leading-[16px] font-medium tracking-normal text-[#FF3333]">
              UPLOAD IMAGE
            </span>
          </button>
        </div>

        <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#E0E3E1] flex flex-col gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label className="text-[16px] leading-[24px] font-normal text-[#37493F]">
              Name
            </label>
            <div className="w-full h-[44px] px-4 py-3 bg-white border border-[#E0E3E1] rounded-lg flex items-center">
              <input
                type="text"
                readOnly
                disabled
                value={name}
                className="w-full bg-transparent text-[14px] leading-[20px] font-normal text-[#6B7971] outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[16px] leading-[24px] font-normal text-[#37493F]">
              Mobile
            </label>
            <div className="w-full h-[44px] px-4 py-3 bg-white border border-[#E0E3E1] rounded-lg flex items-center">
              <input
                type="text"
                readOnly
                disabled
                value={mobile}
                className="w-full bg-transparent text-[14px] leading-[20px] font-normal text-[#6B7971] outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-[16px] leading-[24px] font-normal text-[#37493F]">
              Email
            </label>
            <div className="w-full h-[44px] px-4 py-3 bg-white border border-[#E0E3E1] rounded-lg flex items-center">
              <input
                type="email"
                readOnly
                disabled
                value={email}
                className="w-full bg-transparent text-[14px] leading-[20px] font-normal text-[#6B7971] outline-none cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Update Profile  */}
      <div className="w-full pt-6">
        <button
          type="button"
          onClick={handleUpdate}
          className="w-full h-[48px] bg-[#FF4848] border border-[#FF3333] text-white rounded-lg text-[18px] leading-[24px] font-medium uppercase tracking-normal cursor-pointer shadow-xs"
        >
          update profile
        </button>
      </div>
    </div>
  );
}
