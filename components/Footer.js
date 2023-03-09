import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { AiFillTwitterCircle, AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="bg-[#2A292C] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-white text-sm">
          &copy; Alexander 2022. All rights reserved.
        </div>
        <div className="flex space-x-4">
          <FaFacebook className="text-white text-lg hover:text-gray-500 transition-colors duration-300" />
          <AiFillTwitterCircle className="text-white text-lg hover:text-gray-500 transition-colors duration-300" />
          <AiFillInstagram className="text-white text-lg hover:text-gray-500 transition-colors duration-300" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
