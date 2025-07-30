import { TOrder, TOrderSummary } from "@/types/order.types";
import { cookieFetch } from "./fetchClient.api";

/**
 * @wooju01
 * 1. orderHistory.api.ts에서 원빈님이 만드신 코드와 동일한 코드로 보여서 합의 후 통합 진행하기
 */

export const fetchPendingOrders = async ({
  offset = 0,
  limit = 10,
  orderBy = "latest",
}: {
  offset?: number;
  limit?: number;
  orderBy?: string;
}): Promise<{ orders: TOrderSummary[]; meta: { totalCount: number; currentPage: number; totalPages: number } }> => {
  const query = `?status=pending&offset=${offset}&limit=${limit}&orderBy=${orderBy}`;
  const res = await cookieFetch(`/admin/orders${query}`);
  return res as { orders: TOrderSummary[]; meta: { totalCount: number; currentPage: number; totalPages: number } };
};

export const fetchOrderDetail = async (orderId: number): Promise<TOrder> => {
  const res = await cookieFetch(`/admin/orders/${orderId}?status=pending`);
  return res as TOrder;
};

export const updateOrderStatus = async ({
  orderId,
  status,
  adminMessage,
}: {
  orderId: number;
  status: "APPROVED" | "REJECTED";
  adminMessage: string;
}) => {
  const res = await cookieFetch(`/admin/orders/${orderId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, adminMessage }),
  });

  return res;
};
