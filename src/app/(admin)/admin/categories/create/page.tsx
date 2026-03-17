import { getCategories } from "@/actions/category";
import { CategoryCreate } from "@/features/categories";

export default async function CategoryCreatePage() {
  const categories = await getCategories();
  return <CategoryCreate categories={categories} />;
}
