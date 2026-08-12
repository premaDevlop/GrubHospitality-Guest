"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ProfileEditView({ user, avatarUrl, onSaveAvatar, onCancel }) {
  const [previewUrl, setPreviewUrl] = useState(avatarUrl || null);
  const fileInputRef = useRef(null);

  const guestName = user?.guestName || "Parveen Kumar";
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
      {/* Hidden File Input for Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      <div className="flex flex-col gap-6 w-full items-center">
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FF480B] flex items-center justify-center text-white text-2xl font-bold relative overflow-hidden shadow-sm">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt={guestName}
                fill
                className="object-cover"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 text-xs font-bold text-[#FF480B] hover:text-[#e03d07] uppercase transition-colors cursor-pointer"
          >
            <Image
              src="/profile/upload.svg"
              alt="Upload"
              width={14}
              height={14}
              className="w-3.5 h-3.5 object-contain"
            />
            <span>upload image</span>
          </button>
        </div>

        <div className="w-full bg-white rounded-2xl p-5 shadow-xs border border-[#e0e3e1] flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#445048]">
              Name
            </label>
            <input
              type="text"
              readOnly
              disabled
              value={guestName}
              className="w-full h-11 px-4 bg-slate-50 border border-[#e0e3e1] rounded-xl text-sm font-medium text-[#6b7971] cursor-not-allowed outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#445048]">
              Mobile
            </label>
            <input
              type="text"
              readOnly
              disabled
              value={mobile}
              className="w-full h-11 px-4 bg-slate-50 border border-[#e0e3e1] rounded-xl text-sm font-medium text-[#6b7971] cursor-not-allowed outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#445048]">
              Email
            </label>
            <input
              type="email"
              readOnly
              disabled
              value={email}
              className="w-full h-11 px-4 bg-slate-50 border border-[#e0e3e1] rounded-xl text-sm font-medium text-[#6b7971] cursor-not-allowed outline-none"
            />
          </div>
        </div>
      </div>

      {/*  Profile Button */}
      <div className="w-full pt-6">
        <button
          type="button"
          onClick={handleUpdate}
          className="w-full h-12 bg-[#FF480B] hover:bg-[#e03d07] text-white rounded-xl text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
        >
          update profile
        </button>
      </div>
    </div>
  );
}
