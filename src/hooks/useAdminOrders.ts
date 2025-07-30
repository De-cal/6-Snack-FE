import { useQuery } from "@tanstack/react-query";
import { getAdminOrders } from "@/lib/api/order.api";

/**
 * @rakaso598
 * 1. 인터페이스 -> 타입
 * 2. 앞에 T 붙이기
 */

interface UseAdminOrdersParams {
  status: "pending" | "approved";
  offset?: number;
  limit?: number;
  orderBy?: string;
}

export const useAdminOrders = ({ status, offset = 0, limit = 100, orderBy = "latest" }: UseAdminOrdersParams) => {
  return useQuery({
    queryKey: ["adminOrders", status], // offset, limit, orderBy 제거하여 캐시 활용
    queryFn: () => getAdminOrders({ status, offset: 0, limit: 100, orderBy: "latest" }), // 모든 데이터를 한 번에 가져옴
    staleTime: 5 * 60 * 1000, // 5분간 캐시된 데이터 사용
    gcTime: 10 * 60 * 1000, // 10분간 메모리에 보관
  });
};
