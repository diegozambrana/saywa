import { getCategories, getCategoryById } from "@/actions/category";
import { CategoryCreate } from "@/features/categories";

interface CategoryEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryEditPage({ params }: CategoryEditPageProps) {
  const { id } = await params;
  const [categories, category] = await Promise.all([
    getCategories(),
    getCategoryById(id),
  ]);

  return (
    <CategoryCreate
      categories={categories}
      categoryId={id}
      initialCategory={category}
    />
  );
}
