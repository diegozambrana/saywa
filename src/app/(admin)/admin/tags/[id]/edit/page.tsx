import { getTagById } from "@/actions/tag";
import { TagCreate } from "@/features/tags";

interface TagEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function TagEditPage({ params }: TagEditPageProps) {
  const { id } = await params;
  const tag = await getTagById(id);

  return <TagCreate tagId={id} initialTag={tag} />;
}
