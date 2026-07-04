"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Menu, Search, Bell, User, Plus,
  Settings, LogOut, Globe, Command,
  CheckCircle2, Sparkles, AlertTriangle, AlertCircle, Package
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useDashboardStore } from "@/store/useDashboardStore";


const Navbar = ({ onMenuClick }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { data: session } = useSession();
  const timeoutRef = useRef(null);

  const { data, fetchStats } = useDashboardStore();

  useEffect(() => {
    if (!data) {
      fetchStats();
    }
  }, [data, fetchStats]);

  const notifications = [];
  if (data) {
    if (data.lowStock) {
      data.lowStock.forEach(item => {
        notifications.push({
          id: `stock-${item.id}`,
          type: "low_stock",
          title: "Low Stock Alert",
          description: `${item.name} has only ${item.stock} left.`,
          link: "/admin/inventory",
          time: "Immediate"
        });
      });
    }
    if (data.logisticsPulse) {
      data.logisticsPulse.filter(o => o.isDelayed).forEach(o => {
        notifications.push({
          id: `delay-${o.id}`,
          type: "delay",
          title: "Shipment Delay Warning",
          description: `Order ${o.id} for ${o.patron} is pending for ${o.days} days.`,
          link: `/admin/orders`,
          time: "Overdue"
        });
      });
    }
    if (data.recentOrders) {
      data.recentOrders.slice(0, 3).forEach(o => {
        notifications.push({
          id: `order-${o._id}`,
          type: "order",
          title: "New Placement",
          description: `${o.name} from ${o.city} ordered artwork of ₹${o.amount.toLocaleString()}.`,
          link: `/admin/orders`,
          time: "Recent"
        });
      });
    }
  }

  useEffect(() => {
    // If dropdown is opened, start a 10-second timer
    if (showProfile) {
      timeoutRef.current = setTimeout(() => {
        setShowProfile(false);
      }, 10000); // 10000ms = 10 seconds
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [showProfile]);
  const handleInteraction = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setShowProfile(false), 10000);
    }
  };


  const handleLogout = async () => {
    // This clears the JWT, sessions, and redirects to /admin
    await signOut({ callbackUrl: "/admin" });
  };

  const displayName = session?.user?.role === "admin" ? "Aishwarya Arts" : session?.user?.name;
  const displayRole = session?.user?.role === "admin" ? "Super Admin" : "User";
  const profileImage = session?.user?.image || "/assets/about/men-2.png";


  return (
    <header className="h-20 border-b border-amber-100/50 bg-white/70 backdrop-blur-xl sticky top-0 z-30 px-4 lg:px-8 flex items-center justify-between">

      {/* LEFT: MOBILE TOGGLE & BRAND (MOBILE ONLY) */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2.5 text-zinc-600 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all"
        >
          <Menu size={22} />
        </button>

        <Link href="/" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 hover:border-amber-200 text-zinc-500 hover:text-amber-600 transition-all group">
          <Globe size={14} className="group-hover:rotate-12 transition-transform" />
          <span className="text-md font-semibold uppercase tracking-wide text-black">Admin Contol Center</span>
        </Link>
      </div>

      {/* CENTER: GLOBAL SEARCH (The Shopify Style) */}
      <div className="flex-1 max-w-xl px-4 hidden md:block">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search size={16} className="text-zinc-400 group-focus-within:text-amber-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder=""
            className="w-full bg-zinc-100/50 border border-transparent rounded-2xl py-2.5 pl-11 pr-12 text-sm outline-none focus:bg-white focus:border-amber-200 focus:ring-4 focus:ring-amber-500/5 transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 bg-white border border-zinc-200 px-1.5 py-1 rounded-md shadow-sm pointer-events-none">
            <Command size={10} className="text-zinc-400" />
          </div>
        </div>
      </div>

      {/* RIGHT: ACTIONS & PROFILE */}
      <div className="flex items-center gap-2 md:gap-5">

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2.5 text-zinc-500 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all relative group"
          >
            <Bell size={20} />
            {notifications.length > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-amber-500 rounded-full border-2 border-white text-[9px] font-black text-white flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowNotifications(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-amber-100 rounded-2xl shadow-2xl shadow-amber-900/5 p-4 overflow-hidden z-50 text-zinc-950 font-outfit"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-100 mb-3">
                    <h4 className="text-sm font-bold text-zinc-900">Notifications</h4>
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {notifications.length} Alerts
                    </span>
                  </div>

                  <div className="max-h-72 overflow-y-auto space-y-3 pr-1">
                    {notifications.length === 0 ? (
                      <div className="py-8 text-center text-zinc-400 text-xs font-semibold uppercase tracking-widest">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((n) => {
                        let Icon = Package;
                        let colorClass = "bg-green-50 text-green-700 border-green-100";
                        if (n.type === "low_stock") {
                          Icon = AlertTriangle;
                          colorClass = "bg-amber-50 text-amber-700 border-amber-100";
                        } else if (n.type === "delay") {
                          Icon = AlertCircle;
                          colorClass = "bg-red-50 text-red-700 border-red-100";
                        }

                        return (
                          <Link
                            key={n.id}
                            href={n.link}
                            onClick={() => setShowNotifications(false)}
                            className="flex gap-3 p-3 rounded-xl border border-zinc-50 hover:bg-zinc-50/50 hover:border-zinc-100 transition-all text-left"
                          >
                            <div className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${colorClass}`}>
                              <Icon size={16} />
                            </div>
                            <div className="space-y-0.5 flex-1 min-w-0">
                              <div className="flex justify-between items-baseline gap-2">
                                <p className="text-xs font-bold text-zinc-900 truncate uppercase tracking-tight">{n.title}</p>
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest shrink-0">{n.time}</span>
                              </div>
                              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed">{n.description}</p>
                            </div>
                          </Link>
                        );
                      })
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Add Button */}


        {/* Profile Dropdown Trigger */}
        <div className="relative pl-2 md:pl-5 border-l border-zinc-200 ml-2">
          <button
            onClick={() => setShowProfile(!showProfile)}
            
            className="flex items-center gap-3 group"
          >
            <div className="hidden text-right lg:block">
              <p className="text-md font-bold text-zinc-900 leading-none">{displayName || "Loading..."}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <Sparkles size={8} className="text-amber-500" />
                <p className="text-[12px] text-zinc-900 font-bold uppercase tracking-wide leading-none">{displayRole}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-tr from-amber-100 to-amber-50 flex items-center justify-center text-amber-700 border border-amber-200 group-hover:border-amber-400 group-hover:shadow-md transition-all relative overflow-hidden">
              <Image
                src="/assets/about/men-2.png"
                alt="Admin Profile"
                fill
                className="w-full h-full object-cover"
              />
              
            </div>
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {showProfile && (
              <>
                <div className="fixed inset-0 z-[-1]" onClick={() => setShowProfile(false)} />
                <motion.div
                  onMouseMove={handleInteraction}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-56 bg-white border border-amber-100 rounded-2xl shadow-2xl shadow-amber-900/5 p-2 overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-zinc-50 mb-1">
                    <p className="text-sm font-bold text-zinc-900"> Control Center</p>
                    <p className="text-sm text-zinc-800 mt-0.5">{displayName}</p>

                  </div>
                  <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-xs text-zinc-600 hover:bg-amber-50 hover:text-amber-700 rounded-xl transition-all">
                    <Settings size={14} />
                    Profile Settings
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-3 py-2.5 text-xs text-red-500 hover:bg-red-50 rounded-xl transition-all">
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Navbar;