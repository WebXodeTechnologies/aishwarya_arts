import React from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import ForgotPasswordForm from "./ForgotPasswordForm"; // Or keep your stateful form logic cleanly separated

// Strict crawl hygiene for authentication security
export const metadata = {
  metadataBase: new URL("https://www.aishwaryaarts.com"),
  title: "Forgot Password | Aishwarya Arts",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] font-outfit px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-amber-50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-zinc-100 rounded-full blur-3xl opacity-60"></div>

      <main className="w-full max-w-md z-10">
        {/* Back Link */}
        <Link 
          href="/login" 
          className="flex items-center gap-2 text-zinc-800 hover:text-amber-800 transition-colors mb-8 group w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium uppercase tracking-widest">Back to Login</span>
        </Link>

        <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-zinc-100">
          <div className="text-center mb-10">
            {/* Semantic H1 heading for accessibility and crawler parsing */}
            <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 mb-3 tracking-tight font-cinzel">
              Forgot Password?
            </h1>
            <p className="text-zinc-800 text-sm leading-relaxed px-4">
              Don&apos;t worry! Enter your email below and we&apos;ll send you a link to reset your account access.
            </p>
          </div>

          <ForgotPasswordForm />

          <div className="mt-10 pt-8 border-t border-zinc-50 text-center">
            <p className="text-zinc-800 text-xs uppercase tracking-widest font-medium">
              Aishwarya Arts &bull; Premium Tanjore Gallery
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}