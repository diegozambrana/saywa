"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import type { Category } from "@/types";
import { createCategory, updateCategory } from "@/actions/category";
import { useCategoryCreateStore } from "../stores/CategoryCreateStore";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  parent_id: z.string().optional(),
  active: z.boolean(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

const emptyFormValues: CategoryFormValues = {
  name: "",
  slug: "",
  description: "",
  parent_id: "",
  active: true,
};

interface UseCategoryCreateProps {
  categoryId?: string;
  initialCategory?: Category;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const useCategoryCreate = ({
  categoryId,
  initialCategory,
}: UseCategoryCreateProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { error, setError, reset } = useCategoryCreateStore();

  const isEditMode = !!categoryId;

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: isEditMode
      ? {
          name: initialCategory?.name ?? "",
          slug: initialCategory?.slug ?? "",
          description: initialCategory?.description ?? "",
          parent_id: initialCategory?.parent_id ?? "",
          active: initialCategory?.active ?? true,
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
    if (categoryId) {
      router.push(`/admin/categories/${categoryId}`);
      return;
    }
    reset();
    form.reset(emptyFormValues);
    router.push("/admin/categories");
  };

  const onSubmit = (data: CategoryFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        const payload = new FormData();

        if (categoryId) payload.append("id", categoryId);
        payload.append("name", data.name);
        payload.append("slug", data.slug);
        payload.append("description", data.description || "");
        payload.append("parent_id", data.parent_id || "");
        payload.append("active", data.active.toString());

        if (categoryId) {
          await updateCategory(payload);
          toast.success("Category updated successfully");
          router.push(`/admin/categories/${categoryId}`);
        } else {
          const created = await createCategory(payload);
          reset();
          form.reset(emptyFormValues);
          toast.success("Category created successfully");
          router.push(`/admin/categories/${created.id}`);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : categoryId
              ? "Error updating category"
              : "Error creating category";
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
