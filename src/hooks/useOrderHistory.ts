import { useState, useEffect, useCallback } from "react";
import { useBudgets } from "@/hooks/useBudgets";
import { useAdminOrders } from "@/hooks/useAdminOrders";
import { formatDate } from "@/lib/utils/formatDate.util";

/**
 * @rakaso598
 * 1. 인터페이스 -> 타입
 * 2. 앞에 T 붙이기
 */

export type TPurchaseItem = {
  id: string;
  requestDate: string;
  requester: string;
  status: "요청" | "승인";
  item: string;
  amount: string;
  approvalDate: string;
  manager: string;
  adminMessage?: string;
};

export const useOrderHistory = (sortByDefault: string = "latest", itemsPerPage: number = 4) => {
  const [sortBy, setSortBy] = useState<string>(sortByDefault);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // 예산 데이터 패칭
  const { data: budgetData, isLoading: budgetLoading, isError: budgetIsError, error: budgetErrorObj } = useBudgets();
  const budgetError = budgetIsError ? (budgetErrorObj as Error)?.message || "예산 데이터를 불러오지 못했습니다." : null;

  // 구매내역 데이터 패칭 (승인완료만) - 모든 데이터를 한 번에 가져와서 캐시 활용
  const {
    data: approvedData,
    isLoading: approvedLoading,
    isError: approvedIsError,
    error: approvedErrorObj,
  } = useAdminOrders({ status: "approved" }); // offset, limit, orderBy 제거

  const purchaseListLoading = approvedLoading;
  const purchaseListError = approvedIsError ? (approvedErrorObj as Error)?.message : null;

  // 데이터 파싱 및 정렬
  const statusMap: Record<string, "요청" | "승인"> = { approved: "승인" };

  interface OrderItem {
    id: number | string;
    requestDate?: string;
    createdAt?: string;
    requesterName?: string;
    requester?: string;
    productName?: string;
    itemSummary?: string;
    item?: string;
    totalPrice?: number;
    amount?: number;
    approvalDate?: string;
    updatedAt?: string;
    approver?: string;
    managerName?: string;
    manager?: string;
    adminMessage?: string;
  }

  const parse = (item: OrderItem): TPurchaseItem => ({
    id: String(item.id),
    requestDate: item.requestDate ? formatDate(item.requestDate) : item.createdAt ? formatDate(item.createdAt) : "-",
    requester: item.requesterName || item.requester || "-",
    status: statusMap["approved"],
    item: item.productName || item.itemSummary || item.item || "-",
    amount:
      typeof item.totalPrice === "number"
        ? item.totalPrice.toLocaleString()
        : typeof item.amount === "number"
          ? item.amount.toLocaleString()
          : "-",
    approvalDate: item.approvalDate ? formatDate(item.approvalDate) : item.updatedAt ? formatDate(item.updatedAt) : "-",
    manager: item.approver || item.managerName || item.manager || "-",
    adminMessage: item.adminMessage,
  });

  // 모든 아이템을 파싱
  const allPurchaseItems: TPurchaseItem[] = ((approvedData as { orders?: OrderItem[] })?.orders || []).map((item: OrderItem) => parse(item));

  // 클라이언트 사이드에서 정렬 처리
  const sortedItems = useCallback(() => {
    const items = [...allPurchaseItems];

    switch (sortBy) {
      case "latest":
        return items.sort((a, b) => {
          const dateA = new Date(a.requestDate).getTime();
          const dateB = new Date(b.requestDate).getTime();
          return dateB - dateA; // 최신순 (내림차순)
        });
      case "priceLow":
        return items.sort((a, b) => {
          const priceA = parseFloat(a.amount.replace(/[^0-9]/g, "")) || 0;
          const priceB = parseFloat(b.amount.replace(/[^0-9]/g, "")) || 0;
          return priceA - priceB; // 낮은 가격순 (오름차순)
        });
      case "priceHigh":
        return items.sort((a, b) => {
          const priceA = parseFloat(a.amount.replace(/[^0-9]/g, "")) || 0;
          const priceB = parseFloat(b.amount.replace(/[^0-9]/g, "")) || 0;
          return priceB - priceA; // 높은 가격순 (내림차순)
        });
      default:
        return items;
    }
  }, [allPurchaseItems, sortBy]);

  const sortedPurchaseItems = sortedItems();

  // 클라이언트 사이드에서 페이지네이션 처리
  const totalCount = sortedPurchaseItems.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems: TPurchaseItem[] = sortedPurchaseItems.slice(startIndex, startIndex + itemsPerPage);

  // 정렬이 변경될 때 첫 페이지로 이동
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    },
    [totalPages],
  );

  // 드롭다운 외부 클릭 감지
  useEffect(() => {
    if (!dropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".custom-sort-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // 숫자 포맷 유틸
  const formatNumber = (num: number | undefined) => (typeof num === "number" ? num.toLocaleString() + "원" : "-");

  return {
    // 예산 관련
    budgetData,
    budgetLoading,
    budgetError,
    // 구매내역 관련
    purchaseListLoading,
    purchaseListError,
    currentItems,
    totalPages,
    currentPage,
    handlePageChange,
    // 정렬 관련
    sortBy,
    setSortBy,
    dropdownOpen,
    setDropdownOpen,
    // 유틸
    formatNumber,
  };
};
