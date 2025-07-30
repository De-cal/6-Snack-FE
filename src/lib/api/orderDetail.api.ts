import { cookieFetch } from "./fetchClient.api";

/**
 * @Jam1eL1
 * 1. order.api.ts로 통합하기(의견)
 * 2. orderHistory.api.ts에서 원빈님이 만드신 코드와 중복으로 보여서 합의 후 통합 진행하기
 */

// 백엔드와 동일한 타입 정의
export type TOrderWithBudget = {
  id: number;
  userId: string;
  approver: string | null;
  adminMessage: string | null;
  requestMessage: string | null;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  status: string;
  requester: string;
  products: {
    id: number;
    quantity: number;
    price: number;
    imageUrl: string;
    productName: string;
  }[];
  budget: {
    currentMonthBudget: number | null;
    currentMonthExpense: number | null;
  };
};

// 주문 상세 조회 API 함수 (관리자용)
export const getOrderDetail = async (
  orderId: string,
  status: "pending" | "approved" = "pending",
): Promise<TOrderWithBudget> => {
  try {
    const response: TOrderWithBudget = await cookieFetch(`/admin/orders/${orderId}?status=${status}`);
    return response;
  } catch (error) {
    throw error;
  }
};
