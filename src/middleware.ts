import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// base64url 디코딩 함수
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) str += "=";
  return Buffer.from(str, "base64").toString("utf8");
}

// JWT 토큰에서 사용자 역할 추출하는 함수
function getUserRoleFromToken(token: string): string | null {
  try {
    // JWT의 payload 부분 디코딩 (base64url 디코딩)
    const payload = JSON.parse(base64UrlDecode(token.split(".")[1]));
    return payload.role || null;
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  // 현재 URL 경로 가져오기
  const { pathname } = request.nextUrl;

  // 쿠키에서 인증 토큰 확인
  const authToken = request.cookies.get("refreshToken")?.value;

  // JWT 토큰에서 사용자 역할 추출
  const userRole = authToken ? getUserRoleFromToken(authToken) : null;

  // 인증 상태 확인 : 쿠키만료기한과 토큰만료기한이 같으므로 토큰존재여부로 인증상태확인 가능
  const isAuthenticated = !!authToken;

  // 인증 관련 경로 확인 - 라우트 그룹으로 인해 URL은 /login, /signup
  const authPaths = ["/login", "/signup"];
  const isAuthRoute = authPaths.some((path) => pathname === path);

  // protected 폴더 경로 확인 (main 그룹의 모든 경로, products 제외)
  const isProtectedRoute =
    pathname.startsWith("/cart") ||
    pathname.startsWith("/manage") ||
    pathname.startsWith("/my") ||
    pathname.startsWith("/order-history") ||
    pathname.startsWith("/order-manage") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/products");

  // 로그인한 사용자가 인증 경로(로그인, 회원가입)에 접근하는 경우
  if (isAuthRoute && isAuthenticated) {
    // 인증된 사용자는 메인 페이지로 리디렉션
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 로그인하지 않은 사용자가 protected 경로에 접근하는 경우
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // 역할 기반 접근 제어 (인증된 사용자만)
  if (isAuthenticated && userRole) {
    // 1. 일반유저(USER)가 접근할 수 없는 경로들
    const userRestrictedPaths = [
      "/manage/users", // 회원관리
      "/manage/budgets", // 예산관리
      "/order-manage", // 구매요청관리
      "/order-history", // 구매내역확인
    ];

    // 2. 일반유저가 아닌 경우(ADMIN, SUPER_ADMIN) 접근할 수 없는 경로
    const nonUserRestrictedPaths = [
      "/cart/order", // 장바구니-주문
    ];

    // 일반유저 제한 체크 (6개 경로: 회원관리, 예산관리, 구매요청관리, 구매요청관리상세, 구매내역확인, 구매내역확인상세)
    if (userRole === "USER") {
      const isUserRestricted = userRestrictedPaths.some((path) => pathname === path || pathname.startsWith(path + "/"));
      if (isUserRestricted) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }

    // 일반유저가 아닌 경우 제한 체크 (장바구니-주문 접근 불가)
    if (userRole !== "USER") {
      const isNonUserRestricted = nonUserRestrictedPaths.some(
        (path) => pathname === path || pathname.startsWith(path + "/"),
      );
      if (isNonUserRestricted) {
        return NextResponse.redirect(new URL("/unauthorized?from=order", request.url));
      }
    }
  }

  // 로그인한 사용자가 "/"로 접근하는 경우 /products로 리디렉션
  if (pathname === "/" && isAuthenticated) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  // 그 외의 경우는 정상적으로 진행
  return NextResponse.next();
}

// 미들웨어가 적용될 경로 패턴 지정
export const config = {
  matcher: [
    // API 경로와 정적 파일은 제외
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
