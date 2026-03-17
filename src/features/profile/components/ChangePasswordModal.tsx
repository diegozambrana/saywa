"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Modal } from "@/components/Dialog/Modal";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { changePassword } from "@/actions/user/UserActions";
import { toast } from "sonner";

const changePasswordSchema = z
  .object({
    current_password: z.string().min(1, "La contraseña actual es requerida"),
    new_password: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    confirm_password: z.string().min(1, "Confirma tu nueva contraseña"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Las contraseñas no coinciden",
    path: ["confirm_password"],
  });

type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

interface ChangePasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ChangePasswordModal = ({
  open,
  onOpenChange,
}: ChangePasswordModalProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("current_password", data.current_password);
        formData.append("new_password", data.new_password);

        await changePassword(formData);

        setSuccess(true);
        toast.success("Contraseña cambiada exitosamente");

        // Limpiar el formulario
        form.reset();

        // Cerrar el modal después de 2 segundos
        setTimeout(() => {
          onOpenChange(false);
          setSuccess(false);
        }, 2000);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al cambiar la contraseña";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    });
  };

  const handleClose = (open: boolean) => {
    if (!isPending) {
      onOpenChange(open);
      if (!open) {
        // Reset form and states when closing
        form.reset();
        setError(null);
        setSuccess(false);
      }
    }
  };

  return (
    <Modal
      open={open}
      onOpenChange={handleClose}
      title="Cambiar Contraseña"
      description="Ingresa tu contraseña actual y la nueva contraseña"
      size="sm"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-900 border-green-200">
              <AlertDescription>
                ¡Contraseña cambiada exitosamente!
              </AlertDescription>
            </Alert>
          )}

          <FormField
            control={form.control}
            name="current_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Contraseña Actual <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="new_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nueva Contraseña <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirm_password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Confirmar Nueva Contraseña <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleClose(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Cambiando..." : "Cambiar Contraseña"}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};
