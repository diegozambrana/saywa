import { ProfileComponent } from "@/features/profile";
import { getFullProfile } from "@/actions/user/UserActions";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export default async function ProfilePage() {
  await connection();

  const profile = await getFullProfile();

  if (!profile) {
    redirect("/auth/login");
  }

  return <ProfileComponent profile={profile} />;
}
