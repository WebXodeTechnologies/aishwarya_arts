"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  getFilteredRowModel,
  flexRender 
} from "@tanstack/react-table";
import { 
  Search, Eye, Trash2, Plus, Layers, 
  Clock, ChevronRight, ChevronLeft 
} from "lucide-react";
import Link from "next/link";

const InventoryTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilter, setGlobalFilter] = useState("");

  const fetchInventory = async () => {
    try {
      const res = await axios.get("/api/admin/products");
      // Calibrated to target the 'data' array in your API response
      setProducts(res.data.data || []);
    } catch (err) {
      toast.error("Handshake failed: Could not fetch inventory");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  // 1. DEFINE COLUMNS (TanStack logic)
  const columns = useMemo(() => [
    {
      header: "S.No",
      accessorFn: (row, index) => index + 1, // Will be handled by TanStack pagination
      cell: (info) => (
        <span className="text-sm font-bold text-zinc-400 pl-4">
          {info.table.getState().pagination.pageIndex * 10 + info.row.index + 1}
        </span>
      ),
    },
    {
      header: "Products",
      accessorKey: "title",
      cell: (info) => (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl overflow-hidden border border-zinc-100 bg-zinc-50 shrink-0">
            <img 
              src={info.row.original.images?.[0]} 
              alt="" 
              className="w-full h-full object-cover transition-transform group-hover:scale-110" 
            />
          </div>
          <p className="text-sm font-bold text-zinc-900 truncate max-w-[200px]">
            {info.getValue()}
          </p>
        </div>
      ),
    },
    {
      header: "SKU ID",
      accessorKey: "sku",
      cell: (info) => (
        <span className="px-3 py-1 bg-zinc-100 rounded-lg text-[11px] font-black text-zinc-600 uppercase">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: "Category",
      accessorKey: "workStyle",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <Layers size={14} className="text-zinc-300 shrink-0" />
          <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest">
            {info.getValue() || "Tanjore"}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "inStock",
      cell: (info) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${info.getValue() ? "bg-green-500" : "bg-red-500 animate-pulse"}`} />
            <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
              {info.getValue() ? "Active" : "OOS"}
            </span>
          </div>
          <span className="text-xs font-black text-zinc-800 italic">
            ₹{info.row.original.price?.toLocaleString()}
          </span>
        </div>
      ),
    },
  ], []);

  // 2. INITIALIZE TABLE
  const table = useReactTable({
    data: products,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 px-2 sm:px-5">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-800 tracking-wide uppercase">Inventory Control</h2>
          <p className="text-sm text-zinc-500 font-medium tracking-normal mt-1 italic">
            {table.getFilteredRowModel().rows.length} Masterpieces in Registry
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-amber-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search SKU or Artwork..." 
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="bg-white border border-zinc-200 rounded-2xl py-3 pl-12 pr-6 text-sm font-medium outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500/30 transition-all w-full shadow-sm"
            />
          </div>
          <Link href="/admin/add-product" className="p-3.5 bg-zinc-900 text-white rounded-2xl hover:bg-amber-600 transition-all shadow-xl">
            <Plus size={20} />
          </Link>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
             <Clock className="animate-spin text-amber-500" size={32} />
             <p className="uppercase text-[10px] font-bold tracking-widest text-zinc-400">Syncing Live Signals...</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id} className="bg-zinc-50/50 border-b border-zinc-100">
                      {headerGroup.headers.map(header => (
                        <th key={header.id} className="p-5 text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                          {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                      <th className="p-5 text-[11px] font-bold text-zinc-400 uppercase tracking-[0.2em] text-right pr-10">Actions</th>
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className="group hover:bg-zinc-50/30 transition-all duration-300">
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id} className="p-5">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                      <td className="p-5 text-right pr-10">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                          <button className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-400 hover:text-amber-600 shadow-sm"><Eye size={14}/></button>
                          <button className="p-2 bg-white border border-zinc-200 rounded-lg text-zinc-400 hover:text-red-600 shadow-sm"><Trash2 size={14}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION CONTROLS */}
            <div className="p-6 border-t border-zinc-50 bg-zinc-50/20 flex items-center justify-between">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                
                <button 
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="p-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InventoryTable;