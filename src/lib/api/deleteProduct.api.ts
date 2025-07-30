import { cookieFetch } from "./fetchClient.api";

export const deleteProductApi = async (productId: number): Promise<void> => {
  return await cookieFetch(`/products/${productId}`, {
    method: "DELETE",
  });
};
