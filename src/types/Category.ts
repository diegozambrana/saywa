export type Category = {
  id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  parent?: Category | null;
};

export type CategoryInsertData = {
  name: string;
  slug: string;
  description?: string | null;
  parent_id?: string | null;
  active?: boolean;
};

export type CategoryUpdateData = Partial<CategoryInsertData>;
