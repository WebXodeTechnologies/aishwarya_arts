import { create } from "zustand";

export const useDashboardStore = create((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();
      if (json.success) {
        set({ data: json, loading: false });
      } else {
        set({ error: json.error || "Failed to load dashboard statistics", loading: false });
      }
    } catch (err) {
      console.error("Dashboard store error:", err);
      set({ error: err.message || "Failed to connect to API server", loading: false });
    }
  },
}));
