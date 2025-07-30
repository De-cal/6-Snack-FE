import type { Product } from "@/types/productDetail.types";
import { cookieFetch } from "./fetchClient.api";

/**
 * @JJOBO
 * 1. product.api.ts로 통합하기(의견)
 */

export async function getProductById(productId: number): Promise<Product> {
  return await cookieFetch(`/products/${productId}`);
}
