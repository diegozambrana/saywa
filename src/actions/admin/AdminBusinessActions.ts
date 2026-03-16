"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { BusinessServices } from "@/services/BusinessService";
import type {
  BusinessWithCounts,
  BusinessWithDetails,
} from "@/types/AdminBusiness";

/**
 * Verifica si el usuario actual es administrador
 */
async function verifyAdminAccess(): Promise<void> {
  await cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    throw new Error("Error al obtener perfil");
  }

  if (profile.role !== "ADMIN") {
    throw new Error("Acceso denegado: solo administradores");
  }
}

/**
 * Obtiene todos los businesses con conteos (solo para admin)
 */
export async function getAllBusinessesWithCountsAction(): Promise<
  BusinessWithCounts[]
> {
  try {
    await verifyAdminAccess();
    const supabase = await createClient();
    const businessService = new BusinessServices(supabase);
    return await businessService.getAllBusinessesWithCounts();
  } catch (error) {
    console.error("Error en getAllBusinessesWithCountsAction:", error);
    throw error;
  }
}

/**
 * Obtiene un business con sus detalles completos (solo para admin)
 */
export async function getBusinessWithDetailsAction(
  businessId: string,
): Promise<BusinessWithDetails> {
  try {
    await verifyAdminAccess();
    const supabase = await createClient();
    const businessService = new BusinessServices(supabase);
    return await businessService.getBusinessWithDetails(businessId);
  } catch (error) {
    console.error("Error en getBusinessWithDetailsAction:", error);
    throw error;
  }
}
