"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Category } from "@/types";
import { deleteCategory } from "@/actions/category";
import { useCategoryListStore } from "../stores/CategoryListStore";

export const useCategoryList = (initialCategories: Category[]) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);
  const { categoryList, loading, error, setCategoryList, setError } =
    useCategoryListStore();

  useEffect(() => {
    setCategoryList(initialCategories || []);
  }, [initialCategories, setCategoryList]);

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteCategory(categoryToDelete.id);
      setCategoryList(categoryList.filter((item) => item.id !== categoryToDelete.id));
      toast.success("Category deleted successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error deleting category";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  return {
    categoryList,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    categoryToDelete,
    setCategoryToDelete,
    handleDelete,
    handleCloseDialog,
  };
};
