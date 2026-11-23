import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Card } from "../../components/ui/Card";

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres").max(100, "Nome deve ter no máximo 100 caracteres").optional(),
  avatarUrl: z.string().url("URL do avatar inválida.").optional().nullable(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Nova senha deve ter pelo menos 6 caracteres").max(100, "Nova senha deve ter no máximo 100 caracteres").optional(),
  confirmNewPassword: z.string().optional(),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmNewPassword) {
    return false;
  }
  if (data.newPassword && !data.currentPassword) {
    return false;
  }
  return true;
}, {
  message: "As senhas não coincidem ou senha atual é obrigatória",
  path: ["confirmNewPassword"],
});

type ProfileFormData = z.infer<typeof profileSchema>;

export const ProfilePage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "Atleta battleRank",
      avatarUrl: "",
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implementar updateProfile quando auth for refeito
      console.log("Atualizar perfil:", data);
      setShowPasswordFields(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 py-12 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-100">Perfil do Atleta</h1>
            <p className="text-slate-400 mt-1">Gerencie suas informações pessoais</p>
          </div>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="border-b border-slate-700 pb-6">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">Informações Pessoais</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
                    Nome completo
                  </label>
                  <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    error={errors.name?.message}
                    disabled={isSubmitting}
                    defaultValue="Atleta battleRank"
                  />
                </div>

                <div>
                  <label htmlFor="avatarUrl" className="block text-sm font-medium text-slate-300 mb-1.5">
                    URL do Avatar
                  </label>
                  <Input
                    id="avatarUrl"
                    type="url"
                    placeholder="https://exemplo.com/avatar.png"
                    {...register("avatarUrl")}
                    error={errors.avatarUrl?.message}
                    disabled={isSubmitting}
                    defaultValue=""
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-slate-700 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-100">Alterar Senha</h2>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowPasswordFields(!showPasswordFields);
                    if (!showPasswordFields) {
                      reset({ name: "Atleta battleRank", avatarUrl: "", currentPassword: "", newPassword: "", confirmNewPassword: "" });
                    }
                  }}
                >
                  {showPasswordFields ? "Cancelar" : "Alterar senha"}
                </Button>
              </div>

              {showPasswordFields && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Senha atual
                    </label>
                    <Input
                      id="currentPassword"
                      type="password"
                      placeholder="••••••••"
                      {...register("currentPassword")}
                      error={errors.currentPassword?.message}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Nova senha
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="••••••••"
                      {...register("newPassword")}
                      error={errors.newPassword?.message}
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-slate-300 mb-1.5">
                      Confirmar nova senha
                    </label>
                    <Input
                      id="confirmNewPassword"
                      type="password"
                      placeholder="••••••••"
                      {...register("confirmNewPassword")}
                      error={errors.confirmNewPassword?.message}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isSubmitting} size="lg">
                {isSubmitting ? "Salvando..." : "Salvar alterações"}
              </Button>
            </div>
          </form>
        </Card>

        <Card className="p-6 border-red-700/50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-300">Zona de Perigo</h3>
              <p className="text-slate-400 text-sm mt-1">Ações irreversíveis</p>
            </div>
            <Button variant="ghost" className="text-red-400 hover:bg-red-900/20">
              Excluir conta
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};