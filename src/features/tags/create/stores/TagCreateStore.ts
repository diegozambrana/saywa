import { create } from "zustand";

interface TagCreateFormData {
  name: string;
  slug: string;
  active: boolean;
}

interface TagCreateState {
  formData: TagCreateFormData;
  error: string | null;
  setFormData: (data: Partial<TagCreateFormData>) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultFormData: TagCreateFormData = {
  name: "",
  slug: "",
  active: true,
};

export const useTagCreateStore = create<TagCreateState>((set) => ({
  formData: defaultFormData,
  error: null,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setError: (error) => set({ error }),
  reset: () => set({ formData: defaultFormData, error: null }),
}));
