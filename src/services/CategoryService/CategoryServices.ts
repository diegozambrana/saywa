import { SupabaseClient } from "@supabase/supabase-js";
import type { Category } from "@/types";

export class CategoryServices {
  constructor(private readonly supabase: SupabaseClient) {}

  async getCategories(): Promise<Category[]> {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    const categories = ((data ?? []) as Category[]).map((category) => ({
      ...category,
      parent: null,
    }));

    const categoriesById = new Map(categories.map((category) => [category.id, category]));

    return categories.map((category) => ({
      ...category,
      parent: category.parent_id ? categoriesById.get(category.parent_id) ?? null : null,
    }));
  }

  async getCategoryById(id: string): Promise<Category> {
    const { data, error } = await this.supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const category = data as Category;

    if (!category.parent_id) {
      return { ...category, parent: null };
    }

    const { data: parentData, error: parentError } = await this.supabase
      .from("categories")
      .select("id, name, slug")
      .eq("id", category.parent_id)
      .single();

    if (parentError) {
      return { ...category, parent: null };
    }

    return {
      ...category,
      parent: parentData as Category,
    };
  }
}
