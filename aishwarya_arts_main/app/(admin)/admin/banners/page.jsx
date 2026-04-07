"use client";
import React, { useState } from "react";
import {
  Upload, Sparkles, Trash2, Save,
  Monitor, Smartphone, Layout,
  CheckCircle2, Clock, Image as ImageIcon
} from "lucide-react";
import { UploadButton } from "@uploadthing/react"; // 🟢 Added this import
import toast from "react-hot-toast";

const BannerManager = () => {
  // 🟢 1. FUNCTIONAL STATE
  const [imageUrl, setImageUrl] = useState("");
  const [link, setLink] = useState("New Collection");
  const [isActive, setIsActive] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // 🟢 2. SAVE LOGIC (The Bridge)
  const handleUpdateCarousel = async () => {
    console.log("🚀 STARTING DB SYNC...");
    console.log("Payload:", { imageUrl, link, isActive });

    if (!imageUrl) return toast.error("Please upload an image first!");

    const loadingToast = toast.loading("Updating Storefront...");
    try {
      const response = await fetch("/api/admin/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl, link, isActive, title: "Hero Banner" }),
      });

      // 🔍 DEBUG: Log the status code
      console.log("📡 Server Status:", response.status);

      const data = await response.json();
      console.log("📦 Server Response Data:", data);

      if (response.ok) {
        toast.success("Homepage Updated!", { id: loadingToast });
      } else {
        console.error("❌ DB Error:", data.error);
        throw new Error(data.error || "Failed to update");
      }
    } catch (error) {
      console.error("🔥 Catch Block Error:", error);
      toast.error("Failed to sync database. Check Console.", { id: loadingToast });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in duration-1000">

      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-zinc-100 pb-8">
        <div>
          <h2 className="text-3xl font-semibold text-zinc-800 tracking-tight">Hero Banners</h2>
          <p className="text-sm text-zinc-800 font-semibold italic tracking-wide mt-1">Storefront Campaign Manager</p>
        </div>
        <div className="flex items-center gap-4">
          {/* 🟢 Added onClick */}
          <button onClick={handleUpdateCarousel} className="px-8 py-3 bg-zinc-800 text-white rounded-2xl font-semibold text-sm uppercase tracking-widest shadow-xl flex items-center gap-2 hover:bg-amber-600 transition-all">
            <Save size={16} /> Update Carousel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">

        {/* LEFT: UPLOAD & PREVIEW */}
        <div className="xl:col-span-8 space-y-10">

          <section className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-800 uppercase tracking-widest flex items-center gap-2">
                <ImageIcon size={16} className="text-amber-600" /> New Poster Upload
              </h3>
              <div className="flex gap-2">
                <div className="p-2 bg-zinc-100 rounded-lg text-zinc-800"><Monitor size={14} /></div>
                <div className="p-2 bg-zinc-100 rounded-lg text-zinc-800"><Smartphone size={14} /></div>
              </div>
            </div>

            {/* 🟢 DYNAMIC PREVIEW BOX (Keeping your exact UI) */}
            <div className="aspect-21/9 w-full bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-[2.5rem] flex flex-col items-center justify-center group hover:border-amber-400 hover:bg-amber-50/30 transition-all cursor-pointer overflow-hidden relative">
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button onClick={() => setImageUrl("")} className="absolute top-5 right-5 p-3 bg-white text-red-600 rounded-xl shadow-lg hover:scale-110 transition-transform">
                    <Trash2 size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center group-hover:scale-110 transition-transform duration-500">
                  {/* 🟢 Inserted UploadButton here */}
                  <UploadButton
                    endpoint="imageUploader"
                    // 🟢 1. This triggers the "Uploading..." text immediately
                    onUploadBegin={() => {
                      setIsUploading(true);

                    }}
                    // 🟢 2. No need for onBeforeUploadBegin unless you are doing complex renaming
                    onClientUploadComplete={(res) => {
                      

                      // UploadThing returns an array. Check if it exists and has the url.
                      if (res && res.length > 0) {
                        const newUrl = res[0].url;
                        setImageUrl(newUrl); // This updates your preview <img>
                        setIsUploading(false);
                        toast.success("Masterpiece Uploaded!");
                      }
                    }}
                    onUploadError={(error) => {
                      console.error("❌ UT Error:", error);
                      toast.error(`Upload Failed: ${error.message}`);
                      setIsUploading(false);
                    }}
                    appearance={{
                      button: "bg-transparent text-zinc-800 text-sm font-bold uppercase tracking-widest border-none p-0 h-auto cursor-pointer",
                      allowedContent: "hidden"
                    }}
                    content={{
                      button({ ready, isUploading: componentIsUploading }) {
                        // 🟢 3. Use both the internal state and your local state for accuracy
                        if (isUploading || componentIsUploading) return (
                          <div className="flex flex-col items-center animate-pulse">
                            <Clock className="text-amber-500 mb-4 animate-spin" size={40} />
                            <p>Processing Masterpiece...</p>
                          </div>
                        );

                        return (
                          <div className="flex flex-col items-center">
                            <Upload className="text-zinc-300 group-hover:text-amber-500 mb-4" size={40} />
                            <p>Upload Image</p>
                          </div>
                        );
                      }
                    }}
                  />
                  <p className="text-[12px] text-zinc-800 mt-2 font-medium italic">Recommended: 1920x800px (Desktop Wide)</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* RIGHT: SETTINGS */}
        <div className="xl:col-span-4 space-y-8">

          <section className="bg-white rounded-[3.5rem] p-10 shadow-2xl text-white space-y-10 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-amber-500 rounded-full blur-[60px] opacity-20" />

            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-500"><Sparkles size={18} /></div>
              <h3 className="text-sm text-black font-semibold uppercase tracking-[0.2em]">Banner Settings</h3>
            </div>

            <div className="space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-800 uppercase tracking-widest ml-1">Redirect Link</label>
                <div className="relative">
                  {/* 🟢 Connected value and onChange */}
                  <select
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-bold text-black outline-none appearance-none cursor-pointer"
                  >
                    <option className="bg-zinc-100 text-black">New Collection</option>
                    <option className="bg-zinc-100 text-black">Best Sellers</option>
                    <option className="bg-zinc-100 text-black">Exclusive offer</option>
                  </select>
                  <Layout className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-500 uppercase tracking-widest ml-1">Display Schedule</label>
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 ">
                  <Clock className="text-amber-500" size={18} />
                  <span className="text-xs font-bold text-black">Show Immediately</span>
                </div>
              </div>
            </div>
          </section>

          {/* VISIBILITY TOGGLES */}
          <div className="space-y-4">
            <label className="w-full cursor-pointer group">
              {/* 🟢 Connected checked and onChange */}
              <input
                type="checkbox"
                className="hidden peer"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <div className="flex items-center justify-between p-6 rounded-[2.5rem] border transition-all peer-checked:bg-green-50 peer-checked:text-green-700 peer-checked:border-green-200 bg-zinc-50 text-zinc-900 border-zinc-100 shadow-sm">
                <div className="flex items-center gap-3">
                  <CheckCircle2 size={18} />
                  <span className="text-sm font-semibold uppercase tracking-widest">Active Carousel</span>
                </div>
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-green-600' : 'border-zinc-300'}`}>
                  {isActive && <div className="w-1.5 h-1.5 bg-green-600 rounded-full" />}
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerManager;