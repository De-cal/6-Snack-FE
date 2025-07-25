import { logout } from "@/app/actions/auth";
import { refreshAccessToken } from "./auth.api";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const cookieFetch = async <T = any>(path: string, options: RequestInit = {}): Promise<T> => {
  const method = options.method || "GET";
  // 개발 완료후 삭제
  console.log(`🌐 API 요청: ${method} ${API_BASE_URL}${path}`);

  // fetch 호출 부분을 함수로 분리
  const request = async () => {
    return await fetch(`${API_BASE_URL}${path}`, {
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  };

  let response = await request();

  const isRefreshRequest = path === "/auth/refresh-token";

  // 예외 경로: 랜딩페이지(/), /signup, /signup/*, /login, /login/*
  let isExceptionPath = false;
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    isExceptionPath = (
      currentPath === "/" ||
      currentPath === "/login" ||
      currentPath.startsWith("/login/") ||
      currentPath === "/signup" ||
      currentPath.startsWith("/signup/")
    );
  }

  if (response.status === 401 && !isRefreshRequest && !isExceptionPath) {
    try {
      console.log("🔄 액세스 토큰 갱신 시도");
      await refreshAccessToken();
      response = await request();
    } catch (e) {
      console.error("❌ 액세스 토큰 재발급 실패");
      logout();
      throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
};

export const defaultFetch = async <T = any>(path: string, options: RequestInit = {}): Promise<T> => {
  const method = options.method || "GET";
  console.log(`🌐 API 요청: ${method} ${API_BASE_URL}${path}`);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  if (response.status === 204) {
    return null as T;
  }
  const data = await response.json();
  return data as T;
};
