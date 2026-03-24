"use client";
import React from "react";
import { AlertTriangle, ArrowRight, Box } from "lucide-react";
import { motion } from "framer-motion";

// 🟢 Accept 'items' as a prop from the parent
const InventoryAlerts = ({ items = [] }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-red-50 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-50 text-red-600 rounded-lg shadow-sm shadow-red-100">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-zinc-900">Inventory Alerts</h2>
            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Stock Monitor</p>
          </div>
        </div>
        
        {items.length > 0 && (
          <span className="bg-red-50 text-red-600 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-widest border border-red-100 animate-pulse">
            {items.length} Critical
          </span>
        )}
      </div>

      <div className="space-y-4 flex-1">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-10 opacity-40">
            <Box size={40} className="text-zinc-300 mb-2" />
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Inventory Full</p>
          </div>
        ) : (
          items.map((item, i) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100 group hover:border-red-200 hover:bg-white transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <Box size={16} className="text-zinc-400 group-hover:text-red-500 transition-colors" />
                <div>
                  <p className="text-sm font-bold text-zinc-900 truncate max-w-37.5">{item.name}</p>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tighter italic">
                    {item.category}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-xs font-black uppercase tracking-tighter ${
                  item.stock === 0 ? "text-red-600" : "text-amber-600"
                }`}>
                  {item.stock === 0 ? "Out of Stock" : `${item.stock} Left`}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <button className="w-full mt-6 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-all shadow-sm active:scale-95">
        Manage Inventory <ArrowRight size={14} />
      </button>
    </div>
  );
};

export default InventoryAlerts;