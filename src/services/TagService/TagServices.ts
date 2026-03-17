import { SupabaseClient } from "@supabase/supabase-js";
import type { Tag } from "@/types";

export class TagServices {
  constructor(private readonly supabase: SupabaseClient) {}

  async getTags(): Promise<Tag[]> {
    const { data, error } = await this.supabase
      .from("tags")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return (data ?? []) as Tag[];
  }

  async getTagById(id: string): Promise<Tag> {
    const { data, error } = await this.supabase
      .from("tags")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data as Tag;
  }
}
