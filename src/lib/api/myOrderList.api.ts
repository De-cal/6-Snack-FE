import { TOrderItem } from "@/types/myOrderList.types";
import { cookieFetch } from "@/lib/api/fetchClient.api";

/**
 * @JJOBO
 * 1. order.api.ts로 통합하기 or my.api.ts로 변경(의견)?
 */

export const fetchMyOrders = async (): Promise<TOrderItem[]> => {
  const result = await cookieFetch<{ data: TOrderItem[] }>("/orders");

  return result.data;
};
