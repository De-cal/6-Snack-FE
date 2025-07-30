import { cookieFetch } from "@/lib/api/fetchClient.api";

/**
 * @wooju01
 * 1. return 에러 해결하기
 */

export const deleteUserById = async (userId: string): Promise<{ message: string }> => {
  const res = await cookieFetch(`/super-admin/users/${userId}`, {
    method: "DELETE",
  });
  return res;
};

export const superAdminSignUpApi = async (data: {
  email: string;
  name: string;
  companyName: string;
  bizNumber: string;
  password: string;
  passwordConfirm: string;
}) => {
  return await cookieFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
