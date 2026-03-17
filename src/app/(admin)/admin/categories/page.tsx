import { getCategories } from "@/actions/category";
import { CategoryList } from "@/features/categories";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return <CategoryList initialCategories={categories} />;
}
