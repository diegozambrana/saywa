"use client";

import { useRouter } from "next/navigation";
import { MainContainer } from "@/components/layout/container";
import { BREADCRUMB } from "@/components/Breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useTagDetail } from "./hooks/useTagDetail";

interface TagDetailProps {
  tagId: string;
}

export const TagDetail = ({ tagId }: TagDetailProps) => {
  const router = useRouter();
  const { tag, loading, error } = useTagDetail(tagId);

  if (!tag) {
    return (
      <MainContainer
        title="Tag Detail"
        breadcrumb={BREADCRUMB.TAG_DETAIL}
        loading={loading}
        error={error || undefined}
      >
        <div />
      </MainContainer>
    );
  }

  return (
    <MainContainer
      title="Tag Detail"
      breadcrumb={BREADCRUMB.TAG_DETAIL}
      loading={loading}
      error={error || undefined}
      action={
        <Button onClick={() => router.push(`/admin/tags/${tagId}/edit`)}>
          <Edit className="mr-2 h-4 w-4" />
          Edit Tag
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
              <p className="mb-1 text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{tag.name}</p>
            </div>

            <div>
              <p className="mb-1 text-sm text-muted-foreground">Slug</p>
              <p className="font-mono text-sm">{tag.slug}</p>
            </div>

            <div>
              <p className="mb-1 text-sm text-muted-foreground">Status</p>
              <Badge variant={tag.active ? "default" : "outline"}>
                {tag.active ? "Active" : "Inactive"}
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
              <p className="mb-1 text-sm text-muted-foreground">Created at</p>
              <p className="font-medium">{new Date(tag.created_at).toLocaleString()}</p>
            </div>
            <div>
              <p className="mb-1 text-sm text-muted-foreground">Updated at</p>
              <p className="font-medium">{new Date(tag.updated_at).toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainContainer>
  );
};
