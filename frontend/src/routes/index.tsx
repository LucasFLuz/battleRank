import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { DashboardPage } from "../pages/Dashboard";
import { WorkoutsPage } from "../pages/Workouts";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard Geral",
  "/workouts": "Meus Treinos",
  "/rankings": "Rankings de Atletas",
  "/community": "Feed Social",
};

export const AppRoutes: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const pageTitle = PAGE_TITLES[location.pathname] ?? "battleRank";

  useEffect(() => {
    document.title = `${pageTitle} - battleRank`;
  }, [pageTitle]);

  return (
    <div className="flex min-h-screen bg-dark-900 text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-emerald-700 focus:px-4 focus:py-3 focus:text-white focus:outline-none focus:ring-2 focus:ring-emerald-300"
      >
        Pular para o conteúdo principal
      </a>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} title={pageTitle} />
        <main id="main-content" tabIndex={-1} className="flex-1">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/workouts" element={<WorkoutsPage />} />
            {/* Redirecionamento padrão para /workouts ou dashboard */}
            <Route path="*" element={<WorkoutsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
