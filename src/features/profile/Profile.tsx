"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MainContainer } from "@/components/layout/container";
import { BREADCRUMB } from "@/components/Breadcrumb";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { updateProfile } from "@/actions/user/UserActions";
import type { Profile } from "@/types";
import { toast } from "sonner";
import { ChangePasswordModal } from "./components";

const profileSchema = z.object({
  email: z
    .string()
    .min(1, "El email es requerido")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: "Ingresa un email válido",
    }),
  full_name: z.string().min(1, "El nombre completo es requerido"),
  avatar_url: z.string().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileProps {
  profile: Profile;
}

export const ProfileComponent = ({ profile }: ProfileProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: profile.email || "",
      full_name: profile.full_name || "",
      avatar_url: profile.avatar_url || null,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setError(null);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("full_name", data.full_name);
        if (data.avatar_url) {
          formData.append("avatar_url", data.avatar_url);
        }

        await updateProfile(formData);
        toast.success("Perfil actualizado exitosamente");
        router.refresh();
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al actualizar el perfil";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  return (
    <MainContainer title="Mi Perfil" breadcrumb={BREADCRUMB.PROFILE} description={
      `Plan: ${profile.plan}`
    }>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Información Personal */}
          <Card>
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="avatar_url"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <ImageDropzone
                        label="Avatar"
                        value={field.value}
                        onChange={field.onChange}
                        path={`${profile.id}`}
                        bucket="profile"
                        aspectRatio="square"
                        maxWidthPx={250}
                        maxSizeMB={5}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Nombre Completo <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Juan Pérez"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Cuenta */}
          <Card>
            <CardHeader>
              <CardTitle>Cuenta</CardTitle>
              <CardDescription>
                Gestiona la seguridad de tu cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Contraseña</h4>
                  <p className="text-sm text-muted-foreground">
                    Cambia tu contraseña para mantener tu cuenta segura
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsChangePasswordOpen(true)}
                  disabled={isPending}
                >
                  Cambiar contraseña
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin")}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : "Guardar Cambios"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Modal para cambiar contraseña */}
      <ChangePasswordModal
        open={isChangePasswordOpen}
        onOpenChange={setIsChangePasswordOpen}
      />
    </MainContainer>
  );
};
