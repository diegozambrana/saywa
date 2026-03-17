export type Tag = {
  id: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  name: string;
  slug: string;
};

export type TagInsertData = {
  name: string;
  slug: string;
  active?: boolean;
};

export type TagUpdateData = Partial<TagInsertData>;
