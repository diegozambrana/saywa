import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "dashboard",
    adminOnly: true,
  },
  {
    title: "Support: messages",
    href: "/admin/messages",
    icon: "messages",
    label: "support-messages",
    adminOnly: true,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "users",
    label: "users",
    adminOnly: true,
  },
];
