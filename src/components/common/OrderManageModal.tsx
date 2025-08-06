import { useModal } from "@/providers/ModalProvider";
import { TOrder } from "@/types/order.types";
import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Button from "../ui/Button";
import TextArea from "./TextArea";
import { formatPrice } from "@/lib/utils/formatPrice.util";
import clsx from "clsx";
import { TToastVariant } from "@/types/toast.types";

type TOrderManageModalProps = {
  type: "reject" | "approve";
  order: TOrder;
  onClick: () => void;
  onUpdateOrderStatus: (variables: { orderId: string; status: "APPROVED" | "REJECTED"; adminMessage?: string }) => void;
  showToast: (message: string, variant: TToastVariant) => void;
};

export default function OrderManageModal({
  type,
  order,
  onClick,
  onUpdateOrderStatus,
  showToast,
}: TOrderManageModalProps) {
  const { closeModal } = useModal();
  const [adminMessage, setAdminMessage] = useState("");

  const remainingBudget = order.budget.currentMonthBudget - order.budget.currentMonthExpense - order.totalPrice - 3000;

  return (
    <div
      className={twMerge(
        type === "approve" ? "sm:max-h-[976px]" : "sm:max-h-[882px]",
        "fixed inset-0 bg-white overflow-auto shadow-[0px_0px_40px_0px_rgba(0,0,0,0.10)] sm:w-[600px] sm:h-full sm:top-1/2 sm:left-1/2 sm:translate-[-50%] sm:py-[40px] sm:px-[60px]",
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <header className="flex justify-center items-center h-[54px] py-[16px] px-[8px] sm:p-0 sm:h-auto">
        <h1
          id="modal-title"
          className="flex justify-center items-center w-[375px] font-bold text-[18px]/[22px] tracking-tight text-[#1f1f1f]"
        >
          {type === "approve" ? "구매 요청 승인" : "구매 요청 반려"}
        </h1>
      </header>

      <main className="flex flex-col items-center p-[24px] pt-[20px] sm:p-0 sm:pt-[32px]">
        <div className="flex flex-col w-full max-w-[480px] gap-[32px] mb-[20px]">
          <section aria-label="요청자 정보">
            <div className="flex justify-start items-center gap-[12px]">
              <div
                className="flex justify-center items-center w-[32px] h-[32px] rounded-full py-[10px] px-[9.5px] bg-primary-50 font-medium text-[10px]/[12px] tracking-tight text-black"
                role="img"
                aria-label={`${order.requester}의 프로필 이미지`}
              >
                {order.requester.slice(0, 1)}
              </div>
              <h2 className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">{order.requester}</h2>
            </div>

            <div className="flex justify-start items-center gap-[6px]">
              <h3 className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">요청 품목</h3>
              <p className="font-normal text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]">
                총 {order.products.length}개
              </p>
            </div>
          </section>
        </div>

        <div className="flex flex-col justify-center items-center w-full max-w-[480px] mb-[24px] gap-[32px] sm:mb-[36px]">
          <section
            aria-label="주문 상품 목록"
            className="flex flex-col justify-center items-center w-full p-[20px] pb-[30px] gap-[20px] rounded-[2px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]"
          >
            <div
              className="flex flex-col items-center overflow-auto scrollbar w-full h-[160px] sm:h-[180px]"
              role="list"
              aria-label="주문 상품 목록"
            >
              {order.products.map((product) => {
                return (
                  <article
                    key={product.id}
                    className="flex justify-between items-center w-full min-w-[287px] gap-[8px] py-[20px] pr-[8px] border-b-1 border-primary-100"
                    role="listitem"
                  >
                    <div className="flex justify-center items-center gap-[12px] sm:gap-[20px]">
                      <div className="flex justify-center items-center min-w-[40px] h-[40px]">
                        <div className="relative w-[20px] h-[34.71px]">
                          <Image
                            src={product.imageUrl}
                            alt={`${product.productName} 상품 이미지`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-start gap-[4px] sm:gap-[10px]">
                        <h4 className="font-normal text-[14px]/[17px] tracking-tight text-primary-900 line-clamp-1 sm:w-[150px] sm:font-medium sm:text-[16px]/[20px]">
                          {product.productName}
                        </h4>
                        <p className="font-bold text-[14px]/[17px] tracking-tight text-primary-950 sm:text-[16px]/[20px]">
                          {formatPrice(product.price)}원
                        </p>
                      </div>
                    </div>

                    <p className="hidden sm:block sm:min-w-[56px] sm:font-bold sm:text-[16px]/[20px] sm:tracking-normal text-primary-500">
                      수량 {product.quantity}개
                    </p>

                    <div className="flex flex-col justify-center items-start min-w-[67px] gap-[4px]">
                      <p className="font-bold text-[13px]/[16px] tracking-tight text-primary-500 sm:hidden">
                        수량 {product.quantity}개
                      </p>
                      <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700 sm:min-w-[88px] sm:font-extrabold sm:text-[20px]/[32px] sm:tracking-normal">
                        {formatPrice(product.price * product.quantity)}원
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>

            <section
              aria-label="주문 금액 정보"
              className="flex flex-col justify-center items-center w-full gap-[10px]"
            >
              <div className="flex justify-between items-center w-full px-[8px]">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">주문금액</p>
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">
                  {formatPrice(order.totalPrice)}원
                </p>
              </div>

              <div className="flex justify-between items-center w-full px-[8px]">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">배송비</p>
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-700">3,000원</p>
              </div>

              <div className="flex justify-between items-center w-full px-[8px]">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950 sm:text-[18px]/[22px]">
                  총 주문금액
                </p>
                <p className="font-extrabold text-[20px]/[25px] tracking-tight text-primary-950 sm:text-[24px]/[30px]">
                  {formatPrice(order.totalPrice + 3000)}원
                </p>
              </div>
            </section>
          </section>

          {type === "approve" && (
            <section aria-label="예산 정보">
              <div className="w-full outline-1 outline-primary-100"></div>

              <div className="flex justify-between items-center w-full">
                <p className="font-bold text-[16px]/[20px] tracking-tight text-primary-950 sm:text-[18px]/[22px]">
                  구매 후 예산 금액
                </p>
                <p
                  className={clsx(
                    Number(remainingBudget) < 0 ? "text-error-500" : "text-primary-950",
                    "font-extrabold text-[20px]/[25px] tracking-tight sm:text-[24px]/[30px]",
                  )}
                  role="status"
                  aria-live="polite"
                >
                  {formatPrice(remainingBudget)}원
                </p>
              </div>
            </section>
          )}

          <section aria-label="관리자 메시지" className="flex flex-col justify-center items-start w-full gap-[12px]">
            <label className="font-bold text-[16px]/[20px] tracking-tight text-primary-950">
              {type === "approve" ? "승인 메시지" : "반려 메시지"}
            </label>
            <TextArea
              className="w-full max-w-[480px] h-[140px] p-[24px] rounded-[2px] resize-none placeholder:font-normal placeholder:text-[16px]/[26px] placeholder:tracking-tight placeholder:text-[#929292]"
              placeholder={type === "approve" ? "승인 메시지를 입력해주세요" : "반려 메시지를 입력해주세요"}
              value={adminMessage}
              onChange={(e) => setAdminMessage(e.target.value)}
            />
          </section>
        </div>

        <footer className="flex justify-center items-center w-full max-w-[480px] gap-[20px]">
          <Button
            onClick={() => closeModal()}
            type="white"
            label="취소"
            className="flex justify-center items-center w-full min-w-[153.5px] max-w-[230px] h-[64px] py-[12px] px-[16px] font-bold"
            aria-label="모달 닫기"
          />
          <Button
            onClick={() => {
              if (type === "approve" && remainingBudget < 0) {
                // 예산이 부족한 경우 Toast 표시
                showToast("예산 금액이 부족합니다", "error");
                return;
              }

              if (type === "reject") {
                onUpdateOrderStatus({
                  orderId: String(order.id),
                  status: "REJECTED",
                  adminMessage,
                });
                onClick();
                closeModal();
                showToast("구매 요청이 반려되었습니다", "success");
                return;
              }

              // 승인하기 (예산이 충분한 경우)
              onUpdateOrderStatus({
                orderId: String(order.id),
                status: "APPROVED",
                adminMessage,
              });
              onClick();
              closeModal();
              showToast("구매 요청이 승인되었습니다", "success");
            }}
            type="black"
            label={type === "approve" ? "승인하기" : "반려하기"}
            className="flex justify-center items-center w-full min-w-[153.5px] max-w-[230px] h-[64px] py-[12px] px-[16px] font-bold"
            aria-label={type === "approve" ? "구매 요청 승인" : "구매 요청 반려"}
          />
        </footer>
      </main>
    </div>
  );
}
