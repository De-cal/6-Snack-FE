"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils/formatPrice.util";
import NoContent from "./NoContent";
import LikeIconSvg from "../svg/LikeIconSvg";
import { TProduct } from "@/types/product.types";

type TProductWithFavorite = TProduct & {
  isFavorite?: boolean;
};

type ProductGridProps = {
  products: TProductWithFavorite[];
  currentCategoryId?: number; // 현재 선택된 카테고리 ID 추가
};

export default function ProductGrid({ products, currentCategoryId }: ProductGridProps) {
  const router = useRouter();

  if (!products || products.length === 0) {
    return (
      <NoContent
        title="상품이 존재하지 않습니다"
        subText1=""
        subText2=""
        buttonText="전체 상품 보기"
        onClick={() => router.push("/products")}
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-3.5 sm:gap-y-7.5 md:grid-cols-3 md:gap-x-10 md:gap-y-15 justify-items-center pb-[30px] sm:pb-[40px]">
      {products.map((product: TProductWithFavorite) => {
        // 상품 상세 페이지 URL 생성 (카테고리 파라미터 포함)
        // 현재 선택된 카테고리가 있으면 그것을 사용, 없으면 상품의 카테고리 ID 사용
        const categoryId = currentCategoryId || product.categoryId;
        const productDetailUrl = `/products/${product.id}?category=${categoryId}`;

        return (
          <Link
            key={product.id}
            href={productDetailUrl}
            className="flex flex-col justify-start items-center gap-[14px] md:gap-[20px] hover:opacity-80 transition-opacity w-full"
          >
            <div className="relative w-full flex justify-center items-center aspect-square min-w-[154.5px] min-h-[154.5px] max-h-[366.67px] max-w-[366.67px] round-xs bg-primary-50 overflow-hidden">
              <div className="relative w-[70%] h-[70%] md:w-[75%] md:h-[75%] min-w-[53.8px] min-h-[93.39px] ">
                <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
              </div>

              {product.isFavorite ? (
                <div className="absolute right-[11.5px] bottom-[11.5px] w-[20px] h-[20px]  sm:w-[25px] sm:h-[25px] md:right-[20.3px] md:bottom-[20.3px] md:w-[30px] md:h-[30px]">
                  <LikeIconSvg isLiked={true} className="absolute inset-0 w-full h-full" />
                </div>
              ) : (
                <div className="absolute right-[11.5px] bottom-[11.5px] w-[20px] h-[20px]  sm:w-[25px] sm:h-[25px] md:right-[20.3px] md:bottom-[20.3px] md:w-[30px] md:h-[30px]">
                  <LikeIconSvg isLiked={false} className="absolute inset-0 w-full h-full" />
                </div>
              )}
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div className="flex justify-center items-center md:gap-2 ">
                <div className="text-base/[20px] md:text-lg/[22px] font-normal tracking-tight">{product.name}</div>
                <div className=" text-secondary-500 text-[13px]/[16px] md:text-sm/[17px] font-bold hidden md:block">
                  {product.cumulativeSales}회 구매
                </div>
              </div>
              <div className="justify-start text-base/[20px] md:text-lg/[22px] font-extrabold tracking-tight">
                {formatPrice(product.price)}원
              </div>
              <div className="justify-center text-secondary-500 text-[13px]/[16px] md:text-sm/[17px] font-bold md:hidden">
                {product.cumulativeSales}회 구매
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
