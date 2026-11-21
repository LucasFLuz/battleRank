import React from "react";
import { NavLink } from "react-router-dom";
import { Dumbbell, LayoutDashboard, Trophy, Users, Flame, X } from "lucide-react";
import { clsx } from "clsx";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navItems = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/workouts", label: "Meus Treinos", icon: Dumbbell },
    { to: "/rankings", label: "Rankings", icon: Trophy, badge: "Em breve" },
    { to: "/community", label: "Feed Social", icon: Users, badge: "Em breve" },
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
          "fixed top-0 bottom-0 left-0 z-40 w-64 bg-dark-850 border-r border-dark-700 flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-dark-700">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/30">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-black tracking-wider text-white">battle<span className="text-brand-400">Rank</span></span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider uppercase">Social Fitness</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white hover:bg-dark-700"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all group",
                    isActive
                      ? "bg-brand-500/10 text-brand-400 border border-brand-500/20 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-dark-800"
                  )
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 transition-colors group-hover:text-brand-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-dark-700 text-slate-400">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-dark-700">
          <div className="p-3 rounded-xl bg-dark-800/60 border border-dark-700/80">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <p className="text-xs font-semibold text-slate-200">battleRank Club</p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Mantenha sua rotina de treinos ativa para subir nas ligas de atletas.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
