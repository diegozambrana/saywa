"use client";

import { useEffect, useRef } from "react";
import { getCategoryById } from "@/actions/category";
import { useCategoryDetailStore } from "../stores/CategoryDetailStore";

export const useCategoryDetail = (categoryId: string) => {
  const { category, loading, error, setCategory, setLoading, setError } =
    useCategoryDetailStore();
  const hasFetched = useRef(false);
  const currentCategoryId = useRef<string | null>(null);

  useEffect(() => {
    if (!categoryId) return;

    if (currentCategoryId.current !== categoryId) {
      hasFetched.current = false;
      currentCategoryId.current = categoryId;
    }

    const fetchCategory = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);
      setError(null);
      try {
        const data = await getCategoryById(categoryId);
        setCategory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading category");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId, setCategory, setError, setLoading]);

  return {
    category,
    loading,
    error,
  };
};
