import { CategoryDetail } from "@/features/categories";

interface CategoryDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryDetailPage({
  params,
}: CategoryDetailPageProps) {
  const { id } = await params;
  return <CategoryDetail categoryId={id} />;
}
