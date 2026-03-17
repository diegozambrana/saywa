"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function AdminLayoutHandler() {
  const pathname = usePathname();

  // Detectar si estamos en una ruta de admin
  // Las rutas de admin están bajo app/(admin)/
  const isAdminRoute = pathname
    ? (pathname.startsWith("/admin") ||
      pathname.startsWith("/profile"))
    : false;

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isAdminRoute) {
      // Agregar overflow-hidden solo en rutas de admin
      html.classList.add("overflow-hidden");
      body.classList.add("overflow-hidden");
    } else {
      // Remover overflow-hidden en otras rutas
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    }

    // Cleanup: remover las clases cuando el componente se desmonte
    return () => {
      html.classList.remove("overflow-hidden");
      body.classList.remove("overflow-hidden");
    };
  }, [isAdminRoute]);

  useEffect(() => {
    if (!isAdminRoute) return;

    let previousHeight = window.visualViewport?.height ?? window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.visualViewport?.height ?? window.innerHeight;
      const heightDiff = currentHeight - previousHeight;
      const adminLayout = document.getElementById('admin-layout');

      // Cambio significativo de altura (>100px para evitar falsos positivos)
      if (Math.abs(heightDiff) > 100) {
        if (heightDiff > 0) {
          // Viewport CRECIÓ = teclado se cerró → resetear scroll del window
          setTimeout(() => {
            window.scrollTo(0, 0);
          }, 100);
        } else {
          // Viewport DECRECIÓ = teclado se abrió → scroll al elemento enfocado en admin-layout
          const focusedElement = document.activeElement as HTMLElement;
          if (adminLayout && focusedElement && adminLayout.contains(focusedElement)) {
            setTimeout(() => {
              focusedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
          }
        }
      }

      previousHeight = currentHeight;
    };

    window.visualViewport?.addEventListener('resize', handleResize);
    return () => {
      window.visualViewport?.removeEventListener('resize', handleResize);
    };
  }, [isAdminRoute]);

  return null;
}
