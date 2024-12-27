"use client";
import ThemeSwitch from "../app/themes/ThemeSwitch"; // Adjust the path based on your project structure
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

import whiteLogo from "@/public/images/blue_csr_logo.png";
import blackLogo from "@/public/images/white_csr_logo.png";
import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";

export default function Footer() {
  const currentRoute = usePathname();

  let Links = [
    { name: "Home", link: "/" },
    { name: "Events", link: "/events" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  let [open, setOpen] = useState(false);
  const { resolvedTheme, setTheme, theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (theme !== undefined) {
      setIsLoading(false);
    }
  }, [theme]);

  if (isLoading) {
    return <div></div>; // Or any loading indicator
  }

  const logo = resolvedTheme === "light" ? whiteLogo : blackLogo;
  return (
    <footer className="bg-primary dark:bg-secondary w-11/12 m-auto rounded-xl shadow my-8">
      <div className="w-full mx-auto p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <a
              href="https://www.facebook.com/profile.php?id=100090924746210&mibextid=ZbWKwL"
              className="flex items-center"
            >
              <Image
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 cursor-pointer mb-2 mr-2"
                src={logo}
                alt="Loading Light/Dark Toggle"
                priority={true}
                title="Loading Light/Dark Toggle"
              />
              <h1 className="font-bold text-lg md:text-xl lg:text-2xl">
                GUSTO CSR Program
              </h1>
            </a>
            <h2 className="font-medium text-sm md:text-base lg:text-lg">
              Helps Other For Better Unity
            </h2>
          </div>
          <div className="flex flex-row items-start sm:items-center gap-6">
            <div>
              <h2 className="font-bold text-sm md:text-base lg:text-lg">
                Donation
              </h2>
              <div className="text-xs md:text-sm lg:text-base mt-1.5">
                <p>
                  <a href="#">Previous Events</a>
                </p>
                <p>
                  <a href="#">Upcoming Events</a>
                </p>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-sm md:text-base lg:text-lg">
                Help
              </h2>
              <div className="text-xs md:text-sm lg:text-base mt-1.5">
                <p>
                  <a href="#">FAQs</a>
                </p>
                <p>
                  <a href="#">Privacy Policy</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-secondary dark:border-primary my-5" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <span className="block text-xs md:text-sm">
              © 2024{" "}
              <a
                href="https://www.facebook.com/profile.php?id=100090924746210&mibextid=ZbWKwL"
                className="hover:underline"
              >
                GUSTO CSR Program
              </a>
            </span>
            <span className="block text-xs">
              Developer:{" "}
              <a
                href="https://github.com/Aung-myat-min"
                className="hover:underline"
              >
                Aung Myat Min
              </a>{" "}
              &{" "}
              <a
                href="https://github.com/PhyoMinKhant-Xem"
                className="hover:underline"
              >
                Phyo Min Khant
              </a>
            </span>
          </div>

          <div className="flex gap-3">
            <div className="border border-black dark:border-white px-3 py-2 rounded-full flex items-center">
              <a
                href="#"
                className="flex items-center text-xs md:text-sm lg:text-base"
              >
                <FaFacebookF className="mr-2" />
                Facebook
              </a>
            </div>
            <div className="border border-black dark:border-white ps-3 pe-1 py-1 rounded-full flex items-center">
              <a
                href="#"
                className="flex items-center text-xs md:text-sm lg:text-base"
              >
                Contact
                <div className="ml-2 p-2 bg-main rounded-full text-white text-xs md:text-sm lg:text-base">
                  <FiArrowUpRight />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
