"use client";
import { useState, useEffect, useRef } from "react";

export default function Members() {
  const [displayedAmount, setDisplayedAmount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Animation to increment the number when the section appears on screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once visible
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = 12000000;
      const duration = 2000; // 2 seconds
      const increment = end / (duration / 12);
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setDisplayedAmount(end);
          clearInterval(counter);
        } else {
          setDisplayedAmount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(counter);
    }
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className={`w-full h-screen flex flex-col items-center justify-center text-center p-5 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-medium mb-2 text-gray-700 dark:text-gray-300">
        We Have Already Donated Over
      </h3>
      <h2 className="text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] font-bold text-main transition-all duration-500">
        {displayedAmount.toLocaleString()}+
      </h2>
      <h3 className="text-[18px] sm:text-[20px] md:text-[24px] font-medium mt-2 text-gray-700 dark:text-gray-300">
        To People Who Deserve
      </h3>
      <div className="px-6 py-3 bg-main text-white font-semibold rounded-2xl mt-6 transition-all duration-300">
        <a href="#" className="text-[14px] md:text-[16px]">
          Explore Now!
        </a>
      </div>
    </section>
  );
}
