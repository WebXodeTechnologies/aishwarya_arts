"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiHeart, FiShoppingCart, FiX } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { usePathname } from "next/navigation";
import { navItems, utilities } from "../HomePage/index";
import LogoMain from "@/public/assets/logo/logosample.png";

const iconMap = { FiSearch, FiHeart, FiShoppingCart };

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname() || ""; // hydration-safe

  return (
    <header className="sticky top-0 z-50 bg-white shadow" role="banner">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <Link href="/" aria-label="Home page">
            <Image
              src={LogoMain}
              alt="WebXode Logo"
              width={100}
              height={100}
              sizes="(max-width: 640px) 60px, (max-width: 1024px) 80px, 100px"
              style={{ width: "auto", height: "auto" }} // maintain aspect ratio
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex space-x-8"
          aria-label="Primary Navigation"
          role="navigation"
        >
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="relative font-medium text-black transition duration-300 transform hover:scale-105 group"
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-[#92080a] transition-all duration-300 ${
                  pathname === item.href ? "w-full" : "w-0"
                } group-hover:w-full`}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Utilities */}
        <div className="hidden lg:flex items-center space-x-4">
          {utilities.map((item, idx) => {
            if (item.type === "icon") {
              const Icon = iconMap[item.icon];
              return (
                <button
                  key={idx}
                  type="button"
                  aria-label={item.label}
                  className="p-2 rounded-md transition transform duration-300 hover:scale-110 hover:text-[#92080a] text-black"
                >
                  <Icon size={24} />
                </button>
              );
            }
            if (item.type === "button") {
              return (
                <Link
                  key={idx}
                  href={item.href}
                  className="px-4 py-2 rounded-md bg-[#92080a] text-white hover:bg-[#910709] transition transform duration-300 hover:scale-105"
                >
                  {item.label}
                </Link>
              );
            }
            return null;
          })}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center">
          <button
            type="button"
            aria-label="Open mobile menu"
            onClick={() => setMobileOpen(true)}
            className="p-4 rounded-md text-black hover:text-[#92080a] transition duration-300"
          >
            <CiMenuFries size={30} />
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ willChange: "transform" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="relative flex items-center justify-center px-4 py-4 border-b border-gray-200">
          {/* Logo */}
          <Link href="/" aria-label="Home page">
            <Image
              src={LogoMain}
              alt="WebXode Logo"
              width={80}
              height={80}
              style={{ width: "auto", height: "auto" }}
            />
          </Link>

          {/* Close Button */}
          <button
            type="button"
            aria-label="Close mobile menu"
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 text-black p-2 rounded-md hover:text-[#92080a] transition duration-300"
          >
            <FiX size={28} />
          </button>
        </div>

        <nav
          className="flex flex-col items-center mt-10 space-y-6 px-4"
          aria-label="Mobile Navigation"
          role="menu"
        >
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              role="menuitem"
              className={`text-black font-medium transition transform duration-300 hover:scale-105 hover:text-[#92080a] ${
                pathname === item.href ? "text-[#92080a]" : ""
              }`}
              onClick={() => setMobileOpen(false)}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile Utilities */}
          <div className="flex space-x-4 mt-6">
            {utilities.map((item, idx) => {
              if (item.type === "icon") {
                const Icon = iconMap[item.icon];
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={item.label}
                    className="p-2 rounded-md transition transform duration-300 hover:scale-110 hover:text-[#92080a] text-black"
                  >
                    <Icon size={24} />
                  </button>
                );
              }
              if (item.type === "button") {
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="px-6 py-3 rounded-md bg-[#92080a] text-white hover:bg-[#910709] transition transform duration-300 hover:scale-105"
                  >
                    {item.label}
                  </Link>
                );
              }
              return null;
            })}
          </div>
        </nav>
      </div>

      {/* Optional overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-white bg-opacity-20 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
