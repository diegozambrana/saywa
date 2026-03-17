import Link from "next/link";
import { Button } from "./ui/button";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "./user-menu";
import { FC } from "react";


interface AuthButtonProps {
  isPublic?: boolean;
}


export const AuthButton: FC<AuthButtonProps> = async ({ isPublic = false }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex gap-2">
        <Button asChild size="sm" variant={"outline"}>
          <Link href="/auth/login">Sign in</Link>
        </Button>
        <Button asChild size="sm" variant={"default"}>
          <Link href="/auth/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  // Obtener el perfil completo con avatar y nombre
  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, avatar_url")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex items-center gap-4">
      {isPublic && user && <Button asChild size="sm" variant={"outline"}>
        <Link href="/admin">Admin</Link>
      </Button>}
      <UserMenu
        email={user.email || ""}
        fullName={profile?.full_name}
        avatarUrl={profile?.avatar_url}
      />
    </div>
  );
}
