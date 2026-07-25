"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2, ShoppingBag, ChevronRight, Heart } from "lucide-react";
import AccountSidebar from "../../components/profile/AccountSidebar";
import EmptyWishlistGif from "../../../public/assets/notfound/Girl holding bag.gif";

import { useWishlistStore } from "../../../store/useWishlistStore";
import { useCartStore } from "../../../store/useCartStore";

export default function WishlistClient() {
    const { wishlist, toggleWishlist } = useWishlistStore();
    const { addToCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMoveToCart = (item) => {
        addToCart({
            id: item.id || item._id,
            title: item.title,
            price: item.price,
            image: item.image || item.images[0],
            sku: item.sku,
            quantity: 1,
            size: item.size,
            frame: item.frame,
            style: item.style,
            godName: item.godName
        });

        toggleWishlist(item);
        toast.success("Moved to cart!");
    };

    const handleRemove = (item) => {
        toggleWishlist(item);
        toast.error("Removed from wishlist");
    };

    if (!mounted) return null;

    return (
        <main className="bg-zinc-50 min-h-screen py-8 md:py-12 font-outfit">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Mobile Navigation */}
                <nav aria-label="Breadcrumb" className="lg:hidden mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-600">
                    <Link href="/profile" className="hover:text-amber-900 font-bold">Account</Link>
                    <ChevronRight size={14} aria-hidden="true" />
                    <span className="font-bold text-zinc-900" aria-current="page">Wishlist</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    <aside className="hidden lg:block" aria-label="Account Sidebar">
                        <AccountSidebar />
                    </aside>

                    <section className="lg:col-span-3 space-y-8">

                        {/* Header Container */}
                        <header className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-zinc-200 shadow-sm relative overflow-hidden">
                            <Heart className="absolute -right-6 -bottom-6 text-zinc-100 size-48 -rotate-12 pointer-events-none fill-zinc-100" aria-hidden="true" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-rose-50 rounded-2xl text-rose-700 shadow-2xs">
                                        <Heart size={32} strokeWidth={1.5} className="fill-rose-700" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-900 italic">
                                            Curated Gallery
                                        </span>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight font-cinzel mt-1">
                                            My Wishlist
                                        </h1>
                                        <p className="text-sm sm:text-base text-zinc-700 font-medium mt-1">
                                            A curated collection of your favorite traditional art
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="px-6 py-3 bg-zinc-900 rounded-2xl text-center shadow-md border border-white/5 min-w-30">
                                        <p className="text-xs text-white uppercase font-bold tracking-widest mb-0.5">Saved Pieces</p>
                                        <p className="text-2xl sm:text-3xl font-black text-amber-400">{wishlist.length}</p>
                                    </div>
                                </div>
                            </div>

                            {wishlist.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-6 md:gap-10">
                                    <div className="flex items-center gap-2 text-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-wider">
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" aria-hidden="true" />
                                        Ready to Order
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
                                        <span>Total Selection Value:</span>
                                        <span className="text-amber-900 font-black">₹{wishlist.reduce((acc, item) => acc + item.price, 0).toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            )}
                        </header>

                        {/* Wishlist Items List */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-200 overflow-hidden">
                            {wishlist.length > 0 ? (
                                <div className="divide-y divide-zinc-100" role="feed" aria-label="Saved Wishlist Items">
                                    {wishlist.map((item) => (
                                        <article key={item.id} className="p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 hover:bg-zinc-50/50 transition-colors">

                                            <div className="w-full sm:w-40 md:w-48 aspect-square rounded-2xl overflow-hidden shrink-0 relative bg-zinc-100 border border-zinc-200">
                                                <Image
                                                    src={item.image || item.images?.[0]}
                                                    alt={item.title || "Wishlist art item"}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, 200px"
                                                    className="object-cover p-2"
                                                />
                                                {item.inStock === false && (
                                                    <div className="absolute inset-white/70 backdrop-blur-[2px] flex items-center justify-center">
                                                        <span className="text-[10px] font-bold text-red-700 bg-white border border-red-200 px-3 py-1 rounded-full shadow-2xs">SOLD OUT</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex flex-col justify-between w-full min-h-full sm:min-h-45 grow">
                                                <div className="space-y-4">
                                                    <div>
                                                        <h2 className="font-bold text-zinc-900 text-xl md:text-2xl tracking-tight leading-tight font-cinzel">
                                                            {item.title}
                                                        </h2>
                                                        <div className="flex flex-wrap items-center gap-2 mt-2">
                                                            <span className="px-3 py-1 bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-widest border border-amber-200 rounded-full">
                                                                SKU: {item.sku || "TSH-01"}
                                                            </span>
                                                            <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider ml-1">
                                                                Tanjore Masterpiece
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-zinc-100">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Dimensions</span>
                                                            <span className="text-sm font-bold text-zinc-900">{item.size || 'Standard'}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Selected Frame</span>
                                                            <span className="text-sm font-bold text-zinc-900">{item.frame || 'Standard'}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Work Style</span>
                                                            <span className="text-sm font-bold text-zinc-900 uppercase">{item.style || 'Flat'}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Pricing</span>
                                                            <span className="text-sm font-bold text-amber-900">₹{item.price.toLocaleString('en-IN')}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                                                    <button
                                                        onClick={() => handleRemove(item)}
                                                        aria-label={`Remove ${item.title} from wishlist`}
                                                        className="px-5 py-2.5 rounded-xl font-bold uppercase text-xs tracking-wider flex items-center gap-2 transition-all text-zinc-700 hover:text-red-600 cursor-pointer"
                                                    >
                                                        <Trash2 size={16} aria-hidden="true" /> Remove
                                                    </button>

                                                    <button
                                                        onClick={() => handleMoveToCart(item)}
                                                        disabled={item.inStock === false}
                                                        aria-label={`Move ${item.title} to shopping cart`}
                                                        className={`px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-[0.15em] flex items-center gap-2 transition-all shadow-md cursor-pointer ${item.inStock !== false
                                                            ? "bg-zinc-900 text-white hover:bg-amber-900"
                                                            : "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                                                            }`}
                                                    >
                                                        <ShoppingBag size={14} aria-hidden="true" />
                                                        {item.inStock !== false ? "Move to Cart" : "Sold Out"}
                                                    </button>
                                                </div>
                                            </div>

                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-24 flex flex-col items-center justify-center text-center px-6">
                                    <div className="w-48 h-48 relative mb-6">
                                        <Image
                                            src={EmptyWishlistGif}
                                            alt="Empty Wishlist illustration"
                                            fill
                                            unoptimized
                                            priority
                                            className="object-contain"
                                        />
                                    </div>
                                    <h2 className="text-xl font-bold text-zinc-900 font-cinzel">Your collection awaits</h2>
                                    <p className="text-zinc-700 mt-2 max-w-xs text-sm sm:text-base font-medium">Save your favorite handcrafted paintings here to review them later.</p>
                                    <Link
                                        href="/collections"
                                        aria-label="Browse art collections"
                                        className="mt-8 inline-block rounded-2xl bg-zinc-900 px-8 py-4 text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-amber-900 transition shadow-md"
                                    >
                                        Browse Masterpieces
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
}