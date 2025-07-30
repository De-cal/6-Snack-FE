"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * @Jam1eL1
 * 1. 타입 앞에 T 붙이기
 */

type Product = {
  id: number;
  categoryId: number;
  creatorId: string;
  name: string;
  price: number;
  imageUrl: string;
  linkUrl: string;
  cumulativeSales: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  category: {
    id: number;
    name: string;
    parentId: number;
  };
  creator: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
};

type ProductGridProps = {
  products: Product[];
  currentCategoryId?: number; // 현재 선택된 카테고리 ID 추가
};

export default function ProductGrid({ products, currentCategoryId }: ProductGridProps) {
  if (!products || products.length === 0) {
    return <div className="flex justify-center items-center py-16 text-primary-500">상품이 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-3.5 sm:gap-y-7.5 md:grid-cols-3 md:gap-x-10 md:gap-y-15 justify-items-center">
      {products.map((product) => {
        // 상품 상세 페이지 URL 생성 (카테고리 파라미터 포함)
        // 현재 선택된 카테고리가 있으면 그것을 사용, 없으면 상품의 카테고리 ID 사용
        const categoryId = currentCategoryId || product.categoryId;
        const productDetailUrl = `/products/${product.id}?category=${categoryId}`;

        return (
          <Link
            key={product.id}
            href={productDetailUrl}
            className="flex flex-col justify-start items-center gap-[14px] hover:opacity-80 transition-opacity w-full"
          >
            <div className="relative w-full aspect-square min-h-[154.5px] max-h-[366.67px] px-4 sm:px-[120px] py-4 sm:py-[73px] round-xs bg-primary-50 overflow-hidden">
              <Image src={product.imageUrl} alt={product.name} fill className="object-contain" />
            </div>
            <div className="flex flex-col justify-start items-start gap-2 w-full">
              <div className="justify-start text-stone-900 text-lg font-normal">{product.name}</div>
              {/* 상품 팔린갯수 api 연동되면 가져와야함, 변경예정 */}
              <div className="justify-start text-stone-900 text-lg font-extrabold">
                {product.price.toLocaleString("ko-KR")}원
              </div>
              <div className="justify-center text-blue-500 text-sm font-bold ">{product.cumulativeSales}회 구매</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
