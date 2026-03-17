import { getTags } from "@/actions/tag";
import { TagList } from "@/features/tags";

export default async function TagsPage() {
  const tags = await getTags();
  return <TagList initialTags={tags} />;
}
