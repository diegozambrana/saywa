"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CategoryServices } from "@/services";
import type { Category, CategoryInsertData, CategoryUpdateData } from "@/types";

const CATEGORIES_PATH = "/admin/categories";

async function verifyAdminAccess() {
  await cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("Not authenticated");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Error loading profile");
  }

  if (profile.role !== "ADMIN") {
    throw new Error("Access denied: admins only");
  }

  return supabase;
}

function sanitizeText(value: FormDataEntryValue | null): string | null {
  if (typeof value !== "string") return null;
  const sanitized = value.trim();
  return sanitized.length ? sanitized : null;
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await verifyAdminAccess();
  const categoryService = new CategoryServices(supabase);
  return categoryService.getCategories();
}

export async function getCategoryById(id: string): Promise<Category> {
  if (!id) throw new Error("Category id is required");
  const supabase = await verifyAdminAccess();
  const categoryService = new CategoryServices(supabase);
  return categoryService.getCategoryById(id);
}

export async function createCategory(formData: FormData) {
  const supabase = await verifyAdminAccess();

  const name = sanitizeText(formData.get("name"));
  const slug = sanitizeText(formData.get("slug"));
  const description = sanitizeText(formData.get("description"));
  const parent_id = sanitizeText(formData.get("parent_id"));
  const active = formData.get("active") !== "false";

  if (!name) throw new Error("Name is required");
  if (!slug) throw new Error("Slug is required");

  const categoryData: CategoryInsertData = {
    name,
    slug,
    description,
    parent_id,
    active,
  };

  const { data, error } = await supabase
    .from("categories")
    .insert(categoryData)
    .select("*")
    .single();

  if (error) throw error;

  revalidatePath(CATEGORIES_PATH);
  return data;
}

export async function updateCategory(formData: FormData) {
  const supabase = await verifyAdminAccess();

  const id = sanitizeText(formData.get("id"));
  const name = sanitizeText(formData.get("name"));
  const slug = sanitizeText(formData.get("slug"));
  const description = sanitizeText(formData.get("description"));
  const parent_id = sanitizeText(formData.get("parent_id"));
  const active = formData.get("active") === "true";

  if (!id) throw new Error("Category id is required");
  if (!name) throw new Error("Name is required");
  if (!slug) throw new Error("Slug is required");

  const categoryData: CategoryUpdateData & { updated_at: string } = {
    name,
    slug,
    description,
    parent_id,
    active,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("categories")
    .update(categoryData)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  revalidatePath(CATEGORIES_PATH);
  revalidatePath(`${CATEGORIES_PATH}/${id}`);
  return data;
}

export async function deleteCategory(id: string) {
  if (!id) throw new Error("Category id is required");
  const supabase = await verifyAdminAccess();

  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) throw error;

  revalidatePath(CATEGORIES_PATH);
  return { success: true };
}
