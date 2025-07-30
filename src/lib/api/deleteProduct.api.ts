import { cookieFetch } from "./fetchClient.api";

// 일반 유저 삭제
export const deleteProductApi = async (productId: number): Promise<void> => {
  return await cookieFetch(`/products/${productId}`, {
    method: "DELETE",
  });
};

// 관리자 삭제
export const deleteProductAsAdminApi = async (productId: number): Promise<void> => {
  return await cookieFetch(`/admin/products/${productId}`, {
    method: "DELETE",
  });
};
