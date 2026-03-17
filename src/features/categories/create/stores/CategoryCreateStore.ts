import { create } from "zustand";

interface CategoryCreateFormData {
  name: string;
  slug: string;
  description: string;
  parent_id: string;
  active: boolean;
}

interface CategoryCreateState {
  formData: CategoryCreateFormData;
  error: string | null;
  setFormData: (data: Partial<CategoryCreateFormData>) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const defaultFormData: CategoryCreateFormData = {
  name: "",
  slug: "",
  description: "",
  parent_id: "",
  active: true,
};

export const useCategoryCreateStore = create<CategoryCreateState>((set) => ({
  formData: defaultFormData,
  error: null,
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  setError: (error) => set({ error }),
  reset: () => set({ formData: defaultFormData, error: null }),
}));
