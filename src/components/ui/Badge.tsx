import React from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import XIconSvg from "@/components/svg/XIconSvg";
import IcPending from "@/assets/icons/ic_time.svg";
import { TBadgeProps, TBadgeType } from "@/types/Badge.types";
import CheckIconSvg from "@/components/svg/CheckIconSvg";

/**
 * @wooju01
 * 1. export default function으로 변경
 */

const badgeStyleMap: Record<
  TBadgeType,
  {
    bg: string;
    text: string;
    textColor: string;
    iconSrc?: StaticImageData;
  }
> = {
  request: {
    bg: "bg-blue-50",
    text: "즉시 요청",
    textColor: "text-blue-500",
  },
  pending: {
    bg: "bg-primary-200",
    text: "대기 중",
    textColor: "text-primary-700",
    iconSrc: IcPending,
  },
  approved: {
    bg: "bg-sky-100",
    text: "승인",
    textColor: "text-sky-500",
  },
  rejected: {
    bg: "bg-red-100",
    text: "거절",
    textColor: "text-red",
  },
  admin: {
    bg: "bg-primary-600",
    text: "관리자",
    textColor: "text-white",
  },
  user: {
    bg: "bg-primary-100",
    text: "일반",
    textColor: "text-primary-400",
  },
};

export const Badge = ({ type }: TBadgeProps) => {
  const { bg, text, textColor, iconSrc } = badgeStyleMap[type];
  const SmallBadge = type === "admin" || type === "user";

  return (
    <div
      className={clsx(
        "rounded-full inline-flex justify-center items-center gap-1",
        "whitespace-nowrap w-fit",
        bg,
        SmallBadge
          ? "w-[52px] h-5 px-2.5 py-1 text-xs sm:w-16 sm:h-7 sm:px-2 sm:py-1.5 sm:text-sm"
          : "w-full h-7 px-2 py-1.5",
      )}
    >
      {type === "rejected" ? (
        <div className="w-3.5 h-3.5">
          <XIconSvg stroke="white" className="w-full h-full" bgColor="red" />
        </div>
      ) : type === "approved" ? (
        <div className="w-3.5 h-3.5">
          <CheckIconSvg stroke="white" bgColor="#0EA5E9" className="w-full h-full" />
        </div>
      ) : iconSrc ? (
        <div className="w-3.5 h-3.5 relative">
          <Image src={iconSrc} alt={`${text} 아이콘`} fill style={{ objectFit: "contain" }} />
        </div>
      ) : null}

      <span className={clsx("font-bold font-suit", SmallBadge ? "text-xs sm:text-sm" : "text-sm", textColor)}>
        {text}
      </span>
    </div>
  );
};

export default Badge;
