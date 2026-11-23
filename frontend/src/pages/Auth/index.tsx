import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Flame, Mail, Lock, User as UserIcon, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "../../components/ui/Button";
import { api } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Fluxo de Login
        const response = await api.post("/auth/login", { email, password });
        login(response.data.token, response.data.user);
        setSuccessMessage("Login realizado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/workouts"), 800);
      } else {
        // Fluxo de Cadastro
        const response = await api.post("/auth/register", { name, email, password });
        login(response.data.token, response.data.user);
        setSuccessMessage("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => navigate("/workouts"), 800);
      }
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { error?: string } } };
      setErrorMessage(
        axiosError.response?.data?.error || "Ocorreu um erro ao processar. Verifique os dados e tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col justify-center items-center p-4 selection:bg-brand-500 selection:text-white">
      {/* Brand Header */}
      <Link to="/" className="flex items-center gap-2.5 mb-8 group">
        <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-brand-500/10 text-brand-400 border border-brand-500/30 group-hover:scale-105 transition-transform">
          <Flame className="w-6 h-6" />
        </div>
        <div>
          <span className="text-2xl font-black tracking-wider text-white">
            battle<span className="text-brand-400">Rank</span>
          </span>
          <span className="block text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
            Social Fitness Platform
          </span>
        </div>
      </Link>

      {/* Card Principal */}
      <div className="w-full max-w-md bg-dark-850 border border-dark-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-brand-500/10 blur-2xl pointer-events-none" />

        {/* Abas Alternadoras */}
        <div className="grid grid-cols-2 p-1 bg-dark-800/80 rounded-xl mb-6 border border-dark-700/60">
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(true);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              isLoginMode
                ? "bg-brand-500 text-dark-900 shadow-md font-extrabold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginMode(false);
              setErrorMessage("");
              setSuccessMessage("");
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              !isLoginMode
                ? "bg-brand-500 text-dark-900 shadow-md font-extrabold"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Criar Conta
          </button>
        </div>

        {/* Título */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {isLoginMode ? "Acesse sua conta" : "Comece sua jornada"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {isLoginMode
              ? "Entre para gerenciar seus treinos e acompanhar sua evolução física."
              : "Crie seu perfil e dispute os rankings de levantamento de peso."}
          </p>
        </div>

        {/* Mensagens de Feedback */}
        {errorMessage && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs mb-4">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginMode && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Nome Completo</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <UserIcon className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome ou apelido de atleta"
                  className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">E-mail</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Senha</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo de 6 caracteres"
                className="w-full pl-10 pr-4 py-2.5 bg-dark-800 border border-dark-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2 gap-2 shadow-lg shadow-brand-500/20"
          >
            <span>{isLoginMode ? "Entrar na Plataforma" : "Criar Minha Conta"}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        {/* Rodapé do Card */}
        <div className="mt-6 pt-4 border-t border-dark-700/60 text-center">
          <p className="text-xs text-slate-400">
            {isLoginMode ? "Ainda não tem conta?" : "Já possui cadastro?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setErrorMessage("");
                setSuccessMessage("");
              }}
              className="text-brand-400 font-semibold hover:underline"
            >
              {isLoginMode ? "Cadastre-se gratuitamente" : "Faça login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
