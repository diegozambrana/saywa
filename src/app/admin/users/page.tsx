// import { getAllUsersAction } from "@/actions/admin";
// import { UsersList } from "@/features/admin/users";
// import { redirect } from "next/navigation";
// import { getUserProfile } from "@/actions/user/UserActions";

export const metadata = {
  title: "Gestión de Usuarios | Admin",
  description: "Administración de usuarios de la plataforma",
};

export default async function AdminUsersPage() {
  // Verificar que el usuario está autenticado y es admin
  // const userProfile = await getUserProfile();

  // if (!userProfile) {
  //   redirect("/sign-in");
  // }

  // if (userProfile.role !== "ADMIN") {
  //   redirect("/dashboard");
  // }

  // // Obtener todos los usuarios
  // const users = await getAllUsersAction();

  // return <UsersList initialUsers={users} />;

  return <div>Users</div>;
}
