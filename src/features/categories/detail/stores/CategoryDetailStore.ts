import { create } from "zustand";
import type { Category } from "@/types";

interface CategoryDetailState {
  category: Category | null;
  loading: boolean;
  error: string | null;
  setCategory: (category: Category | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useCategoryDetailStore = create<CategoryDetailState>((set) => ({
  category: null,
  loading: false,
  error: null,
  setCategory: (category) => set({ category }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ category: null, loading: false, error: null }),
}));
