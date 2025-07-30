"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";
import { addToCart } from "@/lib/api/addToCart.api";
import CategoryNavigation from "./ProductDetail/CategoryNavigation";
import ProductImage from "./ProductDetail/ProductImage";
import ProductBasicInfo from "./ProductDetail/ProductBasicInfo";
import ProductActions from "./ProductDetail/ProductActions";
import CartAndLikeButtons from "./ProductDetail/CartAndLikeButtons";
import ProductInfoSections from "./ProductDetail/ProductInfoSections";
import { useAuth } from "@/providers/AuthProvider";
import { useCurrentSubCategory } from "@/hooks/useCurrentSubCategory";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ProductDetailProps = {
  productId: number;
};

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { data: product, isLoading, isError } = useProductDetail(productId);
  const { user } = useAuth();
  const router = useRouter();
  const { findCategoryPath } = useCurrentSubCategory();
  const queryClient = useQueryClient();

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: () => {
      if (!product) throw new Error("상품 정보가 없습니다.");
      return addToCart(product.id, selectedQuantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      router.push("/cart");
    },
    onError: () => {
      alert("장바구니 추가 실패");
    },
  });

  useEffect(() => {
    if (product?.category?.id) {
      findCategoryPath(product.category.id);
    }
  }, [product?.category?.id, findCategoryPath]);

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !product) return <p>상품 정보를 불러올 수 없습니다.</p>;

  const handleAddToCart = () => {
    if (selectedQuantity < 1) {
      alert("상품의 수량을 1개 이상 선택해주세요.");
      return;
    }

    mutateAddToCart();
  };

  const canEdit = user?.id === product.creatorId || user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  return (
    <div className="w-full flex flex-col justify-center items-center sm:max-w-[1180px]">
      <div className="w-full flex flex-col justify-center items-start gap-7.5">
        <CategoryNavigation
          parentCategory={product.category.parent?.name ?? "기타"}
          childCategory={product.category.name}
        />
        <div className="w-full flex flex-col md:flex-row md:gap-10">
          <ProductImage imageUrl={product.imageUrl} />
          <div className="flex flex-col justify-center md:justify-start items-center w-full gap-8 sm:gap-10 md:gap-7.5 pt-7.5 sm:pt-8 md:pt-8">
            <div className="self-stretch inline-flex justify-between items-start">
              <ProductBasicInfo product={product} />
              <ProductActions
                selectedQuantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
                canEdit={canEdit}
                productId={product.id}
                productName={product.name}
              />
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <CartAndLikeButtons
                productId={product.id}
                selectedQuantity={selectedQuantity}
                onAddToCart={handleAddToCart}
              />
              <ProductInfoSections />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
