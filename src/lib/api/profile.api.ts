import { cookieFetch } from "./fetchClient.api";

/**
 * @wooju01
 * 1. 인터페이스 -> 타입으로 변경
 * 2. 앞에 T 붙이기.......
 * 우주님 타입 컨벤션 뭐예요~~~~~~ㅡㅡ!!!
 */

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  role: Role;
  company: {
    name: string;
  };
}

export async function getUserInfo(): Promise<UserInfo> {
  const response = await cookieFetch("/users/me");
  return (response as { user: UserInfo }).user;
}

export async function updateCompany(userId: string, company: string) {
  return await cookieFetch(`/super-admin/users/${userId}/company`, {
    method: "PATCH",
    body: JSON.stringify({
      companyName: company,
    }),
  });
}

export async function updateSuper(userId: string, company: string, password: string) {
  return await cookieFetch(`/super-admin/users/${userId}/company`, {
    method: "PATCH",
    body: JSON.stringify({
      companyName: company,
      passwordData: {
        newPassword: password,
        newPasswordConfirm: password,
      },
    }),
  });
}

export async function updatePassword(userId: string, password: string) {
  return await cookieFetch(`/users/${userId}/password`, {
    method: "PATCH",
    body: JSON.stringify({
      newPassword: password,
      newPasswordConfirm: password,
    }),
  });
}
