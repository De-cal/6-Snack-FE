import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/lib/api/productDetail.api";
import type { Product } from "@/types/productDetail.types";

export function useProductDetail(productId: number) {
  return useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId, // productId 있을 때만 실행
  });
}
