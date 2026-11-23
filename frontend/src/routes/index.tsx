import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "../components/layout/Header";
import { DashboardPage } from "../pages/Dashboard";
import { WorkoutsPage } from "../pages/Workouts";
import { WorkoutDetailPage } from "../pages/WorkoutDetail";
import { WorkoutLivePage } from "../pages/WorkoutLive";
import { HistoryPage } from "../pages/History";
import { ProfilePage } from "../pages/Profile";
import { RankingsPage } from "../pages/Rankings";
import { CommunityPage } from "../pages/Community";
import { AuthPage } from "../pages/Auth";
import { useAuth } from "../context/AuthContext";

const PAGE_TITLES: Record<string, string> = {
  "/": "Dashboard Geral",
  "/workouts": "Meus Treinos",
  "/history": "Histórico de Treinos",
  "/rankings": "Rankings de Atletas",
  "/community": "Feed Social",
  "/profile": "Perfil do Atleta",
  "/login": "Entrar",
  "/register": "Cadastre-se",
};

export const AppRoutes: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const pageTitle = PAGE_TITLES[location.pathname] ?? "battleRank";

  useEffect(() => {
    document.title = `${pageTitle} - battleRank`;
  }, [pageTitle]);

  const isAuthRoute = location.pathname === "/login" || location.pathname === "/register";

  // Se o usuário já estiver logado e tentar acessar /login ou /register, manda para /workouts
  if (isAuthRoute) {
    if (isAuthenticated) {
      return <Navigate to="/workouts" replace />;
    }
    return (
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Se NÃO estiver logado, redireciona qualquer rota privada diretamente para /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

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
            <Route path="/workouts/:id" element={<WorkoutDetailPage />} />
            <Route path="/workouts/:id/live" element={<WorkoutLivePage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/rankings" element={<RankingsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            {/* Fallback */}
            <Route path="*" element={<WorkoutsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};
