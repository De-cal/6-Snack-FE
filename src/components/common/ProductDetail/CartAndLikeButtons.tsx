import React from "react";
import Button from "../../ui/Button";

/**
 * @JJOBO
 * 1. 타입 정의 명시적으로 해주기
 */

type TProps = {
  productId: number;
  selectedQuantity: number;
  onAddToCart: () => void;
};

export default function CartAndLikeButtons({ onAddToCart }: TProps) {
  return (
    <div className="flex gap-4 w-full">
      <Button type="primary" label="장바구니 담기" className="w-full h-16 font-bold" onClick={onAddToCart} />
      {/* 좋아요 버튼은 이후 추가 */}
      {/* <div className="w-16 h-16 border rounded flex items-center justify-center">
        <Image src={ic_like_normal} alt="좋아요" width={24} height={24} />
      </div> */}
    </div>
  );
}
