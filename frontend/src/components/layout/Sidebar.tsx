import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Dumbbell,
  LayoutDashboard,
  Trophy,
  Users,
  Flame,
  X,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { clsx } from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems: Array<{ to: string; label: string; icon: React.ElementType }> = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/workouts", label: "Meus Treinos", icon: Dumbbell },
    { to: "/history", label: "Histórico", icon: History },
    { to: "/rankings", label: "Rankings", icon: Trophy },
    { to: "/community", label: "Feed Social", icon: Users },
    { to: "/profile", label: "Perfil", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={clsx(
          "fixed top-0 bottom-0 left-0 z-40 bg-dark-850 border-r border-dark-700 flex flex-col transition-all duration-300 ease-in-out",
          "lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full",
          collapsed ? "lg:w-[68px]" : "lg:w-64",
          "w-64"
        )}
      >
        {/* Brand Header */}
        <div
          className={clsx(
            "flex items-center h-16 border-b border-dark-700 shrink-0 transition-all duration-300",
            collapsed ? "lg:justify-center lg:px-3 px-6 justify-between" : "px-6 justify-between"
          )}
        >
          <div className={clsx("flex items-center gap-2.5 overflow-hidden", collapsed && "lg:hidden")}>
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/30 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white whitespace-nowrap">
                battle<span className="text-brand-400">Rank</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                Social Fitness
              </span>
            </div>
          </div>

          {/* Collapsed: só o ícone da chama */}
          {collapsed && (
            <div className="hidden lg:flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/30">
              <Flame className="w-5 h-5" />
            </div>
          )}

          <div className="flex items-center gap-1">
            {/* Botão de fechar — mobile only */}
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors"
              aria-label="Fechar menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Botão de encolher — desktop only */}
            <button
              onClick={() => setCollapsed((c) => !c)}
              className={clsx(
                "hidden lg:flex items-center justify-center p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700 transition-colors",
                collapsed && "mx-auto"
              )}
              aria-label={collapsed ? "Expandir menu" : "Encolher menu"}
              title={collapsed ? "Expandir" : "Encolher"}
            >
              {collapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 py-5 space-y-1 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={onClose}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-3 rounded-xl text-sm font-medium transition-all group relative",
                    collapsed ? "lg:justify-center lg:px-0 lg:py-3 px-3.5 py-2.5" : "px-3.5 py-2.5",
                    isActive
                      ? "bg-brand-500/10 text-brand-400 border border-brand-500/20 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-dark-800 border border-transparent"
                  )
                }
              >
                <Icon className="w-5 h-5 shrink-0 transition-colors group-hover:text-brand-400" />
                <span
                  className={clsx(
                    "whitespace-nowrap transition-all duration-300 overflow-hidden",
                    collapsed ? "lg:w-0 lg:opacity-0" : "w-auto opacity-100"
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Footer — oculto quando encolhido */}
        <div
          className={clsx(
            "border-t border-dark-700 transition-all duration-300 overflow-hidden",
            collapsed ? "lg:py-3 lg:px-2 p-4" : "p-4"
          )}
        >
          {!collapsed ? (
            <div className="p-3 rounded-xl bg-dark-800/60 border border-dark-700/80">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shrink-0" />
                <p className="text-xs font-semibold text-slate-200">battleRank Club</p>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Mantenha sua rotina ativa para subir nas ligas.
              </p>
            </div>
          ) : (
            <div className="hidden lg:flex justify-center">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
