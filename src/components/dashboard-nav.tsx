"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { LogOut, MessageCircle, User } from "lucide-react";
import { useSession } from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useUserProfileStore } from "@/stores/UserProfileStore";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function DashboardNav({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) {
  const path = usePathname();
  const { isMinimized } = useSidebar();
  const { signOut, session, loading } = useSession();
  const router = useRouter();
  const { isAdmin } = useUserProfileStore();

  if (!items?.length) {
    return null;
  }

  // Separar items regulares de items de admin
  const regularItems = items.filter((item) => !item.adminOnly);
  const adminItems = items.filter((item) => item.adminOnly);

  const renderNavItem = (item: NavItem, index: number) => {
    const Icon = Icons[item.icon || "arrowRight"];
    return (
      item.href && (
        <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              href={item.disabled ? "/" : item.href}
              className={cn(
                "flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                path === item.href ? "bg-accent" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <Icon className={`ml-3 size-5 flex-none`} />

              {isMobileNav || (!isMinimized && !isMobileNav) ? (
                <span className="mr-2 truncate">{item.title}</span>
              ) : (
                ""
              )}
            </Link>
          </TooltipTrigger>
          <TooltipContent
            align="center"
            side="right"
            sideOffset={8}
            className={!isMinimized ? "hidden" : "inline-block"}
          >
            {item.title}
          </TooltipContent>
        </Tooltip>
      )
    );
  };

  return (
    <nav className="grid items-start gap-2">
      <TooltipProvider>
        {/* Items regulares */}
        {regularItems.map((item, index) => renderNavItem(item, index))}

        {/* Sección de Admin */}
        {isAdmin() && adminItems.length > 0 && (
          <>
            <div className="mt-4 mb-2">
              {isMobileNav || (!isMinimized && !isMobileNav) ? (
                <div className="px-3">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Admin
                  </h3>
                </div>
              ) : (
                <div className="border-t mx-3" />
              )}
            </div>
            {adminItems.map((item, index) => renderNavItem(item, index))}
          </>
        )}
        <div className="absolute bottom-4">
          <button
            type="button"
            className="flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground w-full text-left"
            onClick={() => {
              if (setOpen) setOpen(false);
              router.push("/support/contact-us");
            }}
          >
            <MessageCircle className="ml-3 size-5 flex-none" />
            {isMobileNav || (!isMinimized && !isMobileNav) ? (
              <span className="mr-2 truncate">contact</span>
            ) : (
              ""
            )}
          </button>
          <div
            className="flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium"
            role="status"
            aria-label="Usuario actual"
          >
            <User className="ml-3 size-5 flex-none" />

            {isMobileNav || (!isMinimized && !isMobileNav) ? (
              <span className="mr-2 truncate">
                {loading ? "Cargando..." : session?.user?.email?.split("@")[0] || "Usuario"}
              </span>
            ) : (
              ""
            )}
          </div>
          <button
            type="button"
            className={cn(
              "cursor-pointer flex items-center gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground w-full text-left"
            )}
            onClick={() => {
              if (setOpen) setOpen(false);
              signOut();
              router.push("/");
            }}
          >
            <LogOut className="ml-3 size-5 flex-none" />

            {isMobileNav || (!isMinimized && !isMobileNav) ? (
              <span className="mr-2 truncate">Sign Out</span>
            ) : (
              ""
            )}
          </button>
        </div>
      </TooltipProvider>
    </nav>
  );
}
