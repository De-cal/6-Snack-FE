"use client";
import Dropdown from "@/components/common/DropDown";
import OrderManageModal from "@/components/common/OrderManageModal";
import Pagination from "@/components/common/Pagination";
import RequestList from "@/components/common/RequestList";
import useOrderVisibleCount from "@/hooks/useOrderVisibleCount";
import { fetchOrderDetail, fetchPendingOrders } from "@/lib/api/orderManage.api";
import { useModal } from "@/providers/ModalProvider";
import { TOrderSummary } from "@/types/order.types";
import { useEffect, useMemo, useState } from "react";

/**
 * @wooju01
 * 1. useState에 타입 정의
 * 2. useQuery, useMutation으로 마이그레이션
 */

export default function Order() {
  const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
  const { openModal } = useModal();
  const [orderRequests, setOrderRequests] = useState<TOrderSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const orderByMap = useMemo(
    (): Record<string, string> => ({
      최신순: "latest",
      "낮은 가격순": "priceLow",
      "높은 가격순": "priceHigh",
    }),
    [],
  );
  const [orderBy, setOrderBy] = useState<string>(orderByMap["최신순"]);

  const { visibleCount } = useOrderVisibleCount();
  const totalPages = Math.ceil(totalCount / visibleCount);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const offset = (currentPaginationPage - 1) * visibleCount;
        const res = await fetchPendingOrders({ offset, limit: visibleCount, orderBy });
        setOrderRequests(res.orders);
        setTotalCount(res.meta.totalCount);
      } catch (err) {
        console.error("주문 데이터 불러오기 실패", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [currentPaginationPage, visibleCount, orderBy]);

  return (
    <div className="pt-[30px] w-full relative">
      <div className="w-full flex justify-between items-center">
        <div className="text-black text-base font-bold">구매 요청 관리</div>
        <Dropdown
          onChange={(selected) => setOrderBy(orderByMap[selected] || orderByMap["최신순"])}
          options={["최신순", "낮은 가격순", "높은 가격순"]}
        />
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <div className="text-center py-12">로딩 중...</div>
        ) : orderRequests.length > 0 ? (
          <>
            <RequestList
              orderRequests={orderRequests}
              onClickReject={async (orderSummary) => {
                const fullOrder = await fetchOrderDetail(orderSummary.id);
                openModal(<OrderManageModal order={fullOrder} type="reject" onClick={() => {}} />);
              }}
              onClickApprove={async (orderSummary) => {
                const fullOrder = await fetchOrderDetail(orderSummary.id);
                openModal(<OrderManageModal order={fullOrder} type="approve" onClick={() => {}} />);
              }}
            />
            <Pagination
              currentPage={currentPaginationPage}
              totalPages={totalPages}
              onPageChange={setCurrentPaginationPage}
            />
          </>
        ) : (
          <div className="flex flex-1 justify-center items-center min-h-screen">
            <div className="w-80 inline-flex flex-col justify-start items-center gap-7 py-12">
              <div className="w-24 h-24 relative bg-neutral-50 rounded-full overflow-hidden" />
              <div className="self-stretch flex flex-col justify-start items-center gap-12">
                <div className="w-72 flex flex-col justify-start items-center gap-2.5">
                  <div className="self-stretch text-center text-neutral-800 text-2xl font-extrabold">
                    요청 내역이 없어요
                  </div>
                  <div className="self-stretch text-center text-neutral-700 text-base leading-relaxed">
                    상품 리스트를 둘러보고
                    <br />
                    상품을 담아보세요
                  </div>
                </div>
                <button
                  className="self-stretch h-16 px-4 py-3 bg-neutral-800 rounded-sm inline-flex justify-center items-center"
                  onClick={() => {}}
                >
                  <div className="text-white text-base font-bold">상품 리스트로 이동</div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
