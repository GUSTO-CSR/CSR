"use client";
import { useState, useEffect } from "react";

export default function Members() {
  const [displayedAmount, setDisplayedAmount] = useState(0);

  // Animation to increment the number on load
  useEffect(() => {
    let start = 0;
    const end = 12000000;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 12); // Adjust based on 16ms per frame
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
  }, []);

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center text-center p-5  transition-colors duration-300">
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
