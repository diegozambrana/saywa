import { TagDetail } from "@/features/tags";

interface TagDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TagDetailPage({ params }: TagDetailPageProps) {
  const { id } = await params;
  return <TagDetail tagId={id} />;
}
