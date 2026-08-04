"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    title: "Discover Dining",
    subtitle: "Browse hotel menus and find your favourites.",
    image: "/loginCrousel/Login_Crousel1.jpg",
  },
  {
    id: 2,
    title: "Order with Ease",
    subtitle: "Order now or schedule for later.",
    image: "/loginCrousel/Login_Crousel2.jpg",
  },
  {
    id: 3,
    title: "Fresh to Your Room",
    subtitle: "Track your order and enjoy room delivery.",
    image: "/loginCrousel/Login_Crousel3.jpg",
  },
];

export default function LoginHeader() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      // Swipe left -> Next slide
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    } else if (distance < -40) {
      // Swipe right -> Previous slide
      setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  return (
    <header
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-[220px] xs:h-[240px] sm:h-[260px] overflow-hidden bg-slate-950 flex-shrink-0 select-none cursor-grab active:cursor-grabbing"
    >
      {/* Slide Images */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentSlide ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        </div>
      ))}

      {/* GrubHospitality Red Orbitron Logo */}
      <div className="absolute top-3 left-4 z-20">
        <span
          className="font-medium text-[18px] sm:text-[20px] leading-[120%] tracking-normal"
          style={{ color: "#FF3333", fontFamily: "var(--font-orbitron), sans-serif" }}
        >
          GrubHospitality
        </span>
      </div>

      {/* Slide Text Overlay */}
      <div className="absolute bottom-8 left-4 right-4 z-20 text-white">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight mb-0.5">
          {slides[currentSlide].title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-200 font-light italic">
          {slides[currentSlide].subtitle}
        </p>
      </div>

      {/* Carousel Pagination Dots */}
      <div className="absolute bottom-3 right-4 z-20 flex items-center gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer ${
              index === currentSlide
                ? "w-6 h-2 bg-[#FF3333]"
                : "w-2 h-2 bg-white/70 hover:bg-white"
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </header>
  );
}
