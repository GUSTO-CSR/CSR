"use client";
import ThemeSwitch from "@/app/themes/ThemeSwitch";
import LanguageToggle from "@/components/homepage/Language";
import { useRouter } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";

export default function EventLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <div className="relative z-50">
      <nav className="fixed w-full top-0 left-0 z-[2] transition-transform duration-300">
        <div className="flex justify-between items-center w-full lg:h-20 md:h-16 h-14 m-auto bg-primary dark:bg-secondary relative">
          <div className="flex items-center lg:ms-5 md:ms-3 font-semibold px-3 py-1 rounded duration-500 md:static cursor-pointer">
            <FaChevronLeft onClick={() => router.back()} />
          </div>
          <div className="flex items-center">
            {" "}
            <LanguageToggle />
            <div className="flex items-center lg:me-5 md:me-3 font-semibold px-3 py-1 rounded duration-500 md:static cursor-pointer">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      </nav>
      {children}
    </div>
  );
}
