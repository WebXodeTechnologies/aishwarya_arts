"use client";
import React from "react";
import { Truck, Clock, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const LogisticsPulse = ({ orders = [] }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shadow-sm shadow-blue-50">
            <Truck size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900 leading-none">Logistics Pulse</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Live Tracking</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {orders.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-10 opacity-40">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">No active shipments</p>
          </div>
        ) : (
          orders.map((order, i) => (
            <motion.div 
              key={order.id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between group hover:border-blue-200 hover:bg-white transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-full ${order.isDelayed ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-100 text-blue-600'}`}>
                  <Clock size={14} />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">{order.patron}</p>
                  <p className="text-[11px] text-zinc-500 font-medium tracking-tight">
                    {order.id} <span className="text-zinc-300 mx-1">•</span> {order.location}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-black ${order.isDelayed ? 'text-red-600' : 'text-blue-600'}`}>
                  {order.days} {order.days === 1 ? 'Day' : 'Days'}
                </p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter">
                  {order.isDelayed ? 'Delayed' : order.status}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <button className="w-full mt-6 py-4 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-100 hover:shadow-blue-100">
        Full Logistics View <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default LogisticsPulse;