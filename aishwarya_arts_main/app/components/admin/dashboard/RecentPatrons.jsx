"use client";

const RecentPatrons = ({ patrons = [] }) => {
  // 1. Empty State Handling
  if (!patrons || patrons.length === 0) {
    return (
      <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full flex flex-col items-center justify-center text-zinc-400">
        <p className="text-sm font-medium italic">No recent patrons recorded.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm h-full flex flex-col">
      <h2 className="text-lg font-bold text-zinc-900 mb-6">Recent Customers</h2>
      
      <div className="space-y-6 flex-1">
        {patrons.map((patron) => (
          // Use the _id from the API for better performance
          <div key={patron._id} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              {/* Avatar with Initial */}
              <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center font-bold text-amber-700 text-xs uppercase border border-amber-100">
                {patron.name ? patron.name[0] : "P"}
              </div>
              
              <div>
                <p className="text-sm font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">
                  {patron.name}
                </p>
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                  {patron.city}
                </p>
              </div>
            </div>

            {/* Price Formatting */}
            <p className="text-sm font-semibold text-zinc-900">
              ₹{patron.amount?.toLocaleString('en-IN') || "0"}
            </p>
          </div>
        ))}
      </div>

      <button className="w-full mt-8 py-4 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-amber-600 transition-all shadow-lg shadow-zinc-100 hover:shadow-amber-100">
        Full Customer Report
      </button>
    </div>
  );
};

export default RecentPatrons;