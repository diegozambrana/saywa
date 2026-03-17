"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Tag } from "@/types";
import { deleteTag } from "@/actions/tag";
import { useTagListStore } from "../stores/TagListStore";

export const useTagList = (initialTags: Tag[]) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<Tag | null>(null);
  const { tagList, loading, error, setTagList, setError } = useTagListStore();

  useEffect(() => {
    setTagList(initialTags || []);
  }, [initialTags, setTagList]);

  const handleDelete = async () => {
    if (!tagToDelete) return;

    try {
      await deleteTag(tagToDelete.id);
      setTagList(tagList.filter((item) => item.id !== tagToDelete.id));
      toast.success("Tag deleted successfully");
      setDeleteDialogOpen(false);
      setTagToDelete(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error deleting tag";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleCloseDialog = () => {
    setDeleteDialogOpen(false);
    setTagToDelete(null);
  };

  return {
    tagList,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    tagToDelete,
    setTagToDelete,
    handleDelete,
    handleCloseDialog,
  };
};
