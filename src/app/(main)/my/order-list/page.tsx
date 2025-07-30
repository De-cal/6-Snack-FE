"use client";

import { useEffect, useState } from "react";
import Dropdown from "@/components/common/DropDown";
import Pagination from "@/components/common/Pagination";
import MyRequestList from "@/components/common/MyRequestList";
import { fetchMyOrders } from "@/lib/api/myOrderList.api";
import { TOrderItem } from "@/types/myOrderList.types";
import { formatDate } from "@/lib/utils/formatDate.util";
import { convertStatus } from "@/lib/utils/converStatus.util";

const PAGE_SIZE = 5;

export default function MyOrderListPage() {
  const [requests, setRequests] = useState<TOrderItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("최신순");

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchMyOrders();
        setRequests(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadData();
  }, []);

  const sorted = (() => {
    const copy = [...requests];
    switch (sortOption) {
      case "낮은 가격순":
        return copy.sort((a, b) => a.totalPrice - b.totalPrice);
      case "높은 가격순":
        return copy.sort((a, b) => b.totalPrice - a.totalPrice);
      default:
        return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  })();

  const getProductName = (receipts: TOrderItem["receipts"]) => {
    if (!receipts.length) return "상품 없음";

    if (receipts.length === 1) {
      return receipts[0].productName;
    }

    return `${receipts[0].productName} 외 ${receipts.length - 1}건`;
  };

  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <main className="flex flex-col items-center px-4 md:px-0 pt-10 pb-40 min-h-[calc(100vh-112px)]">
      <div className="w-full max-w-[1400px] py-4 flex justify-between items-center">
        <h1 className="text-lg font-bold text-primary-950">구매 요청 내역</h1>
        <Dropdown value={sortOption} onChange={setSortOption} options={["최신순", "낮은 가격순", "높은 가격순"]} />
      </div>

      <div className="w-full max-w-[1400px] flex-1">
        <div className="hidden sm:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] w-full max-w-[1400px] px-6 md:px-10 py-5 border-b border-t border-primary-100 justify-start items-center md:gap-10 lg:gap-20 text-primary-500 text-sm md:text-base">
          <div className="min-w-[90px] whitespace-nowrap">구매 요청일</div>
          <div className="min-w-[140px] whitespace-nowrap">상품 정보</div>
          <div className="min-w-[90px] whitespace-nowrap">주문 금액</div>
          <div className="min-w-[90px] whitespace-nowrap">상태</div>
          <div className="min-w-[78px] whitespace-nowrap">비고</div>
        </div>

        <div style={{ minHeight: `${6 * 88}px` }} className="flex flex-col">
          {paginated.map((item) => (
            <MyRequestList
              key={item.id}
              requestDate={formatDate(item.createdAt)}
              productName={getProductName(item.receipts)}
              price={item.totalPrice}
              status={convertStatus(item.status)}
              onRequestCancel={() => console.log("취소", item.id)}
            />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(requests.length / PAGE_SIZE)}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}
