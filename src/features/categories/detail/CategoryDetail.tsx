"use client";

import { useRouter } from "next/navigation";
import { MainContainer } from "@/components/layout/container";
import { BREADCRUMB } from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useCategoryDetail } from "./hooks/useCategoryDetail";

interface CategoryDetailProps {
  categoryId: string;
}

export const CategoryDetail = ({ categoryId }: CategoryDetailProps) => {
  const router = useRouter();
  const { category, loading, error } = useCategoryDetail(categoryId);

  if (!category) {
    return (
      <MainContainer
        title="Category Detail"
        breadcrumb={BREADCRUMB.CATEGORY_DETAIL}
        loading={loading}
        error={error || undefined}
      >
        <div />
      </MainContainer>
    );
  }

  return (
    <MainContainer
      title="Category Detail"
      breadcrumb={BREADCRUMB.CATEGORY_DETAIL}
      loading={loading}
      error={error || undefined}
      action={
        <Button onClick={() => router.push(`/admin/categories/${categoryId}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Category
        </Button>
      }
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Name</p>
              <p className="font-medium">{category.name}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Slug</p>
              <p className="font-mono text-sm">{category.slug}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Description</p>
              <p className="text-sm">
                {category.description || "No description available."}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Parent category</p>
              <p className="font-medium">{category.parent?.name || "None"}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge variant={category.active ? "default" : "outline"}>
                {category.active ? "Active" : "Inactive"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Timestamps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Created at</p>
              <p className="font-medium">
                {new Date(category.created_at).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Updated at</p>
              <p className="font-medium">
                {new Date(category.updated_at).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainContainer>
  );
};
