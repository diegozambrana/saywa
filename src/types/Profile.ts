export type UserRole = "USER" | "STAFF" | "ADMIN";
export type Plan = "FREE" | "PRO" | "ENTERPRISE";

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  username: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
  role: UserRole;
  onboarding_completed: boolean;
  help_flow_displayed: boolean;
  plan: Plan;
};

export type ProfileUpdateData = {
  email?: string;
  full_name?: string;
  avatar_url?: string | null;
};
