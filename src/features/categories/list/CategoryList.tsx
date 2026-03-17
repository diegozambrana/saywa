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
import type { Category } from "@/types";
import { useCategoryList } from "./hooks/useCategoryList";

interface CategoryListProps {
  initialCategories: Category[];
}

export const CategoryList = ({ initialCategories }: CategoryListProps) => {
  const router = useRouter();
  const {
    categoryList,
    loading,
    error,
    deleteDialogOpen,
    setDeleteDialogOpen,
    categoryToDelete,
    setCategoryToDelete,
    handleDelete,
    handleCloseDialog,
  } = useCategoryList(initialCategories);

  const columns: CustomTableColumn<Category>[] = [
    {
      accessorKey: "name",
      header: "NAME",
    },
    {
      accessorKey: "slug",
      header: "SLUG",
    },
    {
      accessorKey: "parent",
      header: "PARENT CATEGORY",
      value: (row) => row.parent?.name || "-",
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

  const handleAction = (row: Category, action: TableAction) => {
    switch (action) {
      case "view":
        router.push(`/admin/categories/${row.id}`);
        break;
      case "edit":
        router.push(`/admin/categories/${row.id}/edit`);
        break;
      case "delete":
        setCategoryToDelete(row);
        setDeleteDialogOpen(true);
        break;
    }
  };

  return (
    <MainContainer
      title="Categories"
      breadcrumb={BREADCRUMB.CATEGORY_LIST}
      action={
        <Button onClick={() => router.push("/admin/categories/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      }
      loading={loading}
      error={error || undefined}
    >
      <CustomTable
        data={categoryList}
        columns={columns}
        actions={["view", "edit", "delete"]}
        onAction={handleAction}
        searchable
        searchPlaceholder="Search categories..."
        searchKey="name"
        pagination
      />

      <ConfirmDialog
        open={deleteDialogOpen}
        onClose={handleCloseDialog}
        title="Delete Category"
        description={`Are you sure you want to delete "${categoryToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDelete}
        variant="destructive"
      />
    </MainContainer>
  );
};
