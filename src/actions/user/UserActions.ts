"use server";

import { createClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import type { UserRole } from "@/stores/UserProfileStore";
import type { Plan } from "@/types/Profile";

export interface UserProfile {
  id: string;
  role: UserRole;
  email?: string;
  full_name?: string;
  onboarding_completed: boolean;
  plan: Plan;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  await cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return null;
  }

  // Obtener el perfil desde la tabla profiles donde id = user.id
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, role, email, full_name, onboarding_completed, plan")
    .eq("id", user.id)
    .single();

  if (profileError || !profile) {
    return null;
  }

  return {
    id: profile.id,
    role: (profile.role as UserRole) || "USER",
    email: profile.email || user.email,
    full_name: profile.full_name || null,
    onboarding_completed: profile.onboarding_completed || false,
    plan: (profile.plan as Plan) || "FREE",
  };
}

export async function completeOnboarding() {
  await cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ onboarding_completed: true })
    .eq("id", user.id);

  if (error) {
    throw error;
  }

  return { success: true };
}

export async function getFullProfile() {
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
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw new Error("Error al obtener el perfil");
  }

  return profile;
}

export async function updateProfile(formData: FormData) {
  await cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  const email = formData.get("email") as string;
  const fullName = formData.get("full_name") as string;
  const avatarUrl = formData.get("avatar_url") as string | null;

  // Validaciones
  if (!email) {
    throw new Error("El email es requerido");
  }

  if (!fullName) {
    throw new Error("El nombre completo es requerido");
  }

  // Actualizar perfil
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      email,
      full_name: fullName,
      avatar_url: avatarUrl || null,
    })
    .eq("id", user.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  // Si el email cambió, también actualizar en auth.users
  if (email !== user.email) {
    const { error: authUpdateError } = await supabase.auth.updateUser({
      email,
    });

    if (authUpdateError) {
      throw new Error("Error al actualizar el email de autenticación");
    }
  }

  return { success: true };
}

export async function changePassword(formData: FormData) {
  await cookies();
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("No autenticado");
  }

  const currentPassword = formData.get("current_password") as string;
  const newPassword = formData.get("new_password") as string;

  // Validaciones
  if (!currentPassword) {
    throw new Error("La contraseña actual es requerida");
  }

  if (!newPassword) {
    throw new Error("La nueva contraseña es requerida");
  }

  if (newPassword.length < 6) {
    throw new Error("La nueva contraseña debe tener al menos 6 caracteres");
  }

  // Verificar la contraseña actual intentando hacer sign in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email!,
    password: currentPassword,
  });

  if (signInError) {
    throw new Error("La contraseña actual es incorrecta");
  }

  // Cambiar la contraseña
  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    throw new Error("Error al cambiar la contraseña");
  }

  return { success: true };
}
