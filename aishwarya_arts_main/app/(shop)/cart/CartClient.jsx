"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ChevronRight } from 'lucide-react';
import AccountSidebar from '../../components/profile/AccountSidebar';
import { useCartStore } from '../../../store/useCartStore';
import Empty from "../../../public/assets/notfound/Blink Emoji yellow.gif";

export default function CartClient() {
    const { cart, removeFromCart, addToCart } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (!mounted) return null;

    return (
        <main className="bg-zinc-50 min-h-screen py-8 md:py-12 font-outfit">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">

                {/* Mobile Breadcrumb */}
                <nav aria-label="Breadcrumb" className="lg:hidden mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-600">
                    <Link href="/profile" className="hover:text-amber-900 font-bold">Account</Link>
                    <ChevronRight size={14} aria-hidden="true" />
                    <span className="font-bold text-zinc-900" aria-current="page">Shopping Cart</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* SIDEBAR */}
                    <aside className="hidden lg:block" aria-label="Account Sidebar">
                        <AccountSidebar />
                    </aside>

                    {/* MAIN CONTENT */}
                    <section className="lg:col-span-3 space-y-8">

                        {/* --- HEADER --- */}
                        <header className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-zinc-200 shadow-sm relative overflow-hidden">
                            <ShoppingBag className="absolute -right-6 -bottom-6 text-zinc-100 size-48 -rotate-12 pointer-events-none" aria-hidden="true" />

                            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="flex items-center gap-5">
                                    <div className="p-4 bg-amber-50 rounded-2xl text-amber-900 shadow-2xs">
                                        <ShoppingBag size={32} strokeWidth={1.5} aria-hidden="true" />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-amber-900 italic">
                                            Acquisition Cart
                                        </span>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight font-cinzel mt-1">
                                            Shopping Cart
                                        </h1>
                                        <p className="text-sm sm:text-base text-zinc-700 font-medium mt-1">
                                            {cart.length > 0
                                                ? `Reviewing your ${cart.length} selected masterpieces`
                                                : "Your gallery collection is currently empty"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center md:justify-end">
                                    <div className="px-6 py-3 bg-zinc-900 rounded-2xl text-center shadow-md border border-white/5 min-w-30">
                                        <p className="text-xs text-white uppercase font-bold tracking-widest mb-0.5">
                                            Paintings
                                        </p>
                                        <p className="text-2xl sm:text-3xl font-black text-amber-400">
                                            {cart.length}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {cart.length > 0 && (
                                <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-wrap gap-6 md:gap-10">
                                    <div className="flex items-center gap-2 text-zinc-900 text-xs sm:text-sm font-bold uppercase tracking-wider">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" aria-hidden="true" />
                                        Verified Masterpieces
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-700 text-xs sm:text-sm font-bold uppercase tracking-wider">
                                        <span>Cart Value:</span>
                                        <span className="text-amber-900 font-black">₹{totalAmount.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            )}
                        </header>

                        {/* Cart Items List */}
                        <div className="bg-white rounded-[2.5rem] shadow-sm border border-zinc-200 overflow-hidden">
                            {cart.length > 0 ? (
                                <div className="divide-y divide-zinc-100" role="feed" aria-label="Cart Items">
                                    {cart.map((item) => (
                                        <article key={item.id} className="p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 hover:bg-zinc-50/50 transition-colors">

                                            <div className="w-full sm:w-40 md:w-52 aspect-square rounded-2xl overflow-hidden shrink-0 relative bg-zinc-100 border border-zinc-200">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title || "Tanjore painting cart item"}
                                                    fill
                                                    sizes="(max-width: 640px) 100vw, 200px"
                                                    className="object-cover p-2"
                                                />
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
                                                            <span className="hidden sm:block h-px w-6 bg-zinc-300" aria-hidden="true" />
                                                            <p className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                                                                Authentic Tanjore Masterpiece
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-3 border-t border-zinc-100">
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Dimensions</span>
                                                            <span className="text-sm font-bold text-zinc-900">{item.size}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Selected Frame</span>
                                                            <span className="text-sm font-bold text-zinc-900">{item.frame}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Work Style</span>
                                                            <span className="text-sm font-bold text-zinc-900 uppercase">{item.style}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Subject</span>
                                                            <span className="text-sm font-bold text-zinc-900">{item.godName}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-100 pt-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center border border-zinc-300 rounded-xl overflow-hidden bg-white shadow-2xs">
                                                            <button
                                                                onClick={() => addToCart({ ...item, quantity: -1 })}
                                                                aria-label={`Decrease quantity of ${item.title}`}
                                                                className="px-3.5 py-2 hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                                                            >
                                                                <Minus size={14} aria-hidden="true" />
                                                            </button>
                                                            <span className="px-4 py-1 text-sm font-bold border-x border-zinc-200 text-zinc-900">
                                                                {item.quantity}
                                                            </span>
                                                            <button
                                                                onClick={() => addToCart({ ...item, quantity: 1 })}
                                                                aria-label={`Increase quantity of ${item.title}`}
                                                                className="px-3.5 py-2 hover:bg-zinc-100 text-zinc-700 transition-colors cursor-pointer"
                                                            >
                                                                <Plus size={14} aria-hidden="true" />
                                                            </button>
                                                        </div>

                                                        <button
                                                            onClick={() => removeFromCart(item.id)}
                                                            aria-label={`Remove ${item.title} from cart`}
                                                            className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                                                        >
                                                            <Trash2 size={18} aria-hidden="true" />
                                                        </button>
                                                    </div>

                                                    <div className="text-right">
                                                        <span className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Item Total</span>
                                                        <span className="text-lg md:text-xl font-bold text-zinc-900">
                                                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        </article>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-24 text-center px-6">
                                    <div className="w-24 md:w-32 mx-auto mb-6">
                                        <Image src={Empty} alt="Empty cart illustration" width={120} height={120} unoptimized />
                                    </div>
                                    <h2 className="text-xl font-bold text-zinc-900 font-cinzel">Your collection is empty</h2>
                                    <p className="text-zinc-700 mb-8 mt-2 max-w-xs mx-auto text-sm sm:text-base font-medium">Start adding premium handcrafted Tanjore paintings to your gallery.</p>
                                    <Link
                                        href="/collections"
                                        aria-label="Explore art collections"
                                        className="inline-block rounded-2xl bg-zinc-900 px-8 py-4 text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-amber-900 transition shadow-md"
                                    >
                                        Explore Collections
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Responsive Summary Bar */}
                        {cart.length > 0 && (
                            <div className="bg-white rounded-4xl shadow-xl p-6 sm:p-8 border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6 sticky bottom-4 z-20">
                                <div className="text-center md:text-left">
                                    <p className="text-xs uppercase font-bold text-zinc-600 tracking-widest">Estimated Total</p>
                                    <div className="flex items-baseline justify-center md:justify-start gap-3 mt-1">
                                        <span className="text-xs text-zinc-600 font-bold uppercase">INR</span>
                                        <p className="text-3xl font-bold text-zinc-900">
                                            ₹{totalAmount.toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <Link
                                        href="/collections"
                                        aria-label="Continue shopping collections"
                                        className="px-8 py-4 rounded-2xl border-2 border-zinc-300 font-bold uppercase text-xs tracking-[0.2em] text-zinc-800 hover:bg-zinc-100 transition text-center order-2 sm:order-1"
                                    >
                                        Continue Shopping
                                    </Link>
                                    <Link
                                        href="/checkout"
                                        aria-label="Proceed to secure checkout"
                                        className="px-10 py-4 rounded-2xl bg-zinc-900 text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-amber-900 transition text-center shadow-lg order-1 sm:order-2"
                                    >
                                        Secure Checkout
                                    </Link>
                                </div>
                            </div>
                        )}
                    </section>

                </div>
            </div>
        </main>
    );
}