import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utlis";

export default function Button({ children, href, onClick, className = "", color = "gold" }) {
  const baseClasses = `
    px-8 py-4 font-bold rounded-full transition-transform
    focus:outline-none focus:ring-4
  `;

  let colorClasses = "";
  switch (color) {
    case "black":
      colorClasses = `
        bg-black text-white
        hover:bg-amber-400
        shadow-gray-700/50
      `;
      break;

    case "white":
      colorClasses = `
        bg-white text-black
        hover:bg-gray-100
        shadow-gray-200/50
      `;
      break;

    case "gold":
      colorClasses = `
        bg-linear-to-br from-[#d4af37] via-[#f7e488] to-[#b8860b]
        text-black
        font-semibold
        shadow-[0_4px_10px_rgba(212,175,55,0.5)]
        hover:shadow-[0_6px_14px_rgba(212,175,55,0.7)]
        hover:brightness-110
        hover:-translate-y-0.5
        active:translate-y-0
        transition-all duration-300
      `;
      break;

    default:
      colorClasses = "";
  }

  const mergedClasses = cn(baseClasses, colorClasses, className);

  if (href) {
    return (
      <Link
        href={href}
        className={mergedClasses}
        role="button"
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={mergedClasses}
      type="button"
    >
      {children}
    </button>
  );
}
