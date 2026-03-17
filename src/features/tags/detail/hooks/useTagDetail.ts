"use client";

import { useEffect, useRef } from "react";
import { getTagById } from "@/actions/tag";
import { useTagDetailStore } from "../stores/TagDetailStore";

export const useTagDetail = (tagId: string) => {
  const { tag, loading, error, setTag, setLoading, setError } = useTagDetailStore();
  const hasFetched = useRef(false);
  const currentTagId = useRef<string | null>(null);

  useEffect(() => {
    if (!tagId) return;

    if (currentTagId.current !== tagId) {
      hasFetched.current = false;
      currentTagId.current = tagId;
    }

    const fetchTag = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);
      setError(null);
      try {
        const data = await getTagById(tagId);
        setTag(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error loading tag");
      } finally {
        setLoading(false);
      }
    };

    fetchTag();
  }, [tagId, setTag, setError, setLoading]);

  return {
    tag,
    loading,
    error,
  };
};
