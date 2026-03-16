"use server";

import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { UserService } from "@/services/UserService";
import type { Profile } from "@/types/Profile";

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
 * Obtiene todos los perfiles de usuarios (solo para admin)
 */
export async function getAllUsersAction(): Promise<Profile[]> {
  try {
    await verifyAdminAccess();
    return await UserService.getAllProfiles();
  } catch (error) {
    console.error("Error en getAllUsersAction:", error);
    throw error;
  }
}

/**
 * Obtiene un perfil de usuario por ID (solo para admin)
 */
export async function getUserByIdAction(id: string): Promise<Profile | null> {
  try {
    await verifyAdminAccess();
    return await UserService.getProfileById(id);
  } catch (error) {
    console.error("Error en getUserByIdAction:", error);
    throw error;
  }
}

/**
 * Obtiene estadísticas de usuarios (solo para admin)
 */
export async function getUserStatsAction(): Promise<{
  total: number;
  admins: number;
  users: number;
  withOnboarding: number;
}> {
  try {
    await verifyAdminAccess();
    return await UserService.getUserStats();
  } catch (error) {
    console.error("Error en getUserStatsAction:", error);
    throw error;
  }
}
