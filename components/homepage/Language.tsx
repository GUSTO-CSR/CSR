"use client";
import { useState } from "react";
import Image from "next/legacy/image";
import EN from "@/public/images/en.png";
import MM from "@/public/images/mm.png";

export default function LanguageToggle() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "my" : "en"));
  };

  return (
    <div className="flex items-center ">
      <button
        onClick={toggleLanguage}
        className={`relative inline-flex items-center w-20  py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          language === "en"
            ? "bg-indigo-600 text-white"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        <span
          className={`absolute left-0 w-1/2 h-full rounded-full transition-transform duration-300 ${
            language === "en"
              ? "translate-x-0 bg-indigo-500"
              : "translate-x-full bg-indigo-600"
          }`}
        ></span>

        <span className="z-10 transition-all duration-300 w-1/2 flex justify-center">
          <Image
            src={EN}
            alt="English"
            className={`w-4 h-4 ${
              language === "en" ? "opacity-100" : "opacity-50"
            }`}
          />
        </span>
        <span className="z-10 transition-all duration-300 w-1/2 flex justify-center">
          <Image
            src={MM}
            alt="Burmese"
            className={`w-4 h-4 ${
              language === "my" ? "opacity-100" : "opacity-50"
            }`}
          />
        </span>
      </button>
    </div>
  );
}
