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
    <footer className="bg-primary dark:bg-secondary w-11/12 m-auto rounded-xl shadow  my-8">
      <div className="w-full  mx-auto p-5 ">
        <div className="lg:flex lg:items-center lg:justify-between md:flex md:items-center md:justify-between block">
          <div className="lg:ms-5 md:ms-3">
            <a
              href="https://www.facebook.com/profile.php?id=100090924746210&mibextid=ZbWKwL"
              className="flex items-center  "
            >
              <Image
                className=" lg:w-12 lg:h-12 md:w-10 md:h-10 w-8 h-8 cursor-pointer mb-2 me-2"
                src={logo}
                alt="Loading Light/Dark Toggle"
                priority={true}
                title="Loading Light/Dark Toggle"
              />
              <h1 className="font-bold text-lg">GUSTO CSR Program</h1>
            </a>
            <h2 className=" font-medium ">Helps Other For Better Unity</h2>
          </div>
          <div className="flex items-center lg:pe-5 md:pe-3">
            <div className="me-2">
              <h2 className="font-bold">Donation</h2>
              <div className="text-sm mt-1.5">
                <p>
                  <a href="#">Previous Events</a>
                </p>
                <p>
                  <a href="#">Upcoming Events</a>
                </p>
              </div>
            </div>
            <div className="ms-2">
              <h2 className="font-bold">Help</h2>
              <div className="text-sm mt-1.5">
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

        <hr className=" border-secondary sm:mx-auto dark:border-primary my-5 " />
        <div className="flex justify-between lg:ms-5 md:ms-3 ">
          <div>
            <span className="block text-sm  pb-1">
              © 2024{" "}
              <a
                href="https://www.facebook.com/profile.php?id=100090924746210&mibextid=ZbWKwL"
                className="hover:underline"
              >
                GUSTO CSR Program
              </a>
            </span>
            <span className="block text-xs  ">
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

          <div className="lg:pe-5 md:pe-3 flex items-center">
            <div className=" border border-black dark:border-white px-3 py-2 rounded-full me-2">
              <a href="#" className="flex items-center">
                <FaFacebookF className="me-2" />
                Facebook
              </a>
            </div>
            <div className=" border border-black dark:border-white ps-3 pe-1 py-1  rounded-full">
              <a href="#" className="flex items-center">
                Contact
                <div className="ms-2 p-2 bg-main rounded-full text-white text-sm">
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
