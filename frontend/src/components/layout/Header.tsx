import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, User, Settings, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onOpenSidebar: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar, title = "Meus Treinos" }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 bg-dark-900/80 backdrop-blur-md border-b border-dark-700">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
          aria-label="Abrir navegação"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors relative"
          aria-label="Notificações"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500" />
        </button>

        <Link
          to="/profile"
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
          aria-label="Perfil"
        >
          <Settings className="w-4 h-4" />
        </Link>

        {isAuthenticated && user ? (
          <div className="flex items-center gap-2.5 pl-3 border-l border-dark-700">
            <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 flex items-center justify-center font-bold text-xs uppercase">
              {user.name.charAt(0) || <User className="w-4 h-4" />}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-200 leading-tight">{user.name}</p>
              <p className="text-[10px] text-slate-400">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-dark-800 transition-colors ml-1"
              title="Sair da conta"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="pl-3 border-l border-dark-700">
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/30 hover:bg-brand-500/20 text-xs font-bold transition-all"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Entrar</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};
