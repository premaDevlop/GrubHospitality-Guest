"use client";

export default function Modal({ open, onClose, children, width = "w-[554px] max-w-full", height = "h-auto" }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div
        className={`bg-white rounded-2xl p-6 relative shadow-xl ${width} ${height} w-full transition-all duration-200 overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
}
