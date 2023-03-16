import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";
import { useTheme } from "next-themes";

const Footer = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={`${
        theme === "dark" ? "bg-[#121212]" : "bg-zinc-300"
      } border-top border-t-gray-900  py-6`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div
          className={`${
            theme === "dark" ? "text-zinc-400" : " text-black"
          } text-sm`}
        >
          &copy; Alexander 2022. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <FaFacebook
            className={`${
              theme === "dark" ? "text-zinc-400" : " text-black"
            } text-lg hover:text-gray-500 transition-colors duration-300`}
          />
          <AiFillTwitterCircle
            className={`${
              theme === "dark" ? "text-zinc-400" : " text-black"
            } text-lg hover:text-gray-500 transition-colors duration-300`}
          />
          <AiFillInstagram
            className={`${
              theme === "dark" ? "text-zinc-400" : " text-black"
            } text-lg hover:text-gray-500 transition-colors duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
