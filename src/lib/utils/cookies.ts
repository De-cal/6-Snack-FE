import { cookies } from "next/headers";

/**
 * @rakaso598
 * 1. cookie.util.ts로 파일명 변경
 */

// 쿠키에서 토큰 가져오는 함수 (클라이언트)
export function getTokenFromCookie() {
  if (typeof window === "undefined") return null;

  const cookies = document.cookie.split(";");
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith("accessToken="));
  return tokenCookie ? tokenCookie.trim().split("=")[1] : null;
}

// 서버에서 쿠키에서 토큰 가져오는 함수
export async function getTokenFromServerCookie() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || null;
}

// 쿠키에 토큰 저장 함수 (서버, 클라이언트 환경 어디에서든 자유롭게 사용 가능)
export function setTokensToCookie(accessToken: string, refreshToken?: string) {
  if (typeof window === "undefined") {
    // 서버 환경인 경우
    return setServerSideTokens(accessToken, refreshToken);
  }

  // 브라우저 환경인 경우
  const accessTokenData = JSON.parse(atob(accessToken.split(".")[1]));
  const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);

  document.cookie = `accessToken=${accessToken}; path=/; max-age=${accessTokenExpiresIn}; SameSite=Strict`;

  if (refreshToken) {
    const refreshTokenData = JSON.parse(atob(refreshToken.split(".")[1]));
    const refreshTokenExpiresIn = refreshTokenData.exp - Math.floor(Date.now() / 1000);
    document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${refreshTokenExpiresIn}; SameSite=Strict`;
  }
}

// 서버 사이드 토큰 설정
async function setServerSideTokens(accessToken: string, refreshToken?: string) {
  const cookieStore = await cookies();

  const accessTokenData = JSON.parse(atob(accessToken.split(".")[1]));
  const accessTokenExpiresIn = accessTokenData.exp - Math.floor(Date.now() / 1000);

  cookieStore.set({
    name: "accessToken",
    value: accessToken,
    httpOnly: true,
    path: "/",
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: accessTokenExpiresIn,
  });

  if (refreshToken) {
    const refreshTokenData = JSON.parse(atob(refreshToken.split(".")[1]));
    const refreshTokenExpiresIn = refreshTokenData.exp - Math.floor(Date.now() / 1000);

    cookieStore.set({
      name: "refreshToken",
      value: refreshToken,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: refreshTokenExpiresIn,
    });
  }
}

// 쿠키에서 토큰 삭제
export async function removeTokensFromCookie() {
  if (typeof window === "undefined") {
    // 서버 환경인 경우
    const cookieStore = await cookies();
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");
    return;
  }

  // 브라우저 환경인 경우
  document.cookie = "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
