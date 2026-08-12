"use client";

import { useState } from "react";
import Image from "next/image";
import CategoryCard from "./CategoryCard";
import CategoryMenu from "./CategoryMenu";
import MenuItemCard from "./MenuItemCard";

export default function MenuList({
  restaurant = null,
  menuData = [],
  categories = [],
  activeCategory = "",
  onSelectCategory,
  onMenuItemClick,
  onAddItem,
}) {
  const [expandedCategories, setExpandedCategories] = useState(() => {
    const initial = {};
    menuData.forEach((cat, index) => {
      initial[cat.id] = index === 0;
    });
    return initial;
  });

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="w-full flex flex-col gap-[var(--gp-space-xl)]">
      {menuData.map((category, index) => (
        <div
          key={category.id}
          id={`category-${category.id}`}
          className="w-full flex flex-col scroll-mt-[24px]"
        >
          <CategoryCard
            title={category.name}
            description={category.description}
            image={category.image}
            isExpanded={expandedCategories[category.id]}
            onToggle={() => toggleCategory(category.id)}
            action={
              index === 0 ? (
                <CategoryMenu
                  categories={categories}
                  activeCategory={activeCategory}
                  onSelectCategory={onSelectCategory}
                />
              ) : null
            }
          />

          {expandedCategories[category.id] && (
            <>
              <div className="w-full flex justify-center px-[16px]">
                <Image
                  src="/kitchen/divider.png"
                  alt="divider"
                  width={380}
                  height={1}
                  className="w-full h-auto"
                />
              </div>

              <div className="w-full flex flex-col">
                {category.items?.map((item, itemIndex) => (
                  <div key={item.id} className="w-full flex flex-col">
                    <MenuItemCard
                      restaurant={restaurant}
                      item={item}
                      name={item.name}
                      description={item.description}
                      rating={item.rating}
                      price={item.price}
                      isVeg={item.isVeg}
                      image={item.image}
                      onAdd={() => onAddItem?.(item)}
                      onClick={() => onMenuItemClick?.(item)}
                    />
                    {itemIndex < category.items.length - 1 && (
                      <div className="w-full flex justify-center px-[16px]">
                        <Image
                          src="/kitchen/divider.png"
                          alt="divider"
                          width={380}
                          height={1}
                          className="w-full h-auto"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
