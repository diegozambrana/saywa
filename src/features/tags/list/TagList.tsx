"use client";

import { MainContainer } from "@/components/layout/container";
import {
  CustomTable,
  type CustomTableColumn,
  type TableAction,
} from "@/components/Table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/Dialog";
import { BREADCRUMB } from "@/components/Breadcrumb";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import type { Tag } from "@/types";
import { useTagList } from "./hooks/useTagList";

interface TagListProps {
  initialTags: Tag[];
}

export const TagList = ({ initialTags }: TagListProps) => {
  const router = useRouter();
  const {
    tagList,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    tagToDelete,
    setTagToDelete,
    handleDelete,
    handleCloseDialog,
  } = useTagList(initialTags);

  const columns: CustomTableColumn<Tag>[] = [
    {
      accessorKey: "name",
      header: "NAME",
    },
    {
      accessorKey: "slug",
      header: "SLUG",
    },
    {
      accessorKey: "active",
      header: "STATUS",
      value: (row) => (
        <Badge variant={row.active ? "default" : "outline"}>
          {row.active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
  ];

  const handleAction = (row: Tag, action: TableAction) => {
    switch (action) {
      case "view":
        router.push(`/admin/tags/${row.id}`);
        break;
      case "edit":
        router.push(`/admin/tags/${row.id}/edit`);
        break;
      case "delete":
        setTagToDelete(row);
        setDeleteDialogOpen(true);
        break;
    }
  };

  return (
    <MainContainer
      title="Tags"
      breadcrumb={BREADCRUMB.TAG_LIST}
      action={
        <Button onClick={() => router.push("/admin/tags/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Tag
        </Button>
      }
      loading={loading}
      error={error || undefined}
    >
      <CustomTable
        data={tagList}
        columns={columns}
        actions={["view", "edit", "delete"]}
        onAction={handleAction}
        searchable
        searchPlaceholder="Search tags..."
        searchKey="name"
        pagination
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        title="Delete Tag"
        description={`Are you sure you want to delete "${tagToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </MainContainer>
  );
};
