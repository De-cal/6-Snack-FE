"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ArrowIconSvg from "@/components/svg/ArrowIconSvg";
import { useOrderDetail } from "@/hooks/useOrderDetail";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Toast from "@/components/common/Toast";
import { formatDate } from "@/lib/utils/formatDate.util";
import { formatPrice } from "@/lib/utils/formatPrice.util";
import { useOrderStatusUpdate } from "@/hooks/useOrderStatusUpdate";
import { useModal } from "@/providers/ModalProvider";
import OrderActionModal from "../_components/OrderActionModal";
import OrderDetailSkeleton from "./_components/OrderDetailSkeleton";

export default function OrderManageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId: string = params.orderId as string;

  const { data: orderRequest, isLoading, error } = useOrderDetail(orderId);
  const updateOrderMutation = useOrderStatusUpdate();
  const { openModal } = useModal();

  const [isItemsExpanded, setIsItemsExpanded] = useState<boolean>(true);
  const [toastConfig, setToastConfig] = useState<{
    isVisible: boolean;
    text: string;
    variant: "success" | "error";
    budget?: number;
  }>({
    isVisible: false,
    text: "",
    variant: "success",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // TODO - shipppingFee 없에고 orderRequest.deliveryFee 참조
  const calculatedTotal: number =
    orderRequest?.products?.reduce((sum: number, item) => sum + item.price * item.quantity, 0) || 0;
  const shippingFee: number = 3000;
  const finalTotal: number = calculatedTotal + shippingFee;

  const currentMonthBudget = orderRequest?.budget?.currentMonthBudget || 0;
  const currentMonthExpense = orderRequest?.budget?.currentMonthExpense || 0;
  const remainingBudget = currentMonthBudget - currentMonthExpense;
  const budgetAfterPurchase = remainingBudget - finalTotal;

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const showToast = (text: string, variant: "success" | "error" = "success", budget?: number) => {
    setToastConfig({
      isVisible: true,
      text,
      variant,
      budget,
    });

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToastConfig((prev) => ({ ...prev, isVisible: false }));
      timerRef.current = null;
    }, 3000);
  };

  const handleApprove = async () => {
    try {
      if (budgetAfterPurchase < 0 && remainingBudget !== undefined) {
        showToast("예산이 부족합니다.", "error", remainingBudget);
        return;
      }
      await updateOrderMutation.mutateAsync({
        orderId: orderId,
        status: "APPROVED",
      });

      openModal(
        <OrderActionModal
          modalTitle="승인 완료"
          modalDescription="승인이 완료되었어요!<br />구매 내역을 통해 배송 현황을 확인해보세요"
          leftButtonText="홈으로"
          rightButtonText="구매 내역 보기"
          onLeftClick={() => {
            router.push("/products");
          }}
          onRightClick={() => {
            router.push("/order-history");
          }}
        />,
      );
    } catch {
      showToast("승인 처리에 실패했습니다.", "error");
    }
  };

  const handleReject = async () => {
    try {
      await updateOrderMutation.mutateAsync({
        orderId: orderId,
        status: "REJECTED",
      });

      openModal(
        <OrderActionModal
          modalTitle="요청 반려"
          modalDescription="요청이 반려되었어요<br />목록에서 다른 요청을 확인해보세요"
          leftButtonText="홈으로"
          rightButtonText="구매 요청 내역 보기"
          onLeftClick={() => {
            router.push("/products");
          }}
          onRightClick={() => {
            router.push("/order-manage");
          }}
        />,
      );
    } catch {
      showToast("반려 처리에 실패했습니다.", "error");
    }
  };

  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  if (error || !orderRequest) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center" role="main" aria-live="assertive">
        <div className="text-base sm:text-lg md:text-xl text-red-600">
          {error instanceof Error ? error.message : "주문 내역을 찾을 수 없습니다."}
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Toast
        text={toastConfig.text}
        variant={toastConfig.variant}
        isVisible={toastConfig.isVisible}
        budget={toastConfig.budget}
      />
      <main
        className="w-full max-w-[1200px] mx-auto pt-[30px] md:pt-[60px] flex flex-col justify-start items-start gap-[30px]"
        role="main"
      >
        <header>
          <h1 className="self-stretch justify-center text-lg/[22px] font-bold">구매 요청 상세</h1>
        </header>

        <section
          className="self-stretch flex flex-col justify-start items-start gap-5"
          aria-labelledby="items-section-title"
        >
          <button
            className="inline-flex justify-start items-center gap-1.5 cursor-pointer z-10"
            onClick={() => setIsItemsExpanded(!isItemsExpanded)}
            aria-expanded={isItemsExpanded}
            aria-controls="items-content"
            aria-label={`요청 품목 ${orderRequest.products?.length || 0}개 ${isItemsExpanded ? "접기" : "펼치기"}`}
          >
            <div className="justify-center text-primary-950 text-base/[20px] tracking-tight font-bold">요청 품목</div>
            <div className="justify-center  text-primary-950 text-base/[20px] tracking-tight  font-normal">
              총 {orderRequest.products?.length || 0}개
            </div>
            <ArrowIconSvg
              direction={isItemsExpanded ? "up" : "down"}
              className="w-5 h-5 text-primary-950"
              aria-hidden="true"
            />
          </button>
          <div
            id="items-content"
            aria-hidden={!isItemsExpanded}
            className="w-full rounded-sm sm:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]"
          >
            {isItemsExpanded && (
              <div
                className="flex flex-col w-full sm:pt-[20px] sm:px-[20px] sm:pb-[30px] gap-[20px] sm:gap-0"
                role="list"
                aria-label="주문 상품 목록"
              >
                {orderRequest.products?.map((item) => (
                  <div
                    key={item.id}
                    className="flex w-full items-center gap-3 sm:gap-5 border-b pb-[20px] sm:pt-[20px] sm:pr-[20px] border-primary-100"
                    role="listitem"
                  >
                    <div className="w-[72px] sm:w-[140px] h-[72px] sm:h-[140px] bg-primary-50 rounded-xs sm:bg-white flex justify-center items-center flex-shrink-0">
                      {typeof item.imageUrl === "string" && (
                        <div className="relative w-[75%] h-[75%]">
                          <Image
                            src={item.imageUrl}
                            alt={`${item.productName} 상품 이미지`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col w-full justify-center items-start gap-[12px] sm:gap-[30px]">
                      <div className="flex flex-col justify-center items-start gap-1 sm:gap-[10px]">
                        <p className="text-primary-950 text-sm/[17px] tracking-tight sm:text-base/[20px] sm:font-medium">
                          {item.productName}
                        </p>
                        <div className="text-primary-950 text-sm/[17px] tracking-tight sm:text-base/[20px] font-bold">
                          {formatPrice(item.price)}원
                        </div>
                      </div>

                      <div className="flex w-full items-center justify-between">
                        <div className=" text-primary-500 text-[13px]/[16px] sm:text-base/[20px] tracking-tight font-bold">
                          수량 {item.quantity}개
                        </div>
                        <div className="sm:hidden text-center  text-primary-700 text-base/[20px] tracking-tight font-extrabold">
                          {formatPrice(item.price * item.quantity)}원
                        </div>
                      </div>
                    </div>
                    <div className="hidden sm:block text-center  text-primary-700 text-xl/[32px] tracking-tight font-extrabold whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}원
                    </div>
                  </div>
                ))}

                <div
                  className="w-full flex flex-col gap-4 sm:gap-2.5 sm:pt-[20px] sm:px-[20px]"
                  role="region"
                  aria-label="주문 금액 정보"
                >
                  <div className="flex justify-between items-center">
                    <div className="text-primary-700 tracking-tight text-sm/[17px] sm:text-base/[20px] font-bold">
                      주문금액
                    </div>
                    <div className="text-primary-700 tracking-tight text-sm/[17px] sm:text-base/[20px] font-bold">
                      {formatPrice(calculatedTotal)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-primary-700 tracking-tight text-sm/[17px] sm:text-base/[20px] font-bold">
                      배송비
                    </div>
                    <div className="text-primary-700 tracking-tight text-sm/[17px] sm:text-base/[20px] font-bold">
                      {formatPrice(shippingFee)}원
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-primary-950 text-lg/[22px] tracking-tight font-bold">총 주문금액</div>
                    <div className="text-primary-950 text-lg/[22px] sm:text-[24px]/[30px] tracking-tight font-extrabold">
                      {formatPrice(finalTotal)}원
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="self-stretch flex flex-col justify-start items-start" aria-labelledby="request-info-title">
          <div className="self-stretch px-2 py-3 sm:py-3.5 border-b border-primary-950 inline-flex justify-start items-center gap-2">
            <h2
              id="request-info-title"
              className="text-center justify-center tracking-tight text-primary-950 text-sm/[17px] sm:text-base/[20px] font-extrabold"
            >
              요청 정보
            </h2>
          </div>
          <div
            className="self-stretch flex flex-col justify-center items-start sm:flex-row sm:justify-start sm:items-stretch "
            role="region"
            aria-label="요청 상세 정보"
          >
            <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
              <div className="flex w-[140px] h-[50px] p-2 border-r border-b border-primary-100 justify-start items-center text-sm/[17px] tracking-tight sm:text-base/[20px] text-primary-950">
                요청인
              </div>
              <div className="flex-1 h-[50px] px-2 sm:px-5 py-2 border-b border-primary-100 flex justify-start items-center sm:border-r">
                <div className="text-center justify-center text-primary-900 text-sm font-bold sm:text-base tracking-tight ">
                  {orderRequest.requester || "-"}
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center sm:flex-1">
              <div className="flex w-[140px] h-[50px] p-2 border-r border-b border-primary-100 text-primary-950 justify-start items-center text-sm/[17px] tracking-tight sm:text-base/[20px]">
                요청 날짜
              </div>
              <div className="flex-1 h-[50px] px-2 sm:px-5 py-2 border-b border-primary-100 flex justify-start items-center">
                <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold tracking-tight">
                  {orderRequest.createdAt ? formatDate(orderRequest.createdAt) : "-"}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start">
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="flex w-[140px] h-[50px] py-4 px-2 sm:py-5 text-primary-950 border-r border-b border-primary-100 justify-start items-center text-sm/[17px] tracking-tight sm:text-base/[20px]">
                요청 메세지
              </div>
              <div className="flex-1 h-[50px] py-4 px-2 sm:px-5 border-b border-primary-100 flex justify-start items-center">
                <div className="text-start justify-center text-primary-900 text-sm sm:text-base font-bold tracking-tight">
                  {orderRequest.requestMessage || "-"}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="self-stretch flex flex-col justify-start items-start" aria-labelledby="budget-info-title">
          <div className="self-stretch px-2 py-3 sm:py-3.5 border-b border-primary-950 inline-flex justify-start items-center gap-2">
            <h2
              id="budget-info-title"
              className="text-center justify-center tracking-tight text-primary-950 text-sm/[17px] sm:text-base/[20px] font-extrabold"
            >
              예산 정보
            </h2>
          </div>
          <div
            className="self-stretch flex flex-col justify-center items-start"
            role="region"
            aria-label="예산 상세 정보"
          >
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="flex w-[140px] h-[50px] p-2 border-r border-b border-primary-100 justify-start items-center text-sm/[17px] tracking-tight sm:text-base/[20px]">
                이번 달 지출액
              </div>
              <div className="flex-1 h-[50px] px-2 sm:px-4 py-2 border-b border-primary-100 flex justify-start items-center">
                <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold">
                  {formatPrice(currentMonthExpense)}원
                </div>
              </div>
            </div>
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="flex w-[140px] h-[50px] p-2 border-r border-b border-primary-100 justify-start items-center text-sm/[17px] tracking-tight sm:text-base/[20px]">
                이번 달 남은 예산
              </div>
              <div className="flex-1 h-[50px] px-2 sm:px-4 py-2 border-b border-primary-100 flex justify-start items-center">
                <div className="text-center justify-center text-primary-900 text-sm sm:text-base font-bold">
                  {formatPrice(remainingBudget)}원
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col justify-center items-start">
            <div className="self-stretch inline-flex justify-start items-center">
              <div className="flex w-[140px] h-[50px] p-2 border-r border-b border-primary-100 justify-start items-center text-sm/[17px] tracking-tight sm:text-base/[20px]">
                구매 후 예산
              </div>
              <div className="flex-1 h-[50px] px-2 sm:px-4 py-2 border-b border-primary-100 flex justify-start items-center">
                <div className="text-start justify-center text-primary-900 text-sm sm:text-base font-bold">
                  {formatPrice(budgetAfterPurchase)}원
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <section
        className="flex w-full justify-center gap-4 sm:gap-5 py-6 md:py-0 mt-[20px] md:mt-[70px] md:items-center"
        role="region"
        aria-label="주문 요청 처리 버튼"
      >
        <Button
          type="white"
          label={updateOrderMutation.isPending ? "처리중..." : "요청 반려"}
          className="w-full h-16 md:max-w-[300px]"
          onClick={handleReject}
          disabled={updateOrderMutation.isPending}
          aria-label={updateOrderMutation.isPending ? "처리 중입니다" : "구매 요청을 반려합니다"}
        />
        <Button
          type="primary"
          label={updateOrderMutation.isPending ? "처리중..." : "요청 승인"}
          className="w-full h-16 md:max-w-[300px]"
          onClick={handleApprove}
          disabled={updateOrderMutation.isPending}
          aria-label={updateOrderMutation.isPending ? "처리 중입니다" : "구매 요청을 승인합니다"}
        />
      </section>
    </div>
  );
}
