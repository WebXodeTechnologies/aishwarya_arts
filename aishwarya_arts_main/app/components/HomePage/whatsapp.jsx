import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <a
      href="https://wa.me/919655007661?text=Hello%20Aishwarya%20Arts,%20I%20would%20like%20to%20know%20more%20about%20your%20Tanjore%20paintings."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Aishwarya Arts customer support on WhatsApp"
      className="fixed bottom-20 right-6 md:right-10 bg-green-500 hover:bg-green-600 text-white p-3.5 md:p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 flex items-center justify-center focus:outline-hidden focus:ring-4 focus:ring-green-300"
    >
      <FaWhatsapp size={28} aria-hidden="true" />
    </a>
  );
};

export default Whatsapp;