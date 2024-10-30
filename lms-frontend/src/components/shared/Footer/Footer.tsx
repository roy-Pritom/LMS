import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-10 mt-20">
      <div className="container mx-auto">
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-500 pb-6">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Image
              width={150}
              height={150}
              src="/secondary_logo.png"
              alt="Company Logo"
              className="max-w-[150px] mb-4"
            />
            <p className="text-sm lg:text-base">
              Building a future where technology and innovation come together to
              empower individuals and businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-8">
            <ul className="text-sm lg:text-base space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
            </ul>
            <ul className="text-sm lg:text-base space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Copyright Text */}
          <p className="text-xs lg:text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} YourCompany. All Rights Reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-500 hover:text-white"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-500 hover:text-white"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-500 hover:text-white"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="bg-white text-blue-700 p-2 rounded-full hover:bg-blue-500 hover:text-white"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
