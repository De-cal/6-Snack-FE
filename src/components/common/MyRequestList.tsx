import React from "react";
import Badge from "@/components/ui/Badge";

/**
 * @JJOBO
 * 1. rfc 스니펫 사용
 */

type TRequestListItemProps = {
  requestDate: string;
  productName: string;
  price: number;
  status: "대기중" | "요청취소" | "요청완료";
  onRequestCancel?: () => void;
};

const RequestListItem = ({ requestDate, productName, price, status, onRequestCancel }: TRequestListItemProps) => {
  const getBadgeType = (): "pending" | "approved" | "rejected" => {
    switch (status) {
      case "대기중":
        return "pending";
      case "요청완료":
        return "approved";
      case "요청취소":
        return "rejected";
      default:
        return "pending";
    }
  };

  const showCancelButton = status === "대기중" && onRequestCancel;

  return (
    <div className="w-full border-b border-primary-100">
      {/* 모바일 */}
      <div className="flex flex-col gap-5 px-4 py-7 sm:hidden">
        <div className="flex justify-between items-center w-full">
          <div className="text-sm font-bold text-primary-950">{requestDate}</div>
          <div className="w-16">
            <Badge type={getBadgeType()} />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm text-primary-950">{productName}</div>
          <div className="text-sm text-primary-950">{price.toLocaleString()}원</div>
        </div>

        {showCancelButton && (
          <button
            onClick={onRequestCancel}
            className="w-full px-5 py-3 text-xs text-primary-900 bg-white outline outline-1 outline-primary-300 hover:bg-primary-100 transition-colors duration-200"
          >
            요청 취소
          </button>
        )}
      </div>

      {/* 태블릿 & 데스크탑 */}
      <div className="hidden sm:grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] items-center w-full px-6 md:px-10 h-24 md:gap-10 lg:gap-20 border-b border-primary-100">
        <div className="min-w-[90px] text-sm md:text-base text-primary-950">{requestDate}</div>
        <div className="min-w-[140px] text-sm md:text-base text-primary-950">{productName}</div>
        <div className="min-w-[90px] text-sm md:text-base text-primary-950">{price.toLocaleString()}원</div>
        <div className="flex justify-center w-18">
          <Badge type={getBadgeType()} />
        </div>

        {showCancelButton ? (
          <div className="flex justify-center">
            <button
              onClick={onRequestCancel}
              className="px-4 py-2 md:px-5 md:py-3 bg-white outline outline-1 outline-primary-300 text-primary-900 text-sm md:text-base hover:bg-primary-100 transition-colors duration-200"
            >
              요청 취소
            </button>
          </div>
        ) : (
          <div /> // 비고 영역 유지
        )}
      </div>
    </div>
  );
};

export default RequestListItem;
