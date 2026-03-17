export enum BREADCRUMB {
  BUSINESS_DETAIL = "BUSINESS_DETAIL",
  BUSINESS_CREATE = "BUSINESS_CREATE",
  BUSINESS_EDIT = "BUSINESS_EDIT",
  CATEGORY_LIST = "CATEGORY_LIST",
  CATEGORY_DETAIL = "CATEGORY_DETAIL",
  CATEGORY_CREATE = "CATEGORY_CREATE",
  CATEGORY_EDIT = "CATEGORY_EDIT",
  PROFILE = "PROFILE",
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export const BREADCRUMB_CONFIG: Record<BREADCRUMB, BreadcrumbItem[]> = {
  [BREADCRUMB.BUSINESS_DETAIL]: [
    { label: "Negocios", href: "/business" },
    { label: "Detalle de Negocio", href: "#" },
  ],
  [BREADCRUMB.BUSINESS_CREATE]: [
    { label: "Negocios", href: "/business" },
    { label: "Crear Negocio", href: "#" },
  ],
  [BREADCRUMB.BUSINESS_EDIT]: [
    { label: "Negocios", href: "/business" },
    { label: "Editar Negocio", href: "#" },
  ],
  [BREADCRUMB.CATEGORY_LIST]: [
    { label: "Dashboard", href: "/admin" },
    { label: "Categories", href: "#" },
  ],
  [BREADCRUMB.CATEGORY_DETAIL]: [
    { label: "Categories", href: "/admin/categories" },
    { label: "Category Detail", href: "#" },
  ],
  [BREADCRUMB.CATEGORY_CREATE]: [
    { label: "Categories", href: "/admin/categories" },
    { label: "Create Category", href: "#" },
  ],
  [BREADCRUMB.CATEGORY_EDIT]: [
    { label: "Categories", href: "/admin/categories" },
    { label: "Edit Category", href: "#" },
  ],
  [BREADCRUMB.PROFILE]: [
    { label: "Admin", href: "/admin" },
    { label: "Mi Perfil", href: "#" },
  ],
};
