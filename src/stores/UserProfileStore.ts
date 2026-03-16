import { create } from "zustand";
import type { Plan } from "@/types/Profile";

export type UserRole = "USER" | "ADMIN";

export interface UserProfile {
  id: string;
  role: UserRole;
  email?: string;
  full_name?: string;
  onboarding_completed: boolean;
  plan: Plan;
}

interface UserProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  setProfile: (profile: UserProfile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  isAdmin: () => boolean;
  canCreateBusiness: (currentBusinessCount: number) => boolean;
}

const defaultState = {
  profile: null,
  loading: true,
  error: null,
};

export const useUserProfileStore = create<UserProfileState>((set, get) => ({
  ...defaultState,

  setProfile: (profile) => set({ profile, loading: false }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error, loading: false }),

  reset: () => set(defaultState),

  isAdmin: () => {
    const { profile } = get();
    return profile?.role === "ADMIN";
  },

  canCreateBusiness: (currentBusinessCount: number) => {
    const { profile } = get();
    if (!profile) return false;

    // ADMIN puede crear sin límite
    if (profile.role === "ADMIN") return true;

    if (profile.role === "USER") {
      // USER con plan FREE: máximo 1 negocio
      if (profile.plan === "FREE") {
        return currentBusinessCount < 1;
      }

      // USER con plan PRO: máximo 3 negocios
      if (profile.plan === "PRO") {
        return currentBusinessCount < 3;
      }
    }

    // USER con plan ENTERPRISE: sin límite
    return true;
  },
}));
