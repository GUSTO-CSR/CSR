"use client";
import path from "path";
import React, { useEffect, useRef, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import P2 from "@/public/images/P2.jpg";
import P1 from "@/public/images/P1.jpg";
import P3 from "@/public/images/P3.png";

let count = 0;
let slideInterval: ReturnType<typeof setInterval>;
const slides = [
  {
    url: P1.src,
  },
  {
    url: P2.src,
  },
  {
    url: P3.src,
  },
];
export default function Carousal() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef<any>();

  useEffect(() => {
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % slides.length;
    setCurrentIndex(count);
  };
  const handleOnPrevClick = () => {
    const productsLength = slides.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
  };
  const goToSlide = (slideIndex: number) => {
    count = slideIndex;
    setCurrentIndex(slideIndex);
  };

  return (
    <section>
      <div
        ref={slideRef}
        className="max-w-[1920px] lg:h-[550px] md:h-[450px] xl:h-[580px] h-[280px] w-11/12 m-auto lg:mt-28 md:mt-24 xl:mt-30 mt-20  relative group"
      >
        <div
          style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
          className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
        ></div>

        <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
          <button
            aria-label="Previous Slide"
            className="bg-content dark:bg-background text-background dark:text-content p-1 rounded-full bg-opacity-50 dark:bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
            onClick={handleOnPrevClick}
          >
            <BsChevronCompactLeft size={30} />
          </button>
          <button
            aria-label="Next Slide"
            className="bg-content dark:bg-background text-background dark:text-content p-1 rounded-full bg-opacity-50 dark:bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
            onClick={handleOnNextClick}
          >
            <BsChevronCompactRight size={30} />
          </button>
        </div>
        <div className="flex top-4 justify-center mt-1">
          {slides.map((_, slideIndex) => (
            <div
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`text-2xl cursor-pointer ${
                slideIndex === currentIndex
                  ? "text-main"
                  : "text-primary dark:text-secondary"
              }`}
            >
              <RxDotFilled />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
