"use client";

export default function ToggleSwitch({ isOn, onToggle, label }) {
  return (
    <div className="flex items-center gap-1.5 shrink-0">
      {label && (
        <span className="text-[11px] font-bold text-[#2e7d32] flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-[#2e7d32] inline-block" />
          {label}
        </span>
      )}
      <button
        type="button"
        onClick={onToggle}
        className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors cursor-pointer ${
          isOn ? "bg-[#2e7d32]" : "bg-slate-300"
        }`}
        aria-label={label || "Toggle Switch"}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
            isOn ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
