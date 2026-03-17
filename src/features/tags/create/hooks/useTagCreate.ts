"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import type { Tag } from "@/types";
import { createTag, updateTag } from "@/actions/tag";
import { useTagCreateStore } from "../stores/TagCreateStore";

const tagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  active: z.boolean(),
});

type TagFormValues = z.infer<typeof tagSchema>;

const emptyFormValues: TagFormValues = {
  name: "",
  slug: "",
  active: true,
};

interface UseTagCreateProps {
  tagId?: string;
  initialTag?: Tag;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const useTagCreate = ({ tagId, initialTag }: UseTagCreateProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { error, setError, reset } = useTagCreateStore();

  const isEditMode = !!tagId;

  const form = useForm<TagFormValues>({
    resolver: zodResolver(tagSchema),
    defaultValues: isEditMode
      ? {
          name: initialTag?.name ?? "",
          slug: initialTag?.slug ?? "",
          active: initialTag?.active ?? true,
        }
      : emptyFormValues,
  });

  const nameValue = useWatch({
    control: form.control,
    name: "name",
  });

  useEffect(() => {
    if (!isEditMode) {
      reset();
      form.reset(emptyFormValues);
    }
  }, [isEditMode, form, reset]);

  useEffect(() => {
    if (isEditMode) return;
    if (!nameValue?.trim()) return;
    form.setValue("slug", slugify(nameValue));
  }, [nameValue, form, isEditMode]);

  const handleCancel = () => {
    if (tagId) {
      router.push(`/admin/tags/${tagId}`);
      return;
    }
    reset();
    form.reset(emptyFormValues);
    router.push("/admin/tags");
  };

  const onSubmit = (data: TagFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        const payload = new FormData();

        if (tagId) payload.append("id", tagId);
        payload.append("name", data.name);
        payload.append("slug", data.slug);
        payload.append("active", data.active.toString());

        if (tagId) {
          await updateTag(payload);
          toast.success("Tag updated successfully");
          router.push(`/admin/tags/${tagId}`);
        } else {
          const created = await createTag(payload);
          reset();
          form.reset(emptyFormValues);
          toast.success("Tag created successfully");
          router.push(`/admin/tags/${created.id}`);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : tagId
              ? "Error updating tag"
              : "Error creating tag";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  return {
    form,
    isPending,
    error,
    handleCancel,
    onSubmit,
  };
};
