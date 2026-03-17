import { create } from "zustand";
import type { Tag } from "@/types";

interface TagDetailState {
  tag: Tag | null;
  loading: boolean;
  error: string | null;
  setTag: (tag: Tag | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useTagDetailStore = create<TagDetailState>((set) => ({
  tag: null,
  loading: false,
  error: null,
  setTag: (tag) => set({ tag }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set({ tag: null, loading: false, error: null }),
}));
