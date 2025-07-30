import React from "react";
import Image from "next/image";

/**
 * @JJOBO
 * 1. 타입 정의 명시적으로 해주기
 */

type TProps = {
  imageUrl: string;
};

export default function ProductImage({ imageUrl }: TProps) {
  return (
    <div className="self-center relative w-full max-w-[328px] sm:max-w-[496px] md:max-w-[540px] aspect-square">
      <Image src={imageUrl} alt="상품 이미지" fill className="object-contain" />
    </div>
  );
}
