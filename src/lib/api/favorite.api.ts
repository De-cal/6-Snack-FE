import { TAddFavoriteProductResponse, TGetFavoriteProductResponse, TMyFavoritesParams } from "@/types/favorite.types";
import { cookieFetch } from "./fetchClient.api";

export const getFavorites = async (params: TMyFavoritesParams): Promise<TGetFavoriteProductResponse> => {
  const queryString = new URLSearchParams(params);

  return await cookieFetch(`/favorites?${queryString.toString()}`);
};

export const createFavorite = async (productId: string): Promise<TAddFavoriteProductResponse> => {
  return await cookieFetch(`/favorites/${productId}`, {
    method: "POST",
  });
};

export const deleteFavorite = async (productId: string): Promise<void> => {
  return await cookieFetch(`/favorites/${productId}`, {
    method: "DELETE",
  });
};
