import { StaticImageData } from "next/image";
import React from "react";

/**
 * @wooju01
 * 1. export default function으로 변경(아래에 export default 삭제)
 */

type TCardProps = {
  name: string;
  purchaseCount?: number;
  price: string | number;
  imageUrl: string | StaticImageData;
};

function Card({ name, purchaseCount, price, imageUrl }: TCardProps) {
  return (
    <div className="w-40 h-64 md:w-96 md:h-auto flex flex-col justify-start items-start gap-3.5 md:gap-5">
      <div className="w-full h-40 px-4 py-5 md:h-96 md:px-28 md:py-20 relative bg-neutral-100 rounded-sm shadow-[4px_4px_20px_0px_rgba(250,247,243,0.25)] flex justify-center items-center gap-2.5">
        <img
          data-type="cola"
          className="w-14 h-24 md:w-36 md:h-60"
          src={typeof imageUrl === "string" ? imageUrl : imageUrl.src}
          alt={name}
        />
      </div>
      <div className="w-32 md:w-auto flex-1 flex flex-col justify-start items-start gap-2">
        <div className="flex flex-col md:flex-row justify-start md:items-center gap-2">
          <div className="text-stone-900 text-base md:text-lg font-normal font-suit">{name}</div>
          {purchaseCount !== undefined && (
            <div className="text-blue-500 text-xs md:text-md font-bold font-suit">{purchaseCount}회 구매</div>
          )}
        </div>
        <div className="text-stone-900 text-base md:text-lg font-extrabold font-suit">
          {Number(price).toLocaleString("ko-KR")}원
        </div>
      </div>
    </div>
  );
}

export default Card;
