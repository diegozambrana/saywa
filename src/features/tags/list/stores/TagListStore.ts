import { create } from "zustand";
import type { Tag } from "@/types";

interface TagListState {
  tagList: Tag[];
  loading: boolean;
  error: string | null;
  setTagList: (tags: Tag[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTagListStore = create<TagListState>((set) => ({
  tagList: [],
  loading: false,
  error: null,
  setTagList: (tags) => set({ tagList: tags }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
