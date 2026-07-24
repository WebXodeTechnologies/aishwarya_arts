"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestSquare } from "react-icons/fa";
import Logo from "../../../public/LOGO.svg";

const Footer = () => {
  return (
    <footer className="text-black px-6 py-10 mt-10 border-t border-gray-100 bg-white" aria-label="Site Footer">
      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* 1. Logo + Description */}
        <div>
          <Link href="/" aria-label="Aishwarya Arts - Home" className="inline-block">
            <Image
              src={Logo}
              alt="Aishwarya Arts Official Logo"
              width={100}
              height={40}
              className="rounded-md p-1 object-contain"
            />
          </Link>
          <div className="space-y-6 mt-4">
            {/* BRAND IDENTITY */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-linear-to-r from-zinc-900 to-amber-600 bg-clip-text text-transparent">
                Aishwarya Arts
              </span>
              {/* Fixed CSS class typo from text-zinc 900 to text-zinc-900 */}
              <span className="text-sm uppercase tracking-wide text-zinc-900 font-semibold mt-1">
                Crafting Tanjore Masterpieces
              </span>
            </div>

            {/* THE MISSION */}
            <p className="text-sm leading-relaxed text-zinc-900 max-w-xs font-normal">
              Every stroke is a story and every leaf is a legacy. We bring the
              16th-century soul of Tamil Nadu to your modern sanctuary.
            </p>

            {/* HERITAGE TAG */}
            <div className="flex items-center gap-3 pt-2">
              <div className="h-px w-8 bg-amber-300" aria-hidden="true"></div>
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-800">
                ESTD. 2000 • Tamil Nadu, India
              </span>
            </div>
          </div>
        </div>

        {/* 2. Quick Links */}
        <nav aria-label="Footer Quick Links">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-amber-700 transition">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-amber-700 transition">About Us</Link>
            </li>
            <li>
              <Link href="/collections" className="hover:text-amber-700 transition">Collections</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-amber-700 transition">Contact</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-amber-700 transition">Blog</Link>
            </li>
          </ul>
        </nav>

        {/* 3. Policies */}
        <nav aria-label="Store Policies">
          <h3 className="text-lg font-semibold mb-3">Policies</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/privacy-policy" className="hover:text-amber-700 transition">Privacy & Cookie Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-amber-700 transition">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-amber-700 transition">Refund & Return Policy</Link>
            </li>
            <li>
              <Link href="/shipping-policy" className="hover:text-amber-700 transition">Shipping & Delivery Policy</Link>
            </li>
            <li>
              <Link href="/cancellation-policy" className="hover:text-amber-700 transition">Cancellation Policy</Link>
            </li>
          </ul>
        </nav>

        {/* 4. Contact Info */}
        <address className="not-italic">
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="mailto:contact.aishwaryaarts@gmail.com"
                className="hover:underline text-amber-800 font-medium"
              >
                contact.aishwaryaarts@gmail.com
              </a>
            </li>
            <li>
              <a href="tel:+917550152764" className="hover:underline">
                +91 7550152764
              </a>
            </li>
            <li>
              <a href="tel:+919655007661" className="hover:underline">
                +91 9655007661
              </a>
            </li>
            <li className="text-zinc-700 pt-1">3/648, Thuraiyur Road, N. Kosavampatti</li>
            <li className="text-zinc-700">Namakkal, Tamil Nadu - 637002</li>
          </ul>
        </address>
      </div>

      {/* Social Links */}
      <div className="flex justify-center items-center py-6 space-x-6 text-2xl border-t border-gray-100 mt-10">
        <a
          href="https://www.facebook.com/profile.php?id=61574363010344"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Aishwarya Arts on Facebook"
          className="hover:text-blue-600 transition"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://www.instagram.com/tanjorepaintings_aishwaryaarts/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Aishwarya Arts on Instagram"
          className="hover:text-pink-600 transition"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.youtube.com/@AishwaryaArts-ofc"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Aishwarya Arts on YouTube"
          className="hover:text-red-600 transition"
        >
          <FaYoutube />
        </a>
        <a
          href="https://pin.it/6CVwoCFwO"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Aishwarya Arts on Pinterest"
          className="hover:text-red-500 transition"
        >
          <FaPinterestSquare />
        </a>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 pt-4 text-center text-sm text-zinc-600">
        <p className="space-x-2">
          <span>© {new Date().getFullYear()} Aishwarya Art Gallery | All Rights Reserved</span>
          <span className="hidden sm:inline">|</span>
          <span className="block sm:inline mt-1 sm:mt-0">
            Developed by{" "}
            <Link
              href="https://webxode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:underline text-black"
            >
              Webxode Technologies
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;