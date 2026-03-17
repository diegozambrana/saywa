"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { TagServices } from "@/services";
import type { Tag, TagInsertData, TagUpdateData } from "@/types";

const TAGS_PATH = "/admin/tags";

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

export async function getTags(): Promise<Tag[]> {
  const supabase = await verifyAdminAccess();
  const tagService = new TagServices(supabase);
  return tagService.getTags();
}

export async function getTagById(id: string): Promise<Tag> {
  if (!id) throw new Error("Tag id is required");
  const supabase = await verifyAdminAccess();
  const tagService = new TagServices(supabase);
  return tagService.getTagById(id);
}

export async function createTag(formData: FormData) {
  const supabase = await verifyAdminAccess();

  const name = sanitizeText(formData.get("name"));
  const slug = sanitizeText(formData.get("slug"));
  const active = formData.get("active") !== "false";

  if (!name) throw new Error("Name is required");
  if (!slug) throw new Error("Slug is required");

  const tagData: TagInsertData = {
    name,
    slug,
    active,
  };

  const { data, error } = await supabase.from("tags").insert(tagData).select("*").single();
  if (error) throw error;

  revalidatePath(TAGS_PATH);
  return data;
}

export async function updateTag(formData: FormData) {
  const supabase = await verifyAdminAccess();

  const id = sanitizeText(formData.get("id"));
  const name = sanitizeText(formData.get("name"));
  const slug = sanitizeText(formData.get("slug"));
  const active = formData.get("active") === "true";

  if (!id) throw new Error("Tag id is required");
  if (!name) throw new Error("Name is required");
  if (!slug) throw new Error("Slug is required");

  const tagData: TagUpdateData & { updated_at: string } = {
    name,
    slug,
    active,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("tags")
    .update(tagData)
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;

  revalidatePath(TAGS_PATH);
  revalidatePath(`${TAGS_PATH}/${id}`);
  return data;
}

export async function deleteTag(id: string) {
  if (!id) throw new Error("Tag id is required");
  const supabase = await verifyAdminAccess();

  const { error } = await supabase.from("tags").delete().eq("id", id);
  if (error) throw error;

  revalidatePath(TAGS_PATH);
  return { success: true };
}
