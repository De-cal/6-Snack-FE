import { cookieFetch } from "./fetchClient.api";

/**
 * @JJOBO
 * 1. const 화살표 함수로 변경하기
 */

export async function addToCart(productId: number, quantity: number) {
  return await cookieFetch("/cart", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });
}
