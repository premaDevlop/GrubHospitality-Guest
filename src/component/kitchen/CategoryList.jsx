"use client";

export default function CategoryList({
  categories = [],
  activeCategory = "",
  onSelectCategory,
}) {
  return (
    <div className="w-full flex flex-col bg-white rounded-[var(--gp-radius-base)] border border-[var(--gp-color-border-neutral)] overflow-hidden">
      {categories.map((category, index) => (
        <button
          key={category.id || index}
          onClick={() => onSelectCategory?.(category.id)}
          className={`w-full flex items-center justify-between px-[var(--gp-padding-l)] py-[var(--gp-padding-l)] cursor-pointer transition-colors ${
            activeCategory === category.id
              ? "bg-[var(--gp-color-bg-brand-secondary)]"
              : "bg-white hover:bg-[var(--gp-color-bg-neutral-tertiary)]"
          } ${
            index < categories.length - 1
              ? "border-b border-[var(--gp-color-border-neutral)]"
              : ""
          }`}
        >
          <span
            className={`text-[16px] font-medium ${
              activeCategory === category.id
                ? "text-[var(--gp-color-brand-primary)]"
                : "text-[var(--gp-color-text-neutral-primary)]"
            }`}
          >
            {category.name}
          </span>
          <span className="text-[14px] text-[var(--gp-color-text-neutral-tertiary)]">
            {category.count}
          </span>
        </button>
      ))}
    </div>
  );
}
