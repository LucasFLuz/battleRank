import React, { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  createdAt?: string;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("@battleRank:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (token: string, loggedUser: User) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("@battleRank:user", JSON.stringify(loggedUser));
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // Limpa o cache do React Query para não misturar dados com o usuário anterior
    queryClient.clear();
    setUser(loggedUser);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("@battleRank:user");
    delete api.defaults.headers.common["Authorization"];
    // Limpa imediatamente todo o cache em memória
    queryClient.clear();
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api.get<User>("/auth/me")
        .then((response) => {
          setUser(response.data);
          localStorage.setItem("@battleRank:user", JSON.stringify(response.data));
        })
        .catch(() => {
          logout();
        });
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
