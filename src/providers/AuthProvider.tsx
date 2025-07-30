"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getUserApi } from "@/lib/api/user.api";
import { loginApi, logoutApi, registerApi } from "@/lib/api/auth.api";
import { usePathname } from "next/navigation";

/**
 * @rakaso598
 * 1. 타입 앞에 T 붙이기
 * 2. export 해서 사용하는 타입이라면 types 파일 만들어서 불러오기
 */

export type User = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  const getUser = async () => {
    try {
      const userData = await getUserApi();
      setUser(userData);
    } catch {
      setUser(null);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    await registerApi(name, email, password);
  };

  const login = async (email: string, password: string) => {
    const userData = await loginApi(email, password);
    setUser(userData);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  useEffect(() => {
    // 예외 경로: 홈(랜딩)페이지와 /auth 하위 경로들
    if (pathname === "/" || pathname.startsWith("/auth")) return;
    getUser();
  }, [pathname]);

  return <AuthContext.Provider value={{ user, login, logout, register }}>{children}</AuthContext.Provider>;
}
