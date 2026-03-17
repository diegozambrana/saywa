import { create } from "zustand";
import type { Category } from "@/types";

interface CategoryListState {
  categoryList: Category[];
  loading: boolean;
  error: string | null;
  setCategoryList: (categories: Category[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCategoryListStore = create<CategoryListState>((set) => ({
  categoryList: [],
  loading: false,
  error: null,
  setCategoryList: (categories) => set({ categoryList: categories }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
